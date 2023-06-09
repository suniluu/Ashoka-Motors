public with sharing class AccountControllerr {
   
    @AuraEnabled (Cacheable=true)
    public static List<Account> getAccounts2(){
      List<Account> accs=[select id,Name,Type,Industry
      From Account
      WITH SECURITY_ENFORCED
      LIMIT 10];
      return accs;  
    }
    @AuraEnabled (Cacheable=true)
    public static Account getAccounts3(account a){
     
   account  accs=[select id,Name,Type,Industry
      From Account where id=:a.id];
      return accs;  
    }
}