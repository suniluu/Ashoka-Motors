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
    
     {label:'Discount Amt',value:'Discount Amt'},
    
     
    
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
     getallpreferedvehcls({ custid: this.customerid })
      .then(result => {
        this.records = result;

      })

      .catch(error => {
        this.errors = error;
      });
        alert(this.typeoddisc);
        alert(this.discount);
        alert(this.selectCustomer);
        alert(this.selectedCar);
        

    }

}