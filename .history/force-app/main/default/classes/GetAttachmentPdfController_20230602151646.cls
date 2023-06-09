public class GetAttachmentPdfController {
    
    @AuraEnabled(cacheable=true)
    public static String getAttachmentUrlsForAccount(Id accountId) {
        List<String> attachmentUrls = new List<String>();
        
        Attachment attachment = [SELECT Id FROM Attachment WHERE ParentId = :accountId limit 1];
        
        
         String attachmentUrl = '/servlet/servlet.FileDownload?file=' + attachment.Id;
            
      
        return attachmentUrl;
    }

}