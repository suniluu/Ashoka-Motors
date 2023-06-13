/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 06-09-2023
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class AccountControlleru {
    /**
    * @description 
    * @author ChangeMeIn@UserSettingsUnder.SFDoc | 06-09-2023 
    * @return List<Account> 
    **/
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name,Industry FROM Account];
    }
}