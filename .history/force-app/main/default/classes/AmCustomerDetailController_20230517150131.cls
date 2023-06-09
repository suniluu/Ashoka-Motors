public class AmCustomerDetailController
{
    @AuraEnabled (cacheable=true)
    public static List<Account> getPhoneNum(string ph)
    {
        List<Account> cts= [SELECT Id,Name,Phone FROM Account where Phone=:ph];  
        
        system.debug(cts);
        
        return cts;
    }
    
    //passing cid to here from js
    
    @AuraEnabled 
    public static void createCST(id cid) 
    {
        
        Account css=[SELECT Id,Name,Phone FROM Account where id=:cid];
        
        
    }
    
}