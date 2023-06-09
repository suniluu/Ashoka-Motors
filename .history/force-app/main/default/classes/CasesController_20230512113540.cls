public with sharing class CasesController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases() {
        return [SELECT CaseNumber, Subject, Status, Priority, Owner.Name, CreatedDate FROM Case];
    }
}