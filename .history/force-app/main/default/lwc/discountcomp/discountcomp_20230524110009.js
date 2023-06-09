import { LightningElement } from 'lwc';

export default class Discountcomp extends LightningElement 
{
    get options1()

       {
    
     return [
    
      {label:'Available',value:'Available'},
    
     {label:'Dealer Location',value:'Dealer Location'},
    
     {label:'In Service',value:'In Service'},
    
     {label:'In Repair',value:'In Repair'},
    
     {label:'Sold To Customer',value:'Sold To Customer'}
    
    ]
    
    };

}