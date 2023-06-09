public class GetAttachmentPdfController {
    
    @AuraEnabled(cacheable=true)
    public static Id getAttachmentsForAccount(Id accountId) {
        Attachment attachment = [SELECT Id, Name, Body, ContentType
                                 FROM Attachment
                                 WHERE ParentId = :accountId Limit 1];
       return attachment.ID;
    }

}