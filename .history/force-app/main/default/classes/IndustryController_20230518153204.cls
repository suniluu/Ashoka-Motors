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
            
            // Retrieve the current metadata for the Account object
            Metadata.CustomObject customObject = new Metadata.CustomObject();
            customObject.fullName = 'Account';
            Metadata.MetadataPort service = new Metadata.MetadataPort();
            service.SessionHeader = new Metadata.SessionHeader_element();
            service.SessionHeader.sessionId = UserInfo.getSessionId();
            Metadata.ReadResult[] readResults = service.readMetadata(new Metadata.ListMetadataQuery[] { new Metadata.ListMetadataQuery { type = 'CustomObject', folder = 'objects', fullName = 'Account' } });
            if (readResults.isEmpty() || readResults[0].records.isEmpty()) {
                throw new AuraHandledException('Account object metadata not found.');
            }
            customObject = (Metadata.CustomObject) readResults[0].records[0];
            
            // Add the new industry value to the picklist
            Metadata.CustomField customField = customObject.fields[0];
            Metadata.PicklistValue newPicklistValue = new Metadata.PicklistValue();
            newPicklistValue.fullName = newIndustry.replaceAll(' ', '_');
            newPicklistValue.label = newIndustry;
            customField.picklist.picklistValues.add(newPicklistValue);
            
            // Update the metadata
            Metadata.UpdateMetadataResult[] updateResults = service.updateMetadata(new Metadata.Metadata[] { customObject });
            if (updateResults[0].success) {
                // Success message or further actions
                System.debug('New industry value added successfully');
            } else {
                throw new AuraHandledException('Error adding new industry value: ' + updateResults[0].errors[0].message);
            }
        } catch (Exception ex) {
            throw new AuraHandledException('Error adding new industry value: ' + ex.getMessage());
        }
    }
}
