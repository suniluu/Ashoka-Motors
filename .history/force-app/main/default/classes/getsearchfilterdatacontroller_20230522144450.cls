public with sharing class getsearchfilterdatacontroller {

        @AuraEnabled(cacheable = true)
        public static list<Product2> getvehicledetails(){
                list<Product2> imagess=[select id,AM_Vehicle_Final_Amount__c,AM_Target_Price__c,AM_Brand__c,AM_Vehicle_Model__c,(select id,AM_Main_Image__c,AM_Vehicle_Main_Image__c from AM_Vehicle_Images__r),
            AM_Make_Year__c,KMS_Travelled__c,AM_Fuel_Type__c,AM_Body_Type__c,AM_Transmission_Type__c
            from Product2 ];
            return imagess;
        }//,string kms
        @AuraEnabled(cacheable = true)
        public static list<Product2> getvehicledetails1(string makeyear,string fueltype,string bodytype,string transmission, string brand,string color)
        {
                makeyear = '%'+makeyear+'%';
                //kms =   '%'+kms+'%';
                fueltype =  '%'+fueltype+'%';
                bodytype=  '%'+bodytype+'%';
                transmission =  '%'+transmission+'%';
                brand =  '%'+ brand +'%';
                color =  '%'+ color +'%';
                list<Product2> imagess1=[select id,AM_Brand__c,AM_Vehicle_Color__c,AM_Target_Price__c,AM_Vehicle_Model__c,(select id,AM_Main_Image__c,AM_Vehicle_Main_Image__c from AM_Vehicle_Images__r),
                AM_Make_Year__c,KMS_Travelled__c,AM_Fuel_Type__c,AM_Body_Type__c,AM_Transmission_Type__c
                from Product2 where  AM_Make_Year__c LIKE : makeyear  AND AM_Fuel_Type__c LIKE : fueltype AND 
                AM_Body_Type__c LIKE : bodytype AND AM_Transmission_Type__c LIKE : transmission 
                AND AM_Brand__c LIKE : brand AND AM_Vehicle_Color__c LIKE : color ];
           
                    return imagess1;
        }
        @AuraEnabled(cacheable = true)
        public static List<Product2> getpreferedvehciles(Id custid) {
         
        List<Product2> products = new List<Product2>();
        Set<Id> prefedredcarids=new Set<Id>();
        List<AM_Customer_Enquiry__c> customerenquiries = [
            SELECT id, AM_Brand__c, AM_Make_Year__c, AM_Vehicle_Color__c 
            FROM AM_Customer_Enquiry__c 
            where AM_Customer__c=:custid
        ];

        for (AM_Customer_Enquiry__c ce : customerenquiries) {
           

            String query = 'SELECT id,AM_Vehicle_Final_Amount__c, AM_Target_Price__c, AM_Brand__c, AM_Vehicle_Model__c, ' +
                '(SELECT id, AM_Main_Image__c, AM_Vehicle_Main_Image__c FROM AM_Vehicle_Images__r), ' +
                'AM_Make_Year__c, KMS_Travelled__c, AM_Fuel_Type__c, AM_Body_Type__c, ' +
                'AM_Transmission_Type__c, AM_Vehicle_Color__c ' +
                'FROM Product2 WHERE ';

            List<String> conditions = new List<String>();

            if (String.isNotBlank(ce.AM_Brand__c )) {
                conditions.add('AM_Brand__c = \'' + ce.AM_Brand__c + '\'');
            }

            if (String.isNotBlank(ce.AM_Make_Year__c )) {
                conditions.add('AM_Make_Year__c = \'' + ce.AM_Make_Year__c + '\'');
            }

            if (String.isNotBlank(ce.AM_Vehicle_Color__c)) {
                conditions.add('AM_Vehicle_Color__c = \'' + ce.AM_Vehicle_Color__c + '\'');
            }

            query += String.join(conditions, ' AND ');

            products = Database.query(query);

            for (Product2 prod : products) {
                prefedredcarids.add(prod.Id);
               
            }
            system.debug(prefedredcarids);
        }
        List<Product2> carbrands=[select id,AM_Vehicle_Final_Amount__c,AM_Target_Price__c,AM_Brand__c,AM_Vehicle_Model__c,(select id,AM_Main_Image__c,AM_Vehicle_Main_Image__c from AM_Vehicle_Images__r),
        AM_Make_Year__c,KMS_Travelled__c,AM_Fuel_Type__c,AM_Body_Type__c,AM_Transmission_Type__c
        from Product2 WHERE Id in:prefedredcarids  ];
        system.debug(carbrands);
        return carbrands;
    }

   }