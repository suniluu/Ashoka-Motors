import { LightningElement,wire,track,api } from 'lwc';

export default class Discountcomp extends LightningElement 
{
    @track typeoddisc='';
    get options1()

       {
    
     return [
    
      {label:'Discount%',value:'Discount%'},
    
     {label:'Discount Amt',value:'Discount Am'},
    
     
    
    ]
    
    };
    handlechange(event)
    {
        this.typeoddisc=event.target.value;
        alert(this.typeoddisc);

        alert('click')
    }

}