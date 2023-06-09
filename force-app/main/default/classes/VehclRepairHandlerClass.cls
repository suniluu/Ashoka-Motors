public class VehclRepairHandlerClass 
{
    public static void insertrep(list<Product2> pds)
    {
        for(Product2 p:pds)
        {
            list<AM_Vehicle_Repairs__c> rvp=new list<AM_Vehicle_Repairs__c>();
            rvp=[select id,AM_Vehicle_Number__c from AM_Vehicle_Repairs__c where AM_Vehicle_Number__c=:p.Id];       
            
            if(rvp.size()==0)
            {
                if(p.AM_Repair_Required__c==True)
                {
                    AM_Vehicle_Repairs__c vrp=new AM_Vehicle_Repairs__c();
                    vrp.AM_Vehicle_Number__c=p.id;
                    insert vrp;
                }
            }
        } 
    }
    
    public static void updatevehstatus(list<Product2> pds)
    {
        for(Product2 p:pds)
        {
            if(p.AM_Repair_Required__c==True)
            {
                p.AM_Vehicle_Status__c='In-Repair';
            }
        }
    }
    
    
    public static void Updaterep(list<AM_Vehicle_Repairs__c> pdsr)
    {
        for(AM_Vehicle_Repairs__c p:pdsr)
        {
            list<AM_Vehicle_Repairs__c> rvps=new list<AM_Vehicle_Repairs__c>();
            rvps=[select id,AM_Vehicle_Number__c from AM_Vehicle_Repairs__c where AM_Vehicle_Number__c=:p.AM_Vehicle_Number__c];
            
            if(rvps.size()==1)
            {
                if(p.AM_Repair_Status__c=='Completed')
                {
                    Product2 pd=new Product2();
                    for(AM_Vehicle_Repairs__c r:rvps)
                    {
                        pd=[select id,AM_Repair_Required__c from Product2 where id=:r.AM_Vehicle_Number__c];
                        pd.AM_Repair_Required__c=false;
                        pd.AM_Vehicle_Status__c='Available';
                        
                    }
                    update pd;
                }
                if(p.AM_Repair_Total_Amount__c!=null)
                {
                    Product2 pds=new Product2();
                    for(AM_Vehicle_Repairs__c r:rvps)
                    {
                        pds=[select name,AM_Repair_Amount__c from Product2 where id=:r.AM_Vehicle_Number__c];
                    }
                    pds.AM_Repair_Amount__c=p.AM_Repair_Total_Amount__c;
                    update pds;
                }
            }
        }        
    }
    
    
    public static void priceBookEntry(list<Product2> pds)
    {
        PricebookEntry pbe=new PricebookEntry();
        
        for(Product2 p:pds)
        {
            list<PricebookEntry> pbs=new list<PricebookEntry>();
            Pricebook2 pb=[select id from Pricebook2 where name='Standard Price Book'];
            
            pbs=[select id,UnitPrice from PricebookEntry where Product2Id=:p.id];
            
            if(p.AM_Vehicle_Final_Amount__c!=Null)
            { 
                if(pbs.size()==1)
                {
                    PricebookEntry pnb =new PricebookEntry();
                    pnb=[select id,UnitPrice from PricebookEntry where Product2Id=:p.id];
                    
                    pnb.UnitPrice=p.AM_Vehicle_Final_Amount__c;                    
                    update pnb;
                }
                else 
                {
                    pbe.UnitPrice=p.AM_Vehicle_Final_Amount__c;
                    pbe.Product2Id=p.Id;
                    pbe.Pricebook2Id=pb.Id;
                    pbe.IsActive=true;
                    insert pbe;
                }
                
            }
        }
    }
    public static void repairDetailStatus(list<AM_Vehicle_Repair_Details__c> pds)
    {
        boolean b=true;
        list<AM_Vehicle_Repair_Details__c> rpds=new list<AM_Vehicle_Repair_Details__c>();
        for(AM_Vehicle_Repair_Details__c rp:pds)
        {
            AM_Vehicle_Repairs__c rps=new AM_Vehicle_Repairs__c();
            rps=[select id,AM_Vehicle_Number__c from AM_Vehicle_Repairs__c where id=:rp.AM_Vehicle_Repairs__c];
            
            rpds=[select AM_Vehicle_Repairs__c,AM_Repair_Detail_Status__c from AM_Vehicle_Repair_Details__c 
                  where AM_Vehicle_Repairs__c=:rp.AM_Vehicle_Repairs__c];
            
            for(AM_Vehicle_Repair_Details__c rip:rpds)
            {
                if(rip.AM_Repair_Detail_Status__c!='Completed')
                {
                    b=false;
                }
            }
            if(b==True)
            {
                rps.AM_Repair_Status__c='Completed';
                
                Product2 lds=[select Name,CreatedBy.email,AM_Brand__c,AM_Vehicle_Registration_Number__c from Product2 where id=:rps.AM_Vehicle_Number__c];
                EmailTemplate template = [SELECT Id, Subject, Body FROM EmailTemplate WHERE Name = 'SendEmailToOwnerAsRepairsCompleted'];
                
                // Create the email message
                Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                email.setToAddresses(new List<String>{lds.CreatedBy.email});
                email.setTemplateId(template.Id);
                email.setSubject(template.Subject);
                
                // Set the merge fields in the email body
                String body = template.Body;
                body = body.replace(' {!Product2.AM_Brand__c}', lds.AM_Brand__c);
                body = body.replace(' {!Product2.Name}', lds.Name);
                
                email.setHtmlBody(body);
                Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});
            }
            else
            {
                rps.AM_Repair_Status__c='Progress';
            }
            update rps;
            
            
        }
    }
    
    @AuraEnabled(Cacheable=true)
    public static list<Product2> getvehicleinfo(String field, String sortOrder, String searchTerm1 ,String searchTerm2, String searchTerm3 ,String searchTerm4)
    {   
        String query;
        query  = 'select Name,AM_Brand__c,AM_Vehicle_Model__c,AM_Vehicle_Type__c,AM_Vehicle_Registration_Number__c from Product2 ';
        if(searchTerm1 != null) 
        {
            query += ' WHERE Name LIKE \'%' + searchTerm1 + '%\'' ;
        }
        if(searchTerm2 != null) 
        {
            query += ' And AM_Brand__c LIKE \'%' + searchTerm2 + '%\'' ;
        }
        if(searchTerm3 != null) 
        {
            query += ' And AM_Vehicle_Model__c LIKE \'%' + searchTerm3 + '%\'' ;
        }
        if(searchTerm4 != null) 
        {
            query += ' And AM_Vehicle_Registration_Number__c LIKE \'%' + searchTerm4 + '%\'' ;
        }
        if(field != null && sortOrder !=null){
            query += ' ORDER BY '+field+' '+sortOrder;
        }
        return Database.query(query);
        
    }
    
    @AuraEnabled(Cacheable=true)
    public static list<Product2> getallvehicleinfo(String field, String sortOrder, String searchTerm )
    {   
        String query;
        query  = 'select Name,AM_Brand__c,AM_Vehicle_Model__c,AM_Vehicle_Registration_Number__c from Product2 ';
        if(searchTerm != null) 
        {
            query += ' WHERE Name LIKE \'%' + searchTerm + '%\' OR AM_Brand__c LIKE \'%' + searchTerm + '%\' OR AM_Vehicle_Registration_Number__c LIKE \'%' + searchTerm + '%\' OR AM_Vehicle_Model__c LIKE \'%' + searchTerm + '%\'' ;
        }
        if(field != null && sortOrder !=null){
            query += ' ORDER BY '+field+' '+sortOrder;
        }
        return Database.query(query);
        
    }
    
    @AuraEnabled
    public static void deleteSelectVehicles(id vid)
    {
        Product2 pd=[select id,Name from Product2 where id=:vid];
        delete pd;
    }
    
    @AuraEnabled(cacheable=true)
    public static list<Case> getCases()
    {
        list<Case> pd=[select CaseNumber,Subject,status,Priority from Case];
        return pd;
    }
    
    @AuraEnabled(cacheable=true)
    public static list<Product2> getCarOwners(String field, String sortOrder, String searchTerm)
    {
        String query;
        query  = 'select Name,AM_Owner_Address__c,AM_Owner_Adhar_Number__c,'
            +'AM_Owner_Email__c,AM_Owner_Name__c,AM_Owner_Phone__c,AM_Dealer_Name__c,AM_Dealer_Email__c ,' 
            +'AM_Dealer_Phone__c,AM_Dealer_Address__c from Product2';
        
        String query1;
        query1  = 'select Name,RecordTypeId,RecordType.name,AM_Owner_Address__c,AM_Owner_Adhar_Number__c,'
            +'AM_Owner_Email__c,AM_Owner_Name__c,AM_Owner_Phone__c  from Product2 where RecordType.name=\'AM Owner Type\' ';
        
        String query2;
        query2  = 'select Name,RecordTypeId,RecordType.name,AM_Owner_Address__c,AM_Owner_Adhar_Number__c,'
            +'AM_Owner_Email__c,AM_Owner_Name__c,AM_Owner_Phone__c ,AM_Dealer_Name__c,AM_Dealer_Email__c ,' 
            +'AM_Dealer_Phone__c,AM_Dealer_Address__c from Product2 where RecordType.name=\'AM Dealer Type\'  ';
        
        if(searchTerm == 'Dealer') 
        {
            return Database.query(query2);
        }
        else if(searchTerm == 'Owner')
        {
            return Database.query(query1);
        }
        else if(searchTerm == '')
        {
            return Database.query(query);
        }
        return Database.query(query);
    }
    public static void createInvestmentProfitRecord(list<Product2> pds)
    {
        Product2 pd=new Product2();
        for(Product2 p:pds)
        {
            pd=[select id,AM_Vehicle_Final_Amount__c,RecordType.name,RecordTypeId,AM_Profit__c,AM_Purchase_Date__c 
                from Product2 
                where id=:p.id];
        }
        decimal PurchaseAmount=pd.AM_Vehicle_Final_Amount__c -pd.AM_Profit__c ;
        Integer year=pd.AM_Purchase_Date__c.year();
        Integer month=pd.AM_Purchase_Date__c.month();
        
        integer ips=[select count() from AM_Investments_Profits__c 
                     where  AM_Investment_Year__c=:year 
                     AND AM_Investment_Month__c=:month];
        
        AM_Investments_Profits__c ip=new AM_Investments_Profits__c();
        ip.AM_Investment_Year__c=year;
        ip.AM_Investment_Month__c=month;
        
        if(pd.RecordType.name=='AM Owner Type')
        {
            if(ips==0)
            {
                ip.AM_Investment_Amount__c=PurchaseAmount;
                
                insert ip;
            }
            else
            {
                AM_Investments_Profits__c ias=[select id,AM_Investment_Income__c,AM_Investment_Amount__c 
                                               from AM_Investments_Profits__c 
                                               where  AM_Investment_Year__c=:year 
                                               AND AM_Investment_Month__c=:month];
                
                ias.AM_Investment_Amount__c+=PurchaseAmount;
                update ias;
            }
        }
        else
        {
            if(ips==0)
            {
                ip.AM_Investment_Amount__c=0;
                
                insert ip;
            }
            else
            {
                AM_Investments_Profits__c ias=[select id,AM_Investment_Amount__c from AM_Investments_Profits__c 
                                               where  AM_Investment_Year__c=:year 
                                               AND AM_Investment_Month__c=:month];
                
                ias.AM_Investment_Amount__c+=0;
                update ias;
            }
        }
    }
    public static void updateInvestmentRecord(list<AM_Vehicle_Sale__c> pds)
    {
        AM_Vehicle_Sale__c vsd=new AM_Vehicle_Sale__c();
        for(AM_Vehicle_Sale__c vs:pds)
        {
            vsd=[select id,AM_Profit_Gained__c,AM_Car_Id__c,AM_Car_Id__r.AM_Dealer_Price__c,
                 Am_Price_Sold__c,AM_Car_Id__r.RecordType.name,Am_Sold_Date__c from 
                 AM_Vehicle_Sale__c 
                 where id=:vs.id];
        }
        Integer year=vsd.Am_Sold_Date__c.year();
        Integer month=vsd.Am_Sold_Date__c.month();
        
        integer ips=[select count() from AM_Investments_Profits__c 
                     where  AM_Investment_Year__c=:year 
                     AND AM_Investment_Month__c=:month];
        
        AM_Investments_Profits__c ip=new AM_Investments_Profits__c();
        ip.AM_Investment_Year__c=year;
        ip.AM_Investment_Month__c=month;
        
        if(vsd.AM_Car_Id__r.RecordType.name=='AM Owner Type')
        {
            if(ips==0)
            {
                ip.AM_Investment_Income__c=vsd.Am_Price_Sold__c;
                insert ip;
            }
            else
            {
                AM_Investments_Profits__c ias=[select id,AM_Investment_Income__c from AM_Investments_Profits__c 
                                               where  AM_Investment_Year__c=:year 
                                               AND AM_Investment_Month__c=:month];
                
                ias.AM_Investment_Income__c=vsd.Am_Price_Sold__c;
                update ias;
            }
        }
        else
        {
            decimal Profit=vsd.Am_Price_Sold__c -vsd.AM_Car_Id__r.AM_Dealer_Price__c ;
            
            if(ips==0)
            {
                ip.AM_Investment_Income__c=Profit;
                insert ip;
            }
            else
            {
                AM_Investments_Profits__c ias=[select id,AM_Investment_Income__c from AM_Investments_Profits__c 
                                               where  AM_Investment_Year__c=:year 
                                               AND AM_Investment_Month__c=:month];
                
                ias.AM_Investment_Income__c=Profit;
                update ias;
            }
        }
    }
    @AuraEnabled(Cacheable=false)
    public static id uploadAddress(id AccountId,String fileName, String fileContents, String contentType,id vehicleId)
    {
        Attachment attachment = new Attachment(
            ParentId = AccountId,
            Name = fileName,
            ContentType = contentType,
            Body = EncodingUtil.base64Decode(fileContents)
        );
        insert attachment;
        
        return vehicleId; 
    }
    @AuraEnabled(Cacheable=true)
    public static list<product2> getProductPrice(id vid)
    {
        list<product2> pd=[select id,AM_Vehicle_Final_Amount__c,AM_Minimum_Sell_Price__c,AM_Profit__c 
                           from Product2 where id=:vid];
        
        
        return pd;
    }
    @AuraEnabled(Cacheable=true)
    public static decimal calculatingSalesDiscount(id vid,decimal discount ,decimal discountperc)
    {
        product2 pds=[select id,AM_Vehicle_Final_Amount__c,AM_Minimum_Sell_Price__c,AM_Profit__c 
                      from Product2 where id=:vid];
        
        decimal PriceSold=pds.AM_Vehicle_Final_Amount__c;
        
        if(discountperc!=0)
        {
            PriceSold=pds.AM_Vehicle_Final_Amount__c-(pds.AM_Vehicle_Final_Amount__c * (discountperc/100) ) ;            
        }
        if(discount!=0)
        {
            PriceSold=pds.AM_Vehicle_Final_Amount__c-discount ;
        }
        system.debug(PriceSold);
        return PriceSold;
    }
    @AuraEnabled
    public static void customerHasPaid(id vid,id cid,decimal pricesold,decimal discou,decimal discperc)
    {
        product2 pd=[select name,AM_Vehicle_Status__c from Product2 where id=:vid];
        pd.AM_Vehicle_Status__c='Sold-To-Customer';
        update pd;
        
        date solddate=system.today();
        
        list<AM_Customer_Enquiry__c> ce=[select name,AM_Customer_Enquiry_Status__c from AM_Customer_Enquiry__c 
                                         where AM_Customer__c=:cid Order BY name DESC Limit 1];
        
        for(AM_Customer_Enquiry__c c:ce)
        {
            c.AM_Customer_Enquiry_Status__c='Closed Won';
            update c;
        }
        
        AM_Vehicle_Sale__c vs=new AM_Vehicle_Sale__c();
        vs.AM_Customer__c=cid;
        vs.AM_Car_Id__c=vid;
        vs.AM_Vehicle_Discount__c=discou;
        vs.AM_Vehicle_Discount_Percent__c=discperc;
        vs.Am_Price_Sold__c=pricesold;
        vs.Am_Sold_Date__c=solddate;
        
        insert vs;
    }
    public class InvestmentProfitWrapper 
    {
        @AuraEnabled
        public Id investmentId {get; set;}
        @AuraEnabled
        public Decimal investmentAmount {get; set;}
        @AuraEnabled
        public Decimal investmentIncome{get; set;}
        @AuraEnabled
        public string investmentMonth{get; set;}
        @AuraEnabled
        public Decimal investmentProfit{get; set;}
        @AuraEnabled
        public decimal investmentYear{get; set;}
        
        public InvestmentProfitWrapper(AM_Investments_Profits__c pf) 
        {
            String[] Months = new List<String>();
            MOnths.add('Jan');
            MOnths.add('Feb');
            MOnths.add('Mar');
            MOnths.add('April');
            MOnths.add('May');
            MOnths.add('June');
            MOnths.add('July');
            MOnths.add('Aug');
            MOnths.add('Sep');
            MOnths.add('Oct');
            MOnths.add('Nov');
            MOnths.add('Dec');
            
            string Specifymonth;
            for(Integer i=1;i<=Months.size();i++)
            {
                if(pf.AM_Investment_Month__c==i)
                {
                    Specifymonth=Months[i-1];
                }
            }
            
            this.investmentId =pf.Id;
            this.investmentAmount =pf.AM_Investment_Amount__c;
            this.investmentIncome =pf.AM_Investment_Income__c;
            this.investmentMonth =Specifymonth;
            this.investmentProfit =pf.AM_Investment_Profit__c;
            this.investmentYear =pf.AM_Investment_Year__c;
            
        }
    }
    @AuraEnabled(Cacheable=true)
    public static list<InvestmentProfitWrapper> getInvestmentProfits(string searchTerm1 ,string searchTerm2)
    {
        string query;
        query='select id,AM_Investment_Amount__c,AM_Investment_Income__c,AM_Investment_Month__c,'+
            'AM_Investment_Profit__c,AM_Investment_Year__c '+
            'from AM_Investments_Profits__c ';
        
        if (searchTerm1 != '') 
        {
            query += ' WHERE AM_Investment_Month__c = ' + String.escapeSingleQuotes(searchTerm1);
        }
        if (searchTerm1 != '' && searchTerm2 != '') 
        {
            query += ' AND AM_Investment_Year__c = ' + String.escapeSingleQuotes(searchTerm2);
        }
        if (searchTerm1 == '' && searchTerm2 != '') 
        {
            query += ' Where AM_Investment_Year__c = ' + String.escapeSingleQuotes(searchTerm2);
        }
        
        list<AM_Investments_Profits__c> profits=Database.query(query);
        list<InvestmentProfitWrapper> WrapperProfits=new list<InvestmentProfitWrapper>();
        
        for(AM_Investments_Profits__c pf:profits)
        {
            WrapperProfits.add(new InvestmentProfitWrapper(pf));
        }
        return WrapperProfits;
    }
}