public with sharing class IndustryController {
    @AuraEnabled
    public static void addIndustryValue(String newIndustry) {
        try {
            // Query the Account object's Industry field
            Map<String, Schema.SObjectField> fieldMap = Account.SObjectType.getDescribe().fields.getMap();
            Schema.SObjectField industryField = fieldMap.get('Industry');
            
            // Retrieve the picklist values
            Schema.DescribeFieldResult fieldResult = industryField.getDescribe();
            List<Schema.PicklistEntry> picklistValues = fieldResult.getPicklistValues();
            
            // Check if the newIndustry value already exists in the picklist
            for (Schema.PicklistEntry picklistEntry : picklistValues) {
                if (picklistEntry.getValue().equalsIgnoreCase(newIndustry)) {
                    throw new AuraHandledException('The industry value already exists in the picklist.');
                }
            }
            
            // Create the new picklist value
            Metadata.MetadataPort service = new Metadata.MetadataPort();
            service.SessionHeader = new Metadata.SessionHeader_element();
            service.SessionHeader.sessionId = UserInfo.getSessionId();
            
            Metadata.CustomField customField = new Metadata.CustomField();
            customField.fullName = 'Account.Industry';
            customField.label = 'Industry';
            customField.type = 'Picklist';
            
            Metadata.PicklistValue newPicklistValue = new Metadata.PicklistValue();
            newPicklistValue.fullName = newIndustry.replaceAll(' ', '_');
            newPicklistValue.label = newIndustry;
            
            customField.picklist = new Metadata.Picklist();
            customField.picklist.sorted = false;
            customField.picklist.picklistValues = new Metadata.PicklistValue[] { newPicklistValue };
            
            Metadata.DeployContainer container = new Metadata.DeployContainer();
            container.addMetadata(customField);
            
            Metadata.DeployResult[] results = service.deploy(container);
            
            // Check for errors in the metadata deployment
            if (results[0].success) {
                // Success message or further actions
                System.debug('New industry value added successfully');
            } else {
                throw new AuraHandledException('Error adding new industry value: ' + results[0].errorMessage);
            }
        } catch (Exception ex) {
            throw new AuraHandledException('Error adding new industry value: ' + ex.getMessage());
        }
    }
}
