public class GetAttachmentPdfController {
    
    @AuraEnabled(cacheable=true)
    public static List<String> getAttachmentUrlsForAccount(Id accountId) {
        List<String> attachmentUrls = new List<String>();
        
        Attachment attachments = [SELECT Id FROM Attachment WHERE ParentId = :accountId limit 1];
        
        for (Attachment attachment : attachments) {
            String attachmentUrl = '/servlet/servlet.FileDownload?file=' + attachment.Id;
            attachmentUrls.add(attachmentUrl);
        }
        
        return attachmentUrls;
    }

}