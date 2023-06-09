public class u2 {
    public static List<Product2> getpreferedvehciles() {
        List<Product2> carbrands = new List<Product2>();
        List<Product2> products = new List<Product2>();
        List<AM_Customer_Enquiry__c> customerenquiries = [
            SELECT id, AM_Brand__c, AM_Make_Year__c, AM_Vehicle_Color__c 
            FROM AM_Customer_Enquiry__c 
            WHERE AM_Customer__c = '0015i00000jYyNPAA0'
        ];

        for (AM_Customer_Enquiry__c ce : customerenquiries) {
            String query = 'SELECT id, AM_Target_Price__c, AM_Brand__c, AM_Vehicle_Model__c, ' +
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
                carbrands.add(prod);
                System.debug('Product::::' + prod);
            }
        }
        return carbrands;
    }
}