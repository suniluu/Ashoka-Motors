public with sharing class CustomerquickcompController
 {

    @AuraEnabled(cacheable=true)
    public static Id InsertCustomerRec(String lastname, String email, String phone) 
    {
        List<Account> accList = new List<Account>();
        Account accRec = new Account();
        accRec.Name = lastname;
        accRec.Email__c = email;
        accRec.Phone = phone;
        accList.add(accRec);
        insert accList;
        return accList;
    }
}
