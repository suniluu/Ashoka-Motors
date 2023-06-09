global with sharing class Quote_Creation_Controller {
    public static Id quoteid;
    public static Id quoteDocId;
    public static integer i=1;
    
    @AuraEnabled
    public static id createQuoteANDQuoteLineANDQuoteDoc(id accountid, id productid){
        // Retrieving Vehicle Record
        Product2 product=[SELECT Id,Name,AM_Brand__c,AM_Vehicle_Model__c, AM_Vehicle_Color__c,
                          AM_Vehicle_Registration_Number__c,AM_Engine_Number__c,AM_Fuel_Type__c
                          FROM Product2
                          WHERE id=:productid];
        system.debug(product);
        //Retrieving Contact Record
        Contact acc=[SELECT Name,Id,AccountId
                     FROM Contact 
                     WHERE id=:accountid];
        system.debug(acc);
        //Creating quote to contact
        SBQQ__Quote__c quote=new SBQQ__Quote__c();
        quote.SBQQ__Status__c='In Review';
        quote.SBQQ__PrimaryContact__c=acc.id;
         quote.SBQQ__Account__c=acc.AccountId;
        quote.SBQQ__PricebookId__c='01s5i00000FJAz7AAH';
        quote.SBQQ__Type__c='Quote';
        database.SaveResult dbs = database.insert(quote,false);
        if (dbs.isSuccess()) {
            System.debug('Quote Successfully inserted, Quote Id is: ' + dbs.getId());
            quoteid=dbs.getId();
        }
        //Creating Quote line to quote
        SBQQ__QuoteLine__c quoteline=new SBQQ__QuoteLine__c();
        quoteline.SBQQ__Quote__c=quoteid;
        quoteline.SBQQ__Product__c=productid;
        insert quoteline;
        system.debug('Quote Line Created Successfully'+quoteid);
        
        SBQQ__QuoteLine__c ql=[select id,Name From SBQQ__QuoteLine__c where SBQQ__Quote__c=:quoteid];
        system.debug('Quote Line Id: '+ql);
        //quote document creation        
        List<id> documentIds = new List<id>();
        id templateId = 'a0o5i000000NKY0AAO';
        id qId=quoteid;
        
        //  String quoteName=q.Name;
        //  String DocName=quoteName+'-'+sToday+'-'+'000'+i;
        
        id jobId = SBQQ.QuoteDocumentController.generateDocument('en_US', qId, templateId, 'DocName', 'PDF', 'Default', documentIds);
        System.debug('Job ID 1: ' + jobId);
        documentIds.add(qId);
        system.debug(qId);
        id jobId2 = SBQQ.QuoteDocumentController.saveProposal('en_US', qId, templateId, 'DocName', 'PDF', 'Default', documentIds);
        
        System.debug('Job ID 2: ' + jobId2);
        System.debug('Quote ID: ' + documentIds);

        return jobId2;
        
    }
    
    
    
}