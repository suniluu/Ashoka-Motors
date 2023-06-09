public with sharing class displaycars1 
{
  	@AuraEnabled
    public static void insertSelectedCars(list<Id> selectedCarIds,Id custmID) 
    {
    List<AM_Customer_Enquiry__c> selectedCarsToInsert = new List<AM_Customer_Enquiry__c>();
    
    for (Id carId : selectedCarIds)
     {
      AM_Customer_Enquiry__c selectedCar = new AM_Customer_Enquiry__c();
        selectedCar.AM_Vehicle__c = carId;
        selectedCar.AM_Customer__c= custmID;
        selectedCarsToInsert.add(selectedCar);
       }
    insert selectedCarsToInsert;
    
  }
  @AuraEnabled(cacheable = true)
  public static list<Product2> displaycarselected(list<Id> selectedCarIds) {
    list<Product2> displaycar=[select id,AM_Customer_Selling_Price__c,(select id,AM_Main_Image__c,AM_Vehicle_Main_Image__c from AM_Vehicle_Images__r),
                             AM_Make_Year__c,AM_Vehicle_Model__c,AM_Brand__c, AM_Fuel_Type__c,AM_Vehicle_Capacity__c,
                            AM_Transmission_Type__c,AM_Vehicle_Color__c,AM_Variant__c,AM_Kms_Driven__c,AM_Vehicle_Final_Amount__c
                           from Product2 where id in:selectedCarIds];
     return displaycar;
    
    
  }
}