import { LightningElement ,track,wire} from 'lwc';
import getvehicleinfo from '@salesforce/apex/VehclRepairHandlerClass.getvehicleinfo';
import deleteSelectVehicles from '@salesforce/apex/VehclRepairHandlerClass.deleteSelectVehicles';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';


import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/Colors1'

const columns = [
    { label: 'Vehicle Name', fieldName: 'Name',sortable: "true",cellAttributes: {
        class: 'slds-theme_shade slds-text-color_error',
        style:"Font-weight:bold"
        
    }},
    { label: 'Vehicle Registration No', fieldName: 'AM_Vehicle_Registration_Number__c',sortable: "true" },
    { label: 'Brand', fieldName: 'AM_Brand__c' ,sortable: "true"},
    { label: 'Model', fieldName: 'AM_Vehicle_Model__c' ,sortable: "true"},
    { label: 'Edit', type: 'button', typeAttributes: { 
        label: 'Edit', 
        name: 'edit',
        iconName: 'utility:edit',
        variant: 'brand'
      }
    },
    { label: 'Delete',type: 'button', typeAttributes: { 
        label: 'Delete', 
        name: 'delete',
        iconName: 'utility:delete',
        variant: 'brand'
      }
    }
];

export default class VehicleManagement extends NavigationMixin(LightningElement) {


    columns = columns;
    isCssLoaded = false

    @wire(getvehicleinfo,{field : '$sortBy',sortOrder : '$sortDirection',searchTerm: '$searchTerm'}) 
    Vehicles 
    @track sortBy='Name';
    @track sortDirection='asc';
    @track searchTerm = '';

    
    CallMain()
    {
        let compDefinition = {
            componentDef: "c:SideBarAllComponents",
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
    
   
    handleSearch(event) 
    {
        this.searchTerm = event.target.value;
    }


    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;

        switch (action.name) {
            case 'edit':
                this.editProduct(row);
                break;
            default:
        }
        switch (action.name) {
            case 'delete':
                this.deleteProduct(row);
                break;
            default:
        }
    }

    editProduct(row) 
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: row.Id,
                objectApiName: 'Product2',
                actionName: 'edit'
            }
        });    
    }
   
    CreateVehicle()
    {
        let compDefinition = {
            componentDef: "c:AM_VehicleEntryComp",
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
    deleteProduct(row)
    {
        deleteSelectVehicles({vid:row.Id})
        .then(() => {
            // Refresh the @wire function to update the UI with the latest data
            return refreshApex(this.Vehicles);
        })
        .then(() => {
            // Display a success toast message
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Vehicle deleted successfully',
                    variant: 'success',
                })
            );
        })
    }
    doSorting(event) {
        // calling sortdata function to sort the data based on direction and selected field
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
    }
    
    renderedCallback(){ 
        if(this.isCssLoaded){
            return
        } 
 
        this.isCssLoaded = true
 
        loadStyle(this, COLORS).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.log(error)
        });
    }
}