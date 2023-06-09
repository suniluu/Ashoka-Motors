import { LightningElement,wire,track,api } from 'lwc';
import generatequote from '@salesforce/apex/Quote_Creation_Controller2.createQuoteANDQuoteLineANDQuoteDoc';

export default class Discountcomp extends LightningElement 
{
    @track typeoddisc='';
    @track discount='';
    @api selectCustomer='';
    @api selectedCar='';
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
    handlesave()
    {
      alert(this.selectCustomer);
      alert(this.selectedCar);
      alert(this.typeoddisc);
      alert(this.discount);

   
        
        generatequote({ accountid: this.selectCustomer ,productid: this.selectedCar,discounttype:this.typeoddisc, discountperam:this.discount })
        .then(result => {
          this.records = result;

  
        })
  
        getAttachmentUrlsForAccount({ accountId: this.recordId })
            .then((result) => {
                if (result ) {
                    alert(result);
                    window.open(result, '_blank');
                } else {
                    this.showToast('File not found', 'errornotfound');
                }
            })
            .catch((error) => {
                this.showToast(error.message, 'error');
            });

    }

}