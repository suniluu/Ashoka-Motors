import { LightningElement ,track,api,wire} from 'lwc';

import searchcustomer from '@salesforce/apex/getsearchfilterdatacontroller.searchcustomer';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { NavigationMixin } from 'lightning/navigation';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";

export default class Customereditcomp extends NavigationMixin(LightningElement)
{
    @track isModalOpen=true;
    @track phnum;
    @api objectApiName;
    @track recordId;

    connectedCallback() 
    {
      loadStyle(this, noHeader)
    }

    closeModal() 
    {
        this.isModalOpen = false;
    }
    handleSearchNumber(event)
    {
        this.phnum=event.target.value;
    }
    handlesearch()
    {
        searchcustomer({phnoNumber:this.phnum})
        .then((result) => 
        {
           this.recordId=result;
        });
        this.isModalOpen = false;
        
    }
    handleSuccess()
    {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Customer Details update successfully',
                variant: 'success',
            })
        )
      let compDefinition = {
            componentDef: "c:homescreen",
            attributes: {
                CustomerManagementValue:true
            }
        };
     
        // Base64 encode the compDefinition JS object
        let encodedCompDef = btoa(JSON.stringify(compDefinition));
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "/one/one.app#" + encodedCompDef
            }
        });

    }
}