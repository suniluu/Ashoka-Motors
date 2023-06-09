public with sharing class IndustryController {
    @AuraEnabled
    public static void addIndustryValue(String newIndustry) {
        try {
            // Query the Industry picklist field to retrieve the existing values
            Schema.DescribeFieldResult fieldResult = Account.Industry.getDescribe();
            List<Schema.PicklistEntry> existingValues = fieldResult.getPicklistValues();
            
            // Check if the newIndustry value already exists in the picklist
            for (Schema.PicklistEntry picklistEntry : existingValues) {
                if (picklistEntry.getValue().equalsIgnoreCase(newIndustry)) {
                    throw new AuraHandledException('The industry value already exists in the picklist.');
                }
            }
            
            // Create a new custom value and add it to the picklist
            List<Schema.PicklistEntry> newPicklistValues = new List<Schema.PicklistEntry>(existingValues);
            Schema.PicklistEntry newPicklistEntry = new Schema.PicklistEntry();
            newPicklistEntry.setLabel(newIndustry);
            newPicklistEntry.setValue(newIndustry);
            newPicklistValues.add(newPicklistEntry);
            
            // Update the Industry picklist field with the new values
            Schema.DescribeFieldResult updatedFieldResult = new Schema.DescribeFieldResult();
            updatedFieldResult.setPicklistValues(newPicklistValues);
            Account.Industry.putDescribe(updatedFieldResult);
        } catch (Exception ex) {
            throw new AuraHandledException('Error adding new industry value: ' + ex.getMessage());
        }
    }
}
