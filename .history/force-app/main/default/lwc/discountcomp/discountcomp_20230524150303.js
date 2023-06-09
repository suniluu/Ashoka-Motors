import { LightningElement,wire,track,api } from 'lwc';
import generatequote from '@salesforce/apex/Quote_Creation_Controller.createQuoteANDQuoteLineANDQuoteDoc';

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

   
        
        generatequote({ accountid: this.selectCustomer ,productid: this.selectedCar,discounttype:this.typeoddisc, discountperam:this.discount })
        .then(result => {
          this.records = result;
  
        })
  
        .catch(error => {
          this.errors = error;
        });

    }

}