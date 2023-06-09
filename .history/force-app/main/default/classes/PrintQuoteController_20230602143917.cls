public  class PrintQuoteController {
    
    @AuraEnabled
    public static Attachment getAttachmentsForAccount(Id accountId) {
        Attachment attachment = [SELECT Id, Name, Body, ContentType FROM Attachment WHERE ParentId = :accountId limit 1 ];
     return attachment;
    }

}