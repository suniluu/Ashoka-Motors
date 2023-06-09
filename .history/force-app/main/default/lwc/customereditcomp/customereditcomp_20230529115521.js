import { LightningElement ,track,api,wire} from 'lwc';

import searchProduct from '@salesforce/apex/getsearchfilterdatacontroller.searchcustomer';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { NavigationMixin } from 'lightning/navigation';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";

export default class Customereditcomp extends NavigationMixin(LightningElement)
{
    @track isModalOpen=true;
    @track vehNum;
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
        this.vehNum=event.target.value;
    }
    handlesearch()
    {
        searchProduct({vehNumber:this.vehNum})
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
                message: 'Vehicle Details update successfully',
                variant: 'success',
            })
        )
      let compDefinition = {
            componentDef: "c:homescreen",
            attributes: {
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