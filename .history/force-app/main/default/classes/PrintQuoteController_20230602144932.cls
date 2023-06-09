public with sharing class PrintQuoteController {
    @AuraEnabled(cacheable=true)
    public static List<String> getAttachmentUrlsForAccount(Id accountId) {
        List<String> attachmentUrls = new List<String>();
        
        List<Attachment> attachments = [SELECT Id FROM Attachment WHERE ParentId = :accountId];
        
        for (Attachment attachment : attachments) {
            String attachmentUrl = '/servlet/servlet.FileDownload?file=' + attachment.Id;
            attachmentUrls.add(attachmentUrl);
        }
        
        return attachmentUrls;
    }
}
