public with sharing class AccountController {
  @AuraEnabled(cacheable=true)
  public static List<AccountNoteAttachment> getAccountNotesAttachments(Id accountId) {
      List<AccountNoteAttachment> results = new List<AccountNoteAttachment>();
      
      // Query the notes and attachments related to the account
      List<Note> notes = [SELECT Id, Title, Body FROM Note WHERE ParentId = :accountId];
      List<Attachment> attachments = [SELECT Id, Name, Body FROM Attachment WHERE ParentId = :accountId];
      
      // Create AccountNoteAttachment instances to hold the data
      for (Note note : notes) {
          results.add(new AccountNoteAttachment(note.Id, note.Title, note.Body, null, null));
      }
      
      for (Attachment attachment : attachments) {
          results.add(new AccountNoteAttachment(attachment.Id, attachment.Name, null, attachment.Body, attachment.BodyLength));
      }
      
      return results;
  }
  
  // Inner class to hold note and attachment data
  public class AccountNoteAttachment {
      @AuraEnabled public Id id { get; set; }
      @AuraEnabled public String title { get; set; }
      @AuraEnabled public String noteBody { get; set; }
      @AuraEnabled public Blob attachmentBody { get; set; }
      @AuraEnabled public Integer attachmentSize { get; set; }
      
      public AccountNoteAttachment(Id id, String title, String noteBody, Blob attachmentBody, Integer attachmentSize) {
          this.id = id;
          this.title = title;
          this.noteBody = noteBody;
          this.attachmentBody = attachmentBody;
          this.attachmentSize = attachmentSize;
      }
  }
}
