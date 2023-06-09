public with sharing class CustomerEnquiryDetailsController 
{
    @AuraEnabled(cacheable = true)
    public static List<SObject> displayCustomerRecords()
    {
        list<AM_Customer_Enquiry__c> query=[select AM_Vehicle__r.Name,AM_Customer_Name__c,
                                            AM_Brand__c,AM_Model__c,KMS_Travelled__c,AM_Vehicle_Color__c,AM_Make_Year__c,
                                            AM_Fuel_Type__c,AM_Customer_Enquiry_Status__c,CreatedDate from AM_Customer_Enquiry__c];
          return query;
        
    }
   @AuraEnabled
    public static void deleteCustomerEnquiry(Id custId) {
    AM_Customer_Enquiry__c delCust = [SELECT Id, Name FROM AM_Customer_Enquiry__c WHERE Id = :custId];
    if (delCust != null) 
    {
        List<AM_Customer_Enquiry__c> recordsToDelete = new List<AM_Customer_Enquiry__c>();
        recordsToDelete.add(delCust);
        Database.delete(recordsToDelete);
    }
}  
}