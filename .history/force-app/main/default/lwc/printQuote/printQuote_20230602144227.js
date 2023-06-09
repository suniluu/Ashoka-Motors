import { LightningElement ,api,wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
import getattachment from '@salesforce/apex/PrintQuoteController.getAttachmentsForAccount';

export default class PrintQuote extends LightningElement 
{
    @api recordId; // Id of the record where the Notes and Attachments are attached
   
    @wire(getRecord, { recordId: '$recordId'})
    account

    handleOpenQuote() {
       // const currentRecordId = this.recordId;
        alert(this.recordId);
        // Call an Apex method to retrieve the file details
        // Replace 'retrieveFileDetails' with the actual Apex method name
      
        getattachment({ accountId: this.recordId })
            .then((result) => {
                if (result) {
                    alert('new');
                    alert(result.FileUrl);
                    window.open(result.FileUrl, '_blank');
                } else {
                    this.showToast('File not found', 'error');
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