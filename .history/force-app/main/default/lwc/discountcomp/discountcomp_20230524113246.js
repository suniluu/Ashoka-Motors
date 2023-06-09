import { LightningElement,wire,track,api } from 'lwc';

export default class Discountcomp extends LightningElement 
{
    @track typeoddisc='';
    @track discount='';
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
        alert(this.typeoddisc);

        alert('click')
    }
    handlediscountchange(event) {

        this.discount = event.target.value;

    }

}