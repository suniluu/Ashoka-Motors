public class PopulateValueonAMPriceSoldController 
{
public static void getDetails(List<SBQQ__Quote__c> quotelist)
{
    Set<Id> quoteIds = new Set<Id>();
    For(SBQQ__Quote__c q:quotelist)
    {
        quoteIds.add(q.Id);
    }
}
}