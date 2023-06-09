import { LightningElement,wire,track,api } from 'lwc';
import generatequote from '@salesforce/apex/Quote_Creation_Controller.createQuoteANDQuoteLineANDQuoteDoc';

export default class Discountcomp extends LightningElement 
{
    @track typeoddisc='';
    @track discount='';
    @api selectCustomer='';
    @api selectedCar='';
    @api selectedCars2; 
    get options1()

       {
    
     return [
    
     {label:'Discount%',value:'Discount%'},
    
     {label:'Discount Amt',value:'DiscountAmt'},
    
     
    
    ]
    
    };
    handlechange(event)
    {
        this.typeoddisc=event.target.value;
        

       
    }
    handlediscountchange(event) {

        this.discount = event.target.value;
        

    }
    handlesave() {
      alert('uday');
      alert(this.selectCustomer);
      alert(this.selectedCars2);
      alert(this.typeoddisc);
      alert(this.discount);
    
      generatequote({ accountid: this.selectCustomer, productids: this.selectedCars2, discounttype: this.typeoddisc, discountperam: this.discount })
        .then(result => {
          this.records = result;
         
        })
        .catch(error => {
          this.errors = error;
        });
    }
    
    handleOpenQuote() {
      alert('quote');
      alert(this.selectCustomer);
    
      getAttachmentUrlsForAccount({ accountId: this.selectCustomer })
        .then(result => {
          if (result) {
            alert(result);
            window.open(result, '_blank');
          } else {
            this.showToast('File not found', 'errornotfound');
          }
        })
        .catch(error => {
          this.showToast(error.message, 'error');
        });
    }
    

}