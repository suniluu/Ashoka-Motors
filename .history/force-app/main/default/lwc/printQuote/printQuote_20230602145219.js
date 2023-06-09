import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
import getAttachmentUrlsForAccount from '@salesforce/apex/PrintQuoteController.getAttachmentUrlsForAccount';

export default class PrintQuote extends LightningElement {
    @api recordId; // Id of the record where the Notes and Attachments are attached

    @wire(getRecord, { recordId: '$recordId' })
    account;

    handleOpenQuote() {
        alert(this.recordId);

        getAttachmentUrlsForAccount({ accountId: this.recordId })
            .then((result) => {
                if (result && result.length > 0) {
                    const fileUrl = result[0];
                    alert('new');
                    alert(fileUrl);
                    window.open(fileUrl, '_blank');
                } else {
                    this.showToast('File not found', 'errornotfound');
                }
            })
            .catch((error) => {
                this.showToast(error.message, 'error');
            });
    }

    showToast(message, variant) {
        const toastEvent = new ShowToastEvent({
            title: 'Error',
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }
}
