global with sharing class Quote_Creation_Controller {
    public static Id quoteid;
    public static Id quoteDocId;
    public static integer i = 1;

    @AuraEnabled
    public static Id createQuoteANDQuoteLineANDQuoteDoc(Id accountid, Id productid,String discounttype,Integer discountperam) {
        // Retrieving Vehicle Record
        Product2 product = [SELECT Id, Name, AM_Brand__c, AM_Vehicle_Model__c, AM_Vehicle_Color__c, AM_Vehicle_Registration_Number__c, AM_Engine_Number__c, AM_Fuel_Type__c
                            FROM Product2
                            WHERE Id = :productid];

        // Retrieving Contact Record
        Account acc = [SELECT Name, Id
                        FROM Account 
                        WHERE Id = :accountid];

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

        // Creating Quote line to quote
        SBQQ__QuoteLine__c quoteline = new SBQQ__QuoteLine__c();
        quoteline.SBQQ__Quote__c = quoteid;
        quoteline.SBQQ__Product__c = productid;
        quoteline.SBQQ__Discount__c=discountperam;
        quoteline.SBQQ__AdditionalDiscountAmount__c=discountperam;
        insert quoteline;

        SBQQ__QuoteLine__c ql = [SELECT Id, Name FROM SBQQ__QuoteLine__c WHERE SBQQ__Quote__c = :quoteid];

        // Quote document creation        
        List<Id> documentIds = new List<Id>();
        Id templateId = 'a0xDo0000000Y1SIAU';
        Id qId = quoteid;

        // Generate the quote document
        Id jobId1 = SBQQ.QuoteDocumentController.generateDocument('en_US', qId, templateId, 'DocName', 'PDF', 'Default', documentIds);
        System.debug('Job ID 1: ' + jobId1);
        documentIds.add(qId);

        // Run Job 2 asynchronously after Job 1 completes
        runJob2Async(qId, templateId, documentIds);

        return jobId1;
    }

    @future
    public static void runJob2Async(Id quoteId, Id templateId, List<Id> documentIds) {
        // Perform Job 2 tasks here
        // This code will run asynchronously after Job 1 completes
        // ...
        System.debug('Running Job 2');
        System.debug('Quote ID: ' + quoteId);
        // Perform Job 2 tasks using quoteId, templateId, and documentIds
        // ...
        // Example: Save the proposal
        Id jobId2 = SBQQ.QuoteDocumentController.saveProposal('en_US', quoteId, templateId, 'DocName', 'PDF', 'Default', documentIds);
        System.debug('Job ID 2: ' + jobId2);
    }
}