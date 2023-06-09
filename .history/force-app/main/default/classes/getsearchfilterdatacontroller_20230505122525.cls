public with sharing class getsearchfilterdatacontroller {

        @AuraEnabled(cacheable = true)
        public static list<Product2> getvehicledetails(){
                list<Product2> imagess=[select id,AM_Target_Price__c,AM_Brand__c,AM_Vehicle_Model__c,(select id,AM_Main_Image__c,AM_Vehicle_Main_Image__c from AM_Vehicle_Images__r),
            AM_Make_Year__c,KMS_Travelled__c,AM_Fuel_Type__c,AM_Body_Type__c,AM_Transmission_Type__c
            from Product2 ];
            return imagess;
        }//,string kms
        @AuraEnabled(cacheable = true)
        public static list<Product2> getvehicledetails1(string makeyear,string fueltype,string bodytype,string transmission, string brand,string color){
                makeyear = '%'+makeyear+'%';
                kms =   '%'+kms+'%';
                fueltype =  '%'+fueltype+'%';
                bodytype=  '%'+bodytype+'%';
                transmission =  '%'+transmission+'%';
                brand =  '%'+ brand +'%';
                color =  '%'+ color +'%';
                list<Product2> imagess1=[select id,AM_Brand__c,AM_Vehicle_Color__c,AM_Target_Price__c,AM_Vehicle_Model__c,(select id,AM_Main_Image__c,AM_Vehicle_Main_Image__c from AM_Vehicle_Images__r),
                AM_Make_Year__c,KMS_Travelled__c,AM_Fuel_Type__c,AM_Body_Type__c,AM_Transmission_Type__c
                from Product2 where  AM_Make_Year__c LIKE : makeyear AND  KMS_Travelled__c LIKE : kms AND AM_Fuel_Type__c LIKE : fueltype AND 
                AM_Body_Type__c LIKE : bodytype AND AM_Transmission_Type__c LIKE : transmission 
                AND AM_Brand__c LIKE : brand AND AM_Vehicle_Color__c LIKE : color ];
           
                    return imagess1;
}

}