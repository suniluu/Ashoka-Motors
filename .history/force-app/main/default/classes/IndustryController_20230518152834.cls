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
            MetadataService.MetadataPort service = new MetadataService.MetadataPort();
            service.SessionHeader = new MetadataService.SessionHeader_element();
            service.SessionHeader.sessionId = UserInfo.getSessionId();
            
            MetadataService.CustomValue customValue = new MetadataService.CustomValue();
            customValue.fullName = 'Account.Industry.' + newIndustry.replaceAll(' ', '_');
            customValue.label = newIndustry;
            
            MetadataService.CustomField customField = new MetadataService.CustomField();
            customField.fullName = 'Account.Industry';
            customField.label = 'Industry';
            customField.type_x = 'Picklist';
            customField.visibleLines = 5;
            customField.picklist = new MetadataService.Picklist();
            customField.picklist.picklistValues = new List<MetadataService.PicklistValue>();
            customField.picklist.picklistValues.add(customValue);
            
            MetadataService.CustomObject customObject = new MetadataService.CustomObject();
            customObject.fullName = 'Account';
            customObject.fields = new List<MetadataService.CustomField>{ customField };
            
            MetadataService.SaveResult[] results = service.updateMetadata(new MetadataService.Metadata[] { customObject });
            
            // Check for errors in the metadata update
            if (results[0].success) {
                // Success message or further actions
                System.debug('New industry value added successfully');
            } else {
                throw new AuraHandledException('Error adding new industry value: ' + results[0].errors[0].message);
            }
        } catch (Exception ex) {
            throw new AuraHandledException('Error adding new industry value: ' + ex.getMessage());
        }
    }
}
