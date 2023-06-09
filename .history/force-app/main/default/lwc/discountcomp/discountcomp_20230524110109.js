import { LightningElement } from 'lwc';

export default class Discountcomp extends LightningElement 
{
    get options1()

       {
    
     return [
    
      {label:'Discount%',value:'Discount%'},
    
     {label:'Discount Amt',value:'Discount Am'},
    
     
    
    ]
    
    };

}