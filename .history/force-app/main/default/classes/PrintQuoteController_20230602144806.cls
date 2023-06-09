public with sharing class PrintQuoteController {
    @AuraEnabled(cacheable=true)
    public static List<FileDetails> getAttachmentsForAccount(Id accountId) {
        List<FileDetails> fileDetailsList = new List<FileDetails>();
        
        // Query the attachments related to the account record
        List<Attachment> attachments = [SELECT Id, Name FROM Attachment WHERE ParentId = :accountId];
        
        for (Attachment attachment : attachments) {
            FileDetails fileDetails = new FileDetails();
            fileDetails.Name = attachment.Name;
            fileDetails.FileUrl = '/servlet/servlet.FileDownload?file=' + attachment.Id;
            fileDetailsList.add(fileDetails);
        }
        
        return fileDetailsList;
    }
    
    public class FileDetails {
        @AuraEnabled
        public String Name { get; set; }
        
        @AuraEnabled
        public String FileUrl { get; set; }
    }
}
