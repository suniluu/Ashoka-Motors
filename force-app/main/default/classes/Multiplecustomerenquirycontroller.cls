public class Multiplecustomerenquirycontroller {
@AuraEnabled
    public static list<AM_Customer_Enquiry__c> Savecustomerequires(list<AM_Customer_Enquiry__c> enqurylist)
    {
        try 
        {
            insert enqurylist;
            return enqurylist;
        } 
        catch (Exception ex) 
        {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}