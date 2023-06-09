global with sharing class Quote_Creation_Controller {
    public static Id quoteid;
    public static Id quoteDocId;
    public static Integer i = 1;

    @AuraEnabled
    public static void createQuoteANDQuoteLineANDQuoteDoc(Id accountid, list<Id> productids,String discounttype,Integer discountperam) {
        // Retrieving Vehicle Record
        /*list<Product2> product1 = [SELECT Id, Name, AM_Brand__c, AM_Vehicle_Model__c, AM_Vehicle_Color__c, AM_Make_Year__c,AM_Vehicle_Registration_Number__c, AM_Engine_Number__c, AM_Fuel_Type__c
                            FROM Product2
                            WHERE Id In :productids];*/
        

        // Retrieving Contact Record
        Account acc = [SELECT Name, Id
                        FROM Account 
                        WHERE Id = :accountid];
        system.debug('accountid'+acc.Id);

        // Creating quote to contact
        SBQQ__Quote__c quote = new SBQQ__Quote__c();
        quote.SBQQ__Status__c = 'In Review';
        quote.SBQQ__Account__c = acc.Id;
        quote.SBQQ__Type__c = 'Quote';
        database.SaveResult dbs = database.insert(quote, false);
        if (dbs.isSuccess()) {
            System.debug('Quote Successfully inserted, Quote Id is: ' + dbs.getId());
            quoteid = dbs.getId();
        }
        system.debug('quote '+quote);
        system.debug('quoteID '+quoteid);

        list<SBQQ__QuoteLine__c> qyotwlines= new list<SBQQ__QuoteLine__c>();
        
        
        for(ID prod: productids)
        {
        SBQQ__QuoteLine__c quoteline = new SBQQ__QuoteLine__c();
        quoteline.SBQQ__Quote__c = quoteid;
        quoteline.SBQQ__Product__c = prod;
        if(discounttype=='Discount%')
        {
        quoteline.SBQQ__Discount__c=discountperam;
        }
        if(discounttype=='DiscountAmt')
        {
        quoteline.SBQQ__AdditionalDiscountAmount__c=discountperam;
        }
       
          qyotwlines.add(quoteline);
        }

        insert qyotwlines;
        system.debug('quotelines '+qyotwlines);

       SBQQ__Quote__c ql = [SELECT Id, Name FROM SBQQ__Quote__c WHERE Id = :quoteid];

        // Quote document creation        
        List<Id> documentIds = new List<Id>();
        Id templateId = 'a0xDo0000000Y1SIAU';
        Id qId = quoteid;
        documentIds.add(qId);
        system.debug('documentIds  '+documentIds);
        
        
        // Generate the quote document
        Id docId = SBQQ.QuoteDocumentController.generateDocument('en_US', qId, templateId, 'DocName', 'PDF', documentIds);
        system.debug('docId 1 '+docId);
        String ProposalName =  ql.Name;
       
      
         Id proposalJobId = SBQQ.QuoteDocumentController.saveProposal('en_US', qId, templateId,ProposalName, 'PDF', documentIds);
            
        // Save the proposal

    }
}