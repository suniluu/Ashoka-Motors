import { LightningElement ,track,wire} from 'lwc';
import getvehicleinfo from '@salesforce/apex/VehclRepairHandlerClass.getvehicleinfo';

import { NavigationMixin } from 'lightning/navigation';

import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/Colors1'
const columns = [
    { label: 'Vehicle Name',sortable: "true", fieldName: 'Name' ,cellAttributes: {
        class: 'slds-theme_shade slds-text-color_error',
        style:"Font-weight:bold"}
    },
    { label: 'Vehicle Registration No', sortable: "true", fieldName: 'AM_Vehicle_Registration_Number__c' },
    { label: 'Brand', sortable: "true",fieldName: 'AM_Brand__c' },
    { label: 'Model', sortable: "true", fieldName: 'AM_Vehicle_Model__c' }
];

export default class PurchaseManagement extends NavigationMixin(LightningElement) {
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
    
    columns = columns;
    
    isCssLoaded = false

    @wire(getvehicleinfo,{field : '$sortBy',sortOrder : '$sortDirection',searchTerm: '$searchTerm'}) Vehicles 
    @track sortBy='Name';
    @track sortDirection='asc';

    @track searchTerm = '';

    handleSearch(event) 
    {
        this.searchTerm = event.target.value;
    }

    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;
    }

    doSorting(event) {
        // calling sortdata function to sort the data based on direction and selected field
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
    }
    
    renderedCallback(){ 
        if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, COLORS).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
        })
    }
}