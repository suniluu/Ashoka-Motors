public with sharing class AM_VehicleRepairsClass {
    @AuraEnabled(cacheable=true)
public static list<AM_Vehicle_Repairs__c> getVehicleRepairsdata() {
    return [select AM_Air_Bags__c, AM_Actual_Repair_Amount__c, AM_Air_Working_Condition__c	,AM_CarNumber__c,AM_Denting__c,AM_Door_Handles__c,AM_Estimated_Repair_Amount__c,AM_Head_Lights__c,AM_Mirrors__c,AM_Music_System__c,AM_Paint_Condition__c,AM_Repair_Status__c,AM_Seat_Covers__c,AM_Seats__c,AM_Tyre_Change__c,Name,AM_Vehicle_Stepney_Available__c, AM_Wheel_Allignment__c from AM_Vehicle_Repairs__c];        


}
    }