import { LightningElement ,track,wire} from 'lwc';
import purchasedCarDetails1 from '@salesforce/apex/PurchaseCarDetails.purchasedCarDetails1';
import PurchasedVehiceStyles from '@salesforce/resourceUrl/PurchasedVehiceStyles';

import { NavigationMixin } from 'lightning/navigation';

import {loadStyle} from 'lightning/platformResourceLoader';

const columns = [
    {
        label: 'Vehicle No',
        fieldName: 'Id',
        type: 'url',
        typeAttributes: {
          label: { fieldName: 'Name' },
          target: '_blank'
        },
        hideDefaultActions: true,
        wrapText: true,
        cellAttributes: {
          alignment: 'left',
          class: 'url-cell' // Add a CSS class to the cell for event delegation
        }
      },
  
       
 
  
  { label: 'Purchase Date', sortable: "true", fieldName:'AM_Purchase_Date__c',hideDefaultActions :true,wrapText:true},
  { label: 'Brand', sortable: "true",fieldName: 'AM_Brand__c',hideDefaultActions :true,wrapText:true},
  { label: 'Model', sortable: "true", fieldName: 'AM_Vehicle_Model__c',hideDefaultActions :true},
  { label: 'KMS Travelled', sortable: "true", fieldName:'KMS_Travelled__c',hideDefaultActions :true,wrapText: true},
  { label: 'Color', sortable: "true", fieldName:'AM_Vehicle_Color__c',hideDefaultActions :true ,wrapText:true},
  { label: 'Owner Name', sortable: "true", fieldName:'AM_Owner_Name__c',hideDefaultActions :true ,wrapText:true},
  { label: 'Owner PhoneNo', sortable: "true", fieldName:'AM_Owner_Phone__c',hideDefaultActions :true ,wrapText:true},
  { label: 'Purchased Amount', sortable: "true", fieldName:'FinalAmount_beforeProfit__c',hideDefaultActions :true ,wrapText:true},
  { label: 'Funded Form', sortable: "true", fieldName:'AM_Purchase_Funded_From__c',hideDefaultActions :true ,wrapText:true},
  { label: 'Repair Cost', sortable: "true", fieldName:'AM_Repair_Amount__c',hideDefaultActions :true,wrapText:true},
  { label: 'Fuel Cost', sortable: "true", fieldName:'AM_Fuel_Cost__c',hideDefaultActions :true,wrapText:true},
  { label: 'Excepted Profit', sortable: "true", fieldName:'AM_Profit__c',hideDefaultActions :true ,wrapText:true},
  { label: 'Status', sortable: "true", fieldName:'AM_Vehicle_Status__c',hideDefaultActions :true},
];	

export default class PurchaseVehicleDetails extends NavigationMixin(LightningElement)
{   
  columns = columns;
  isCssLoaded = false
  @track sortBy='Name';
  @track sortDirection='asc';
  @track search='';
  @track recordId;
  @track showModal=true;

  @wire(purchasedCarDetails1,{field : '$sortBy',sortOrder : '$sortDirection',status:'$search'}) 
  Vehicles 

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

    connectedCallback() {
        this.addUrlCellClickListener();
      }
    
      addUrlCellClickListener() {
        const dataTable = this.template.querySelector('lightning-datatable');
        const urlCells = dataTable.querySelectorAll('.url-cell');
    
        urlCells.forEach((cell) => {
          cell.addEventListener('click', this.handleUrlClick.bind(this));
        });
      }
    
      handleUrlClick(event) {
        const recordId = event.target.dataset.recordid;
        const url = `https://trainingccx-dev-ed.develop.lightning.force.com/lightning/r/Product2/${recordId}/view`;
        window.open(url);
      }
    
    handleRowAction(event) {
        const action = event.detail.action;
        const recordId = event.detail.row.Id;
    
        if (action.name === 'view') {
          const url = `https://trainingccx-dev-ed.develop.lightning.force.com/lightning/r/Product2/${recordId}/view`;
          window.open(url);
        }
      }
    handleUrlClick(event) {
        const recordId = event.detail.row.Id;
        const url = `https://trainingccx-dev-ed.develop.lightning.force.com/lightning/r/Product2/${recordId}/view`;
        window.open(url);
      }
    handlesearch(event)
    {
        this.search=event.target.value;
    }
   
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

    hideModalBox() {  
        this.isShowModal = false;
    }

    handleVehicleClick(event)
    {
       
            this.recordId = event.detail.row.Id;
            alert(this.recordId);
            this.showModal = true;
        
    
    }

    doSorting(event) 
    {
        // calling sortdata function to sort the data based on direction and selected field
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
    }
    
    renderedCallback()
    { 
      if(this.isCssLoaded){
          return
      } 
  
      this.isCssLoaded = true
  
      loadStyle(this, PurchasedVehiceStyles).then(()=>{
          console.log("Loaded Successfully")
      }).catch(error=>{ 
          console.log(error)
      });
    }
}