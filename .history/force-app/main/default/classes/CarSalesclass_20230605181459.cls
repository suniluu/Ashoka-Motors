public with sharing class CarSalesclass 
{
    @AuraEnabled (cacheable=true)
    public static List<AM_Vehicle_Sale__c> getCarSalesList(String field, String sortOrder, string searchTerm)
    {
        
        String query;
        query  = 'SELECT Am_Model__c,AM_Vehicle_Registration_Number__c,Am_Sold_Date__c,Am_Fuel_Type__c,AM_Vehicle_PurchaseDate__c, Name,AM_Vehicle_Purchase_Amount__c, Am_Profit_Gained__c,Am_Price_Sold__c,Am_Brand__c FROM AM_Vehicle_Sale__c';
        if(searchTerm != '') 
        {
            query += ' WHERE Am_Sold_Date__c <=' + String.escapeSingleQuotes(searchTerm) ;
        }
        if(field != null && sortOrder !=null)
        {
            query += ' ORDER BY '+field+' '+sortOrder;
        }
        return Database.query(query);
    }
    
     public class CarSaleWrapper 
    {
        @AuraEnabled
        public String amModel {get; set;}
         @AuraEnabled
        public String vehicleRegistrationNumber {get; set;}
         @AuraEnabled
        public Date soldDate {get; set;}
         @AuraEnabled
        public String fuelType {get; set;}
         @AuraEnabled
        public Date vehiclePurchaseDate {get; set;}
         @AuraEnabled
        public String name {get; set;}
         @AuraEnabled
        public Decimal vehiclePurchaseAmount {get; set;}
         @AuraEnabled
        public Decimal profitGained {get; set;}
         @AuraEnabled
        public Decimal priceSold {get; set;}
         @AuraEnabled
        public String brand {get; set;}
        
        public CarSaleWrapper(AM_Vehicle_Sale__c sale) {
            this.amModel = sale.Am_Model__c;
            this.vehicleRegistrationNumber = sale.AM_Car_Id__r.AM_Vehicle_Registration_Number__c;
            this.soldDate = sale.Am_Sold_Date__c;
            this.fuelType = sale.Am_Fuel_Type__c;
            this.vehiclePurchaseDate = sale.AM_Vehicle_PurchaseDate__c;
            this.name = sale.Name;
            this.vehiclePurchaseAmount = sale.AM_Car_Id__r.AM_Purchase_Amount__c;
            this.profitGained = sale.Am_Profit_Gained__c;
            this.priceSold = sale.Am_Price_Sold__c;
            this.brand = sale.Am_Brand__c;
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static List<CarSaleWrapper> getCarSalesListWrapper(String field, String sortOrder, string searchTerm) 
    {
        String query = 'SELECT Am_Model__c,AM_Car_Id__r.AM_Vehicle_Registration_Number__c,Am_Sold_Date__c,Am_Fuel_Type__c, '+
            'AM_Vehicle_PurchaseDate__c, Name,AM_Car_Id__r.AM_Purchase_Amount__c,'+
            'Am_Profit_Gained__c,Am_Price_Sold__c,Am_Brand__c FROM AM_Vehicle_Sale__c';
        
        if (searchTerm != '') {
            query += ' WHERE Am_Sold_Date__c <= ' + String.escapeSingleQuotes(searchTerm);
        }
        if (field != null && sortOrder != null) {
            query += ' ORDER BY ' + field + ' ' + sortOrder;
        }
        List<AM_Vehicle_Sale__c> salesList = Database.query(query);
        List<CarSaleWrapper> wrapperList = new List<CarSaleWrapper>();
        for (AM_Vehicle_Sale__c sale : salesList)
        {
            wrapperList.add(new CarSaleWrapper(sale));
        }
        return wrapperList;
    }
    
    
    @AuraEnabled (cacheable=true)
    public static List<AM_Vehicle_Sale__c> getbydate(Integer day, Integer month, Integer year) 
    {
        List<AM_Vehicle_Sale__c> matchedRecords=new List<AM_Vehicle_Sale__c>();
        List<AM_Vehicle_Sale__c> matchingRecords = [SELECT Am_Model__c,AM_Vehicle_Registration_Number__c,
                                                    Am_Fuel_Type__c,AM_Vehicle_PurchaseDate__c, Name,AM_Vehicle_Purchase_Amount__c,
                                                    Am_Profit_Gained__c,Am_Price_Sold__c,Am_Brand__c FROM AM_Vehicle_Sale__c  ];
        for(AM_Vehicle_Sale__c a:matchingRecords)
        {
            if(a.Am_Sold_Date__c.day()==day && a.Am_Sold_Date__c.month()==month&&a.Am_Sold_Date__c.year()==year)
            {
                System.debug(a.Am_Sold_Date__c);
                matchedRecords.add(a);
            }
        }
        
        return matchedRecords;
    }
}