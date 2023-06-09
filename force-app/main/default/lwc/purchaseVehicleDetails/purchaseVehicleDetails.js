import { LightningElement ,api,track,wire} from 'lwc';
import purchasedCarDetails1 from '@salesforce/apex/PurchaseCarDetailsController.purchasedCarDetails1';
import getProductId from '@salesforce/apex/PurchaseCarDetailsController.getProductId';
import { getPicklistValues} from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import vehicle_obj from '@salesforce/schema/Product2';
import Model from '@salesforce/schema/Product2.AM_Vehicle_Model__c';

import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/PurchasedVehiceStyles';

const columns = [
  {
    label: 'Vehicle No',
    sortable: true,
    fieldName: 'vehName',
    type: 'button',
    typeAttributes: {
        label: { fieldName: 'Name' }
    },
    cellAttributes: {
        class: 'slds-theme_default slds-text-link',
    },
    actions:{label: 'Details', name: 'Details'
    }
    },	
 //  { label: 'Owner Name', sortable: "true", fieldName:'AM_Owner_Name__c',
  // hideDefaultActions: "true"},
  { label: 'Owner PhoneNo', sortable: "true", fieldName:'AM_Owner_Phone__c',initialWidth: 99},

    { label: 'Purchase Date', sortable: true, fieldName: 'AM_Purchase_Date__c', type: 'date',
     typeAttributes: {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    },initialWidth: 90},
  { label: 'Brand', sortable: "true",fieldName: 'AM_Brand__c',initialWidth: 95},
  { label: 'Model', sortable: "true", fieldName: 'AM_Vehicle_Model__c',initialWidth: 80},
  { label: 'KMS Driven', sortable: "true", fieldName:'KMS_Travelled__c',initialWidth: 80},
//  { label: 'Color', sortable: "true", fieldName:'AM_Vehicle_Color__c'},
  { label: 'Fund From', sortable: "true", fieldName:'AM_Purchase_Funded_From__c',initialWidth: 70},
  { label: 'Purchased Amount', sortable: "true", fieldName:'AM_Purchase_Amount__c',type:'currency',initialWidth: 95},
  {label:'Dealer Price',sortable:"true",fieldName:'AM_Dealer_Price__c',type:'currency',initialWidth: 95},
  { label: 'Repair Cost', sortable: "true", fieldName:'AM_Repair_Amount__c',type:'currency',initialWidth:80},
  { label: 'Fuel Cost', sortable: "true", fieldName:'AM_Fuel_Cost__c',type:'currency',initialWidth:80},
  { label: 'Excepted Profit', sortable: "true", fieldName:'AM_Profit__c',type:'currency',initialWidth: 95},
  { label: 'Total Amount', sortable: "true", fieldName:'AM_Vehicle_Final_Amount__c',type:'currency',initialWidth:95},
  { label: 'Status', sortable: "true", fieldName:'AM_Vehicle_Status__c',initialWidth:90},
];	

export default class PurchaseVehicleDetails extends NavigationMixin(LightningElement)
{   
  columns = columns; 
  isCssLoaded = false

  @track sortBy='Name';
  @track sortDirection='asc';
  @track searchstatus='';
  @track searchbrand='';
  @track searchmodel='';
  @track searchamount='';
  @track recordId;
  @track recordName;
  @track isModalOpen=false;
  @track selectedVehicle = {};
  @track options3=[];
  
  @wire(purchasedCarDetails1,{field : '$sortBy',sortOrder : '$sortDirection',status:'$searchstatus',brand:'$searchbrand',model:'$searchmodel',amount:'$searchamount'}) 
  Vehicles

  
  handleRowAction(event) {
    const row = event.detail.row;
    const vehicleNo = row.Name;
     this.recordName=vehicleNo;
     
      getProductId({productName:this.recordName})
      .then(result => 
        {
          this.data=result;
          this.recordId= this.data;
        
        })
         .catch((error) => {
          console.error(error);
        });
        this.isModalOpen=true;
   }
   hideModalBox() {  
    this.isModalOpen = false;
   }
 
  get options1()
    {
        return [
            {label:'Available',value:'Available'},
            {label:'Dealer Location',value:'Dealer Location'},
            {label:'In Service',value:'In Service'},
            {label:'In Repair',value:'In Repair'},
            {label:'Sold',value:'Sold'},
            {label:'Renew Registration',value:'Renew Registration'},
               ] 
    };

    handlesearchstatus(event)
    {
        this.searchstatus=event.target.value;
    }
   

    get options2()
    {
      return[
        {label:'Maruti Suzuki',value:'Maruti Suzuki'},
        {label:'Tata',value:'Tata'},
        {label:'Hyundai',value:'Hyundai'},
        {label:'Mahindra',value:'Mahindra'},
        {label:'BMW',value:'BMW'},
        {label:'Toyota',value:'Toyota'},
        {label:'Mercedes-Benz',value:'Mercedes-Benz'},
        {label:'Kia',value:'Kia'},
        {label:'Honda',value:'Honda'},
        {label:'Audi',value:'Audi'},
        {label:'Ford',value:'Ford'},
        {label:'Volkswagen',value:'Volkswagen'},
        {label:'Renault',value:'Renault'}
      ]
    }
    
    handlesearchbrand(event)
    {
      this.searchbrand= event.target.value;
    }
   
    @wire(getObjectInfo, { objectApiName: vehicle_obj })
    objectInfo;
    
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Model})
    typePicklistValues({error, data}) 
    {
        if(data) 
        {
            this.options3 = data.values; 
        }    
    }

    handlesearchmodel(event)
    {
      this.searchmodel= event.target.value;
     
      purchasedCarDetails1({model:this.searchmodel})
       .then(result => {
        
           this.records = result;   
       })
       .catch(error => {
           this.errors = error;
         
       });
    }
    
  get options4()
    {
      return [
          {label:'10000-50000',value:'10000-50000'},
          {label:'50000-100000',value:'50000-100000'},
          {label:'100000-300000',value:'100000-300000'},
          {label:'300000-500000',value:'300000-500000'},
          {label:'500000-800000',value:'500000-800000'},
          {label:'800000-1000000',value:'800000-1000000'},
          {label:'1000000-1200000',value:'1000000-1200000'},
          {label:'1200000-1500000',value:'1200000-1500000'},
          {label:'1500000-2000000',value:'1500000-2000000'},
             ] 
  };

    handlesearchamount(event)
    {
      this.searchamount= event.target.value;
    }
    
    handleSuccess(event) {
      //event.preventDefault();
      this.dispatchEvent(
          new ShowToastEvent({
              title: 'Success',
              message: 'Vehicle Details updated successfully',
              variant: 'success'
          })
      );
     location.reload();
  }
    doSorting(event) 
    {
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
  CallMain()
    {
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