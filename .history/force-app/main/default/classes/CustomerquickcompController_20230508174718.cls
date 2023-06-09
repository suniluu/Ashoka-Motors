public with sharing class CustomerquickcompController {

    @AuraEnabled
    public static String InsertCustomerRec(String lastName, String email, String phone) {
        Account accRec = new Account();
        accRec.LastName = lastName;
        accRec.Email__c = email;
        accRec.Phone = phone;
        Database.insert(accRec);
        
        return accRec.Id;
    }
}
