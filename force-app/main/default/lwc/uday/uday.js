import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import getAccountNotesAttachments from '@salesforce/apex/AccountControllerr.getAccountNotesAttachments';

export default class AccountNotesAttachments extends NavigationMixin(LightningElement) {
    @api recordId;
    accountNotesAttachments;
    
    @wire(getRecord, { recordId: '$recordId', fields: ['Account.Name'] })
    account;

    @wire(getAccountNotesAttachments, { accountId: '$recordId' })
    wiredAccountNotesAttachments({ error, data }) {
        if (data) {
            this.accountNotesAttachments = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleDownload(event) {
        const attachmentId = event.target.dataset.attachmentId;
        
        // Construct the download URL using the attachmentId
        const downloadUrl = `/servlet/servlet.FileDownload?file=${attachmentId}`;
        
        // Open the download URL in a new tab/window
        window.open(downloadUrl, '_blank');
    }
}