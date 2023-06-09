public with sharing class Getcustomerpreferrences {
    @AuraEnabled(cacheable = true)
    public static List<AM_Vehicle_Detail__c> getAllvehicledetails(){
        List<AM_Vehicle_Detail__c> AVD =[Select Id,AM_Brand__c,AM_Vehicle_Model__c,
                                AM_Vehicle_Color__c,AM_Make_Year__c from AM_Vehicle_Detail__c];
        return AVD;
    }
}