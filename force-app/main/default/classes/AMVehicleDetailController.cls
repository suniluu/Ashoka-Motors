public class AMVehicleDetailController {
    
    @AuraEnabled(cacheable=true)
    public static AM_Vehicle_Detail__c getVehicleDetails(){
        return[SELECT Id,Name,AM_Vehicle__c,AM_Vehicle_Model__c,AM_AC_Available__c,AM_Acceleration_Time__c,
               AM_Active_Service_Contract_Count__c,AM_Active_Subscription_Count__c,AM_Active_Warranty_Count__c,AM_Battery_Capacity__c,
               AM_Battery_Type__c,AM_Brand__c,AM_Condition_Type__c,AM_Door_Count__c,AM_Door_Style_Type__c,AM_Engine_Capacity__c,
               AM_Engine_Name__c,AM_Fuel_Tank_Capacity__c,AM_Fuel_Type__c,AM_Gross_Weight__c,AM_Is_Accident_Met__c,AM_KMs_Travelled__c,
               AM_Last_Odometer_Reading__c,AM_Last_Service_Date__c,AM_Loan_Applicable__c,AM_Make_Year__c,AM_Manufactured_Date__c,AM_Manufacturer_Warranty_End_Date__c,
               AM_Manufacturer_Warranty_Start_Date__c,AM_Manufacturing_Batch_Number__c,AM_Manufacturing_Plant_Name__c,AM_Next_Service_Date__c
               FROM AM_Vehicle_Detail__c];
    }

}