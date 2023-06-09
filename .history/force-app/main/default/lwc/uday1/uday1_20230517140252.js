import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class AccountMultiSelectCombobox extends LightningElement {
    accountOptions = [];

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    @wire(getPicklistValuesByRecordType, {
        objectApiName: ACCOUNT_OBJECT,
        recordTypeId: '$objectInfo.data.defaultRecordTypeId'
    })
    wiredPicklistValues({ data, error }) {
        if (data) {
            // Extract picklist values and assign to accountOptions
            this.accountOptions = data.picklistFieldValues.YourPicklistFieldApiName.values;
        } else if (error) {
            console.error('Error retrieving picklist values', error);
        }
    }

    handleSelection(event) {
        const selectedValues = event.detail.value;
        // Handle selected values as needed
    }
}

