import { LightningElement,track,wire ,api} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import vehical_detail_obj from '@salesforce/schema/Product2';
import brand from '@salesforce/schema/Product2.AM_Brand__c';
import model from '@salesforce/schema/Product2.AM_Vehicle_Model__c';
import Make_Year from '@salesforce/schema/Product2.AM_Make_Year__c';

import insertVehicleRecord from '@salesforce/apex/VehiclequickcompController.insertVehicleRecord';
import gotoVehicleRepairDetail from '@salesforce/apex/VehiclequickcompController.gotoVehicleRepairDetail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
import { NavigationMixin } from 'lightning/navigation';
export default class AMVehicleQuickComponent extends NavigationMixin(LightningElement) {
   @api options1 = [];
   @api options2 = [];
   @api options3 = [];
  
   @api recordId;
   @track vehRepairId;

   @api vehBrand='';
   @api vehModel='';
   @api vehResNum='';
   @api vehRegDate='';
   @api makeYear='';
   @api vehRepairReq='';
   @api vehActive='';
   @api purAmt='';
   @api kms='';
   @api vehVariant='';
   @api prfAmt='';
   @track purDate='';

   handleModelChange(event)
   {
    const fieldName = event.target.name;
    const value = event.target.value;
    if (fieldName === 'vehModel') 
    {
        this.vehModel = value;
    } 

   }
   handleBrandChange(event){
    let key = this.slaFieldData.controllerValues[event.target.value];
    this.options2 = this.slaFieldData.values.filter(opt => opt.validFor.includes(key));

    const fieldName = event.target.name;
    const value = event.target.value;
    if (fieldName === 'vehBrand') {
        this.vehBrand = value;
    } 

   }
   handleFieldChange(event) {
   

    const fieldName = event.target.name;
    const value = event.target.value;

    
    if (fieldName === 'vehResNum') {
        this.vehResNum = value;
    } 
    if (fieldName === 'makeYear') {
        this.makeYear = value;
    }
    if (fieldName === 'purAmt') {
        this.purAmt = value;
    } 
    if (fieldName === 'vehVariant') {
        this.vehVariant = value;
    }
    if (fieldName === 'vehRegDate') {
        this.vehRegDate = value;
    }
    if (fieldName === 'purDate') {
        this.purDate = value;
    } 
    if (fieldName === 'kms') {
        this.kms = value;
    }
    if (fieldName === 'prfAmt') {
        this.prfAmt = value;
    } 
    if (fieldName === 'vehRepairReq') {
        this.vehRepairReq = event.target.checked;
    } 
    if (fieldName === 'vehActive') {
        this.vehActive = event.target.checked;
    } 
    }

    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: brand})
    typePicklistValues({error, data}) {
        if(data) {
            this.options1 = data.values;
        }
           
        
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: model})
    typePicklistValues1({error, data}) {
        if(data) {
            if (data) this.slaFieldData = data;
        }
           
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Make_Year})
    typePicklistValues2({error, data}) {
        if(data) {
            this.options3 = data.values;
        }
    }
   
    HandleInsert(event) 
    { 
        console.log('Hello');
        console.log(this.vehResNum);
        console.log(this.vehBrand);
        console.log(this.vehModel);
        console.log(this.makeYear);
        console.log(this.vehRepairReq);
        console.log(this.purAmt);
        console.log(this.prfAmt);
        console.log(this.vehVariant);
        console.log(this.vehRegDate);
        console.log(this.purDate);
        console.log(this.kms);



        insertVehicleRecord({vehName: this.vehResNum,vehBrand:this.vehBrand,vehModel:this.vehModel,
        vehMake:this.makeYear,vehRepair:this.vehRepairReq,vehPurAmt:this.purAmt,prfAmt: this.prfAmt,
        vehVariant:this.vehVariant,
        vehPurDate:this.purDate,
        vehRegDate: this.vehRegDate,
        vehKms: this.kms})
        .then(() => 
        {
            // Display a success toast message
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Vehicle Inserted successfully',
                    variant: 'success',
                })
            )
        })
        .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Vehicle Not Inserted successfully',
                    variant: 'Error',
                })
            )
        });

    }
}