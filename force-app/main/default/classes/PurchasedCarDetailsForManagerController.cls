public class PurchasedCarDetailsForManagerController
{
  //Displaying Purchased Car Details with Search Filters
    @AuraEnabled(cacheable = true)
	public static list<Product2> purchasedCarDetails(String field, String sortOrder)
    {
        
       String query;
        query='select Name,AM_Vehicle_Registration_Number__c,AM_Vehicle_Model__c,AM_Brand__c,AM_Vehicle_Color__c,KMS_Travelled__c,AM_Purchase_Date__c,AM_Purchase_Amount__c,AM_Purchase_Funded_From__c,AM_Owner_Name__c,AM_Owner_Phone__c,AM_Vehicle_Status__c,MonthsofPurchaseDate__c,YearofPurchaseDate__c  From Product2';
      /*  if(searchTerm1 != null) 
        {
            query += ' WHERE AM_Vehicle_Status__c LIKE \'%' + searchTerm1 + '%\'' ;
        } 
      
        if(searchTerm2 != null) 
        {
            query += ' And AM_Purchase_Amount__c LIKE \'%' + searchTerm2 + '%\'' ;
        }
        
        if(searchTerm3 != null) 
        {
            query += ' And MonthsofPurchaseDate__c LIKE \'%' + searchTerm3 + '%\'' ;
        }
        if(searchTerm4 != null) 
        {
            query += ' And YearofPurchaseDate__c LIKE \'%' + searchTerm4 + '%\'' ;
        }*/
        if(field != null && sortOrder !=null){
            query += ' ORDER BY '+field+' '+sortOrder;     
        }
        return Database.query(query);
    }
   
}