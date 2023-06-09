public with sharing class PrintQuoteController {
    @AuraEnabled(cacheable=true)
    public static List<Attachment> getAttachmentsForAccount(Id accountId) {
        // Query the attachments related to the account record
        List<Attachment> attachments = [SELECT Id, Name, Body, ContentType FROM Attachment WHERE ParentId = :accountId];
        
        // Create a map to hold the file details
        Map<String, String> fileDetails = new Map<String, String>();
        
        // Iterate through the attachments and store the file details
        for (Attachment attachment : attachments) {
            fileDetails.put(attachment.Name, '/servlet/servlet.FileDownload?file=' + attachment.Id);
        }
        
        // Return the file details
        return fileDetails;
    }
}
