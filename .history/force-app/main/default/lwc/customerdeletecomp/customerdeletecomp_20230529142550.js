import { LightningElement ,track,api,wire} from 'lwc';

import searchcustomer from '@salesforce/apex/getsearchfilterdatacontroller.searchcustomer';
import deleteVehicle from '@salesforce/apex/getsearchfilterdatacontroller.deletecustomer';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { NavigationMixin } from 'lightning/navigation';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";

export default class Customerdeletecomp extends NavigationMixin(LightningElement)
 {
    @track isModalOpen=true;
    @track vehNum;
    @api objectApiName;
    recordId;

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
       
        searchcustomer({phnoNumber:this.vehNum})
        .then((result) => 
        {
            alert(result);
            this.recordId=result;
            this.handleDelete();
        });
       
      
        this.isModalOpen = false;
        
        
    }
    handleDelete()
    {
       deleteVehicle({productId:this.recordId})
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Vehicle Details delete successfully',
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