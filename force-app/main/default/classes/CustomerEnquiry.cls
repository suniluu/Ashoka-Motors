public class CustomerEnquiry
{
    @AuraEnabled(cacheable = true)
    public static List<AM_Customer_Enquiry__c> getAllCustomerEnquirys(String field, String sortOrder, String searchTerm)
    {
        String query;
        query = 'select Name,AM_Brand__c,AM_Customer_Enquiry_Status__c,AM_Budget_Range__c,AM_Customer_Name__c,AM_Customer_Phone__c from AM_Customer_Enquiry__c';
        if(searchTerm != null) 
        {
            query += ' WHERE AM_Brand__c LIKE \'%' + String.escapeSingleQuotes(searchTerm) + '%\' OR AM_Customer_Enquiry_Status__c LIKE \'%' + String.escapeSingleQuotes(searchTerm) + '%\' OR AM_Customer_Name__c LIKE \'%' + String.escapeSingleQuotes(searchTerm) + '%\'OR AM_Vehicle_Capacity__c LIKE \'%' + String.escapeSingleQuotes(searchTerm) + '%\' ';
        }
        if(field != null && sortOrder !=null){
            query += ' ORDER BY '+field+' '+sortOrder;
        }
        return Database.query(query);
    }
    @AuraEnabled
    public static void deleteSelectCustomerEnquirys(id Cid)
    {
        AM_Customer_Enquiry__c cqd=[select id,Name from AM_Customer_Enquiry__c where id=:Cid];
        delete cqd;
    }
}