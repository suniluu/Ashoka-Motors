public with sharing class CarSalesclass 
{   
    public class CarSaleWrapper 
    {
        @AuraEnabled
        public String amModel {get; set;}
        @AuraEnabled
        public String vehicleRegistrationNumber {get; set;}
        @AuraEnabled
        public Date soldDate {get; set;}
        @AuraEnabled
        public Date vehiclePurchaseDate {get; set;}
        @AuraEnabled
        public Decimal vehiclePurchaseAmount {get; set;}
        @AuraEnabled
        public Decimal dealerAmount {get; set;}
        @AuraEnabled
        public Decimal profitGained {get; set;}
        @AuraEnabled
        public Decimal priceSold {get; set;}
        @AuraEnabled
        public String brand {get; set;}
        @AuraEnabled
        public decimal discountAm {get; set;}
        @AuraEnabled
        public decimal discountperc {get; set;}
        @AuraEnabled
        public decimal amountbeforesold {get; set;}
         @AuraEnabled
        public decimal month {get; set;}
         @AuraEnabled
        public decimal year {get; set;}
        
        public CarSaleWrapper(AM_Vehicle_Sale__c sale) 
        {
            decimal Profits;
            if(sale.AM_Profit_Gained__c>0)
            {
                Profits=sale.AM_Profit_Gained__c;
            }
            else
            {
                Profits=0;
            }
            decimal PurchaseAmount;
            if(sale.AM_Car_Id__r.AM_Purchase_Amount__c>0)
            {
                PurchaseAmount=sale.AM_Car_Id__r.AM_Purchase_Amount__c;
            }
            else
            {
                PurchaseAmount=0;
            }
             decimal DealerAm;
            if(sale.AM_Car_Id__r.AM_Dealer_Price__c>0)
            {
                DealerAm=sale.AM_Car_Id__r.AM_Dealer_Price__c;
            }
            else
            {
                DealerAm=0;
            }
            this.amModel = sale.Am_Model__c;
            this.vehicleRegistrationNumber = sale.AM_Car_Id__r.Name;
            this.soldDate = sale.Am_Sold_Date__c;
            this.vehiclePurchaseDate = sale.AM_Vehicle_PurchaseDate__c;
            this.vehiclePurchaseAmount = PurchaseAmount;
            this.dealerAmount=DealerAm;
            this.profitGained = Profits;
            this.priceSold = sale.Am_Price_Sold__c;
            this.brand = sale.Am_Brand__c;
            this.discountAm = sale.AM_Vehicle_Discount__c;
            this.discountperc = (sale.AM_Vehicle_Discount_Percent__c)/100;
            this.amountbeforesold = sale.AM_Vehicle_Amount__c;
            this.month = sale.AM_Vehicle_Month__c;
            this.year = sale.AM_Vehicle_Year__c;
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static List<CarSaleWrapper> getCarSalesListWrapper(string searchTerm,string searchTerm2,string searchTerm3,string searchTerm4) 
    {
        String query = 'SELECT Am_Model__c,AM_Vehicle_Amount__c,Am_Sold_Date__c,AM_Car_Id__r.AM_Dealer_Price__c, '+
            'AM_Vehicle_PurchaseDate__c, AM_Car_Id__r.Name,AM_Car_Id__r.AM_Purchase_Amount__c,AM_Vehicle_Month__c,'+
            'AM_Profit_Gained__c,AM_Vehicle_Discount__c,AM_Vehicle_Discount_Percent__c,Am_Price_Sold__c,AM_Vehicle_Year__c,'+
            'Am_Brand__c FROM AM_Vehicle_Sale__c';
            List<String> conditions = new List<String>();

            if (String.isNotBlank(searchTerm )) {
                conditions.add('AM_Brand__c = \'' + searchTerm + '\'');
            }

            if (String.isNotBlank(searchTerm2 )) {
                conditions.add('AM_Make_Year__c = \'' + searchTerm2 + '\'');
            }

            if (String.isNotBlank(searchTerm3)) {
                conditions.add('AM_Vehicle_Color__c = \'' + searchTerm3 + '\'');
            }
        if (searchTerm != '') 
        {
            query += ' where Am_Sold_Date__c = ' + String.escapeSingleQuotes(searchTerm);
        }
        if (searchTerm2 != '' && searchTerm == '') 
        {
            query += ' Where AM_Vehicle_Month__c = ' + String.escapeSingleQuotes(searchTerm2);
        }
        if (searchTerm3 != '' && searchTerm == '' && searchTerm2 == '') 
        {
            query += ' Where AM_Vehicle_Year__c = ' + String.escapeSingleQuotes(searchTerm3);
        }
        
        if (searchTerm4!='') 
        {
            query += ' Where Am_Brand__c = ' + String.escapeSingleQuotes(searchTerm4);
        }
        
        List<AM_Vehicle_Sale__c> salesList = Database.query(query);
        List<CarSaleWrapper> wrapperList = new List<CarSaleWrapper>();
        
        for (AM_Vehicle_Sale__c sale : salesList)
        {
            wrapperList.add(new CarSaleWrapper(sale));
        }
        return wrapperList;
    }
}