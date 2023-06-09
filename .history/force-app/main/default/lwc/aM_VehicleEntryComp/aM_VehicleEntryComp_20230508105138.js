import { LightningElement,track,wire,api} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import vehical_detail_obj from '@salesforce/schema/Product2';

import brand from '@salesforce/schema/Product2.AM_Brand__c';
import model from '@salesforce/schema/Product2.AM_Vehicle_Model__c';
import bodytype from '@salesforce/schema/Product2.AM_Body_Type__c';
import color from '@salesforce/schema/Product2.AM_Vehicle_Color__c';
import Vehiclecapacity from '@salesforce/schema/Product2.AM_Vehicle_Capacity__c';
import transmissionType from '@salesforce/schema/Product2.AM_Transmission_Type__c';
import vehicleAge from '@salesforce/schema/Product2.AM_Vehicle_Age__c';
import Door_Style from '@salesforce/schema/Product2.AM_Door_Style_Type__c';
import Fuel_Type from '@salesforce/schema/Product2.AM_Fuel_Type__c';
import AM_No_of_Pre_Owner from '@salesforce/schema/Product2.AM_No_of_Pre_Owner__c';
//import AM_Condition_Type from '@salesforce/schema/Product2.AM_Condition_Type__c';
//import AM_Odometer_Status from '@salesforce/schema/Product2.AM_Odometer_Status__c';
import AM_OEM_Service from '@salesforce/schema/Product2.AM_OEM_Service__c';
import Battery_Type from '@salesforce/schema/Product2.AM_Battery_Type__c';
import Engine_Name from '@salesforce/schema/Product2.AM_Engine_Name__c';
import Make_Year from '@salesforce/schema/Product2.AM_Make_Year__c';
import fundedFrom from '@salesforce/schema/Product2.AM_Purchase_Funded_From__c';
//import KMS_Travelled from '@salesforce/schema/Product2.KMS_Travelled__c';
import Vehicle_Status from '@salesforce/schema/Product2.AM_Vehicle_Status__c';
import Vehicle_Owner_Type from '@salesforce/schema/Product2.AM_Vehicle_Owner_Type__c';

import insertVehicleInformation from '@salesforce/apex/AmVehicleEntryController.insertVehicleInformation'; 
import updateVehicleDetails from '@salesforce/apex/AmVehicleEntryController.updateVehicleDetails'; 
import updateOwnerDetails from '@salesforce/apex/AmVehicleEntryController.updateOwnerDetails'; 
import uploadVehicleImages from '@salesforce/apex/AmVehicleEntryController.uploadVehicleImages'; 
//import updateOdometerDetails from '@salesforce/apex/AmVehicleEntryController.updateOdometerDetails'; 
//import updateManufactureDetails from '@salesforce/apex/AmVehicleEntryController.updateManufactureDetails'; 
import updateServicingDetails from '@salesforce/apex/AmVehicleEntryController.updateServicingDetails'; 
import updateSubWarranty from '@salesforce/apex/AmVehicleEntryController.updateSubWarrantyDetails'; 


import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AM_VehicleEntryComp extends LightningElement 
{
    
    @track currentStep = '1';
    @track options1 = [];
    @track options2 = [];
    @track options3 = [];
    @track options4 = [];
    @track options5 = [];
    @track options6 = [];
    @track options7 = [];
    @track options8 = [];
    @track options9 = [];
    @track options10 = [];
    @track options11 = [];
    @track options12 = [];
    @track options13 = [];
    @track options14 = [];
    @track options15 = [];
    @track options16 = [];
    @track options17 = [];
    @track options18 = [];
    @track options20 = [];
    @track options21 = [];

    @track recordId;

    @api vehIdNum='';
    @api vehBrand='';
    @api vehModel='';
    @api vehResNum='';
    @api fueltype='';
    @api vehColor='';
    @api vehTranType='';
    @api vehAge='';
    @api makeYear='';
    @api vehRepairReq='';
    @api vehActive='';
    @api vehLoan='';
    @api fundfrom='';
    @api purDate='';
    @api profit='';
    @api purAmt='';
    @api vehStatus='';
    @api vehVariant='';

    @api vehBody='';
    @api vehCap='';
    @api AccTime='';
    @api kms='';
    @api batterytype='';
    @api fueltank='';
    @api engineCap='';
    @api engNum='';
    @api chsNum='';

    @api ownerName='';
    @api ownerPhone='';
    @api ownerEmail='';
    @api preOwner='';
    @api sellPrice='';
    @api vehSingleOwner='';
    @api vehDoctor='';
    @api vehInsurance='';
    @api vehRTA='';
    @api targetPrice='';
    @api owntype='';
    @api owneraddress='';
    @api ownerAdhar='';


    @track vehmain='';
    @track vehImg1='';
    @track vehImg2='';
    @track vehImg3='';
    @track vehImg4='';
/*
    @api readingDate='';
    @api lastReading='';
    @api condntype='';
    @api odoStatus='';

    @api ManfDate='';
    @api stockCode='';
    @api batchNo='';
    @api plantName='';
*/
    @api serviceActive='';
    @api oemService='';
    @api serviceLD='';
    @api serviceND='';

    @api subCount='';
    @api warrantyCount='';
    @api warStrartDate='';
    @api warEndDate='';


    connectedCallback() 
    {
      loadStyle(this, noHeader)
    }

  
    handleFieldChange(event) {
        let key = this.slaFieldData.controllerValues[event.target.value];
        this.options2 = this.slaFieldData.values.filter(opt => opt.validFor.includes(key));

        const fieldName = event.target.name;
        const value = event.target.value;
       
        if (fieldName === 'vehIdNum') {
            this.vehIdNum = value;
        } 
        if (fieldName === 'vehBrand') {
            this.vehBrand = value;
        } 
        if (fieldName === 'vehModel') {
            this.vehModel = value;
        } 
        if (fieldName === 'vehResNum') {
            this.vehResNum = value;
        } 
         if (fieldName === 'fueltype') {
            this.fueltype = value;
        } 
        if (fieldName === 'vehTranType') {
            this.vehTranType = value;
        } 
        if (fieldName === 'vehAge') {
            this.vehAge = value;
        } 
         if (fieldName === 'makeYear') {
            this.makeYear = value;
        } 
         if (fieldName === 'fundfrom') {
            this.fundfrom = value;
        } 
         if (fieldName === 'purDate') {
            this.purDate = value;
        } 
        if (fieldName === 'profit') {
            this.profit = value;
        } 
       
         if (fieldName === 'purAmt') {
            this.purAmt = value;
        } 
        if (fieldName === 'vehRepairReq') {
            this.vehRepairReq = event.target.checked;
        } 
         if (fieldName === 'vehActive') {
            this.vehActive = event.target.checked;
        } 
         if (fieldName === 'vehLoan') {
            this.vehLoan = event.target.checked;
        }
        if (fieldName === 'vehStatus') {
            this.vehStatus = value;
        }
        if (fieldName === 'vehVariant') {
            this.vehVariant = value;
        }
        
    }

    handleFieldChange2(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
       
        if (fieldName === 'vehBody') {
            this.vehBody = value;
        } 
        if (fieldName === 'vehCap') {
            this.vehCap = value;
        } 
        if (fieldName === 'AccTime') {
            this.AccTime = value;
        } 
        if (fieldName === 'kms') {
            this.kms = value;
        }
       if (fieldName === 'batterytype') {
            this.batterytype = value;
        }
        if (fieldName === 'fueltank') {
            this.fueltank = value;
        }
        if (fieldName === 'engineCap') {
            this.engineCap = value;
        }
       if (fieldName === 'engNum') {
            this.engNum = value;
        }
        if (fieldName === 'chsNum') {
            this.chsNum = value;
        }
         
        
        
    }


    handleFieldChange3(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
       
        if (fieldName === 'ownerName') {
            this.ownerName = value;
        } 
        if (fieldName === 'ownerPhone') {
            this.ownerPhone = value;
        } 
        if (fieldName === 'ownerEmail') {
            this.ownerEmail = value;
        } 
        if (fieldName === 'preOwner') {
            this.preOwner = value;
        } 
         if (fieldName === 'sellPrice') {
            this.sellPrice = value;
        } 
         if (fieldName === 'vehSingleOwner') {
            this.vehSingleOwner = event.target.checked;
        } 
         if (fieldName === 'vehDoctor') {
            this.vehDoctor = event.target.checked;
        } 
         if (fieldName === 'vehInsurance') {
            this.vehInsurance = event.target.checked;
        } 
         if (fieldName === 'vehRTA') {
            this.vehRTA = event.target.checked;
        } 
         if (fieldName === 'targetPrice') {
            this.targetPrice = value;
        }
        if (fieldName === 'owntype') {
            this.owntype = value;
        }
        if (fieldName === 'owneraddress') {
            this.owneraddress = value;
        }
        if (fieldName === 'ownerAdhar') {
            this.ownerAdhar = value;
        }
    }

    handleFieldChange4(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
        if (fieldName === 'vehmain') {
            this.vehmain = value;
        } 
        if (fieldName === 'vehImg1') {
            this.vehImg1 = value;
        } 
        if (fieldName === 'vehImg2') {
            this.vehImg2 = value;
        } 
        if (fieldName === 'vehImg3') {
            this.vehImg3 = value;
        }
        if (fieldName === 'vehImg4') {
            this.vehImg4 = value;
        }
      /* 
        if (fieldName === 'readingDate') {
            this.readingDate = value;
        } 
        if (fieldName === 'lastReading') {
            this.lastReading = value;
        } 
        if (fieldName === 'condntype') {
            this.condntype = value;
        } 
        if (fieldName === 'odoStatus') {
            this.odoStatus = value;
        }
        */
    }
/*
    handleFieldChange5(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
       
        if (fieldName === 'ManfDate') {
            this.ManfDate = value;
        } 
        if (fieldName === 'stockCode') {
            this.stockCode = value;
        } 
        if (fieldName === 'batchNo') {
            this.batchNo = value;
        } 
        if (fieldName === 'plantName') {
            this.plantName = value;
        }
    }
*/

    handleFieldChange6(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
       
        if (fieldName === 'serviceActive') {
            this.serviceActive = value;
        } 
        if (fieldName === 'oemService') {
            this.oemService = value;
        } 
        if (fieldName === 'serviceLD') {
            this.serviceLD = value;
        } 
        if (fieldName === 'serviceND') {
            this.serviceND = value;
        }
    }

    handleFieldChange7(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
       
        if (fieldName === 'subCount') {
            this.subCount = value;
        } 
        if (fieldName === 'warrantyCount') {
            this.warrantyCount = value;
        } 
        if (fieldName === 'warStrartDate') {
            this.warStrartDate = value;
        } 
        if (fieldName === 'warEndDate') {
            this.warEndDate = value;
        }
    }

    handleOnStepClick(event) {
        this.currentStep = event.target.value;
    }
    get isStepOne() {
        return this.currentStep === "1";
    }
 
    get isStepTwo() {
        return this.currentStep === "2";
    }
 
    get isStepThree() {
        return this.currentStep === "3";
    }

    get isStepFour() {
        return this.currentStep === "4";
    }

    get isStepFive() {
        return this.currentStep === "5";
    }

    get isStepSix() {
        return this.currentStep === "6";
    }
    get isStepSeven() {
        return this.currentStep === "7";
    }
 
 
 
    get isEnableNext() {
        return this.currentStep != "7";
    }
 
    get isEnablePrev() {
        return this.currentStep != "1";
    }
 
    get isEnableFinish() {
        return this.currentStep === "7";
    }

    get acceptedFormats() {
        return ['.pdf', '.png','.jpg','.jpeg'];
    }
 
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: brand})
    typePicklistValues({error, data}) {
        if(data) 
            this.options1 = data.values;
        
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: model})
    typePicklistValues1({error, data}) {
        if(data) 
           // this.options2 = data.values;
            if (data) this.slaFieldData = data;
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: bodytype})
    typePicklistValues2({error, data}) {
        if(data) {
            this.options3 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: color})
    typePicklistValues3({error, data}) {
        if(data) {
            this.options4 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Vehiclecapacity})
    typePicklistValues4({error, data}) {
        if(data) {
            this.options5 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: transmissionType})
    typePicklistValues5({error, data}) {
        if(data) {
            this.options6 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: vehicleAge})
    typePicklistValues6({error, data}) {
        if(data) {
            this.options7 = data.values;
        }
    }


    
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Door_Style})
    typePicklistValues7({error, data}) {
        if(data) {
            this.options8 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Fuel_Type})
    typePicklistValues8({error, data}) {
        if(data) {
            this.options9 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: vehicleAge})
    typePicklistValues9({error, data}) {
        if(data) {
            this.options10 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Battery_Type})
    typePicklistValues10({error, data}) {
        if(data) {
            this.options11 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Engine_Name})
    typePicklistValues11({error, data}) {
        if(data) {
            this.options12 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Make_Year})
    typePicklistValues12({error, data}) {
        if(data) {
            this.options13 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: AM_No_of_Pre_Owner})
    typePicklistValues13({error, data}) {
        if(data) {
            this.options14 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Vehicle_Owner_Type})
    typePicklistValues14({error, data}) {
        if(data) {
            this.options15 = data.values;
        }
    }
    /*
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: AM_Condition_Type})
    typePicklistValues14({error, data}) {
        if(data) {
            this.options15 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: AM_Odometer_Status})
    typePicklistValues15({error, data}) {
        if(data) {
            this.options16 = data.values;
        }
    }*/
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: AM_OEM_Service})
    typePicklistValues16({error, data}) {
        if(data) {
            this.options17 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: fundedFrom})
    typePicklistValues17({error, data}) {
        if(data) {
            this.options18 = data.values;
        }
    }
    
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Vehicle_Status})
    typePicklistValues19({error, data}) {
        if(data) {
            this.options20 = data.values;
        }
    }
    

    
    handleNext(){
        if(this.currentStep === "1"){
            this.currentStep = "2";
        }
        else if(this.currentStep === "2"){
            this.currentStep = "3";
        }
        else if(this.currentStep === "3"){
            this.currentStep = "4";
        }
        else if(this.currentStep === "4"){
            this.currentStep = "5";
        }
        else if(this.currentStep === "5"){
            this.currentStep = "6";
        }
        else if(this.currentStep === "6"){
            this.currentStep = "7";
        }
        
    }
 
    handlePrev(){
       
        if(this.currentStep == "7"){
            this.currentStep = "6";
        }
        else
        if(this.currentStep == "6"){
            this.currentStep = "5";
        }
        else
        if(this.currentStep == "5"){
            this.currentStep = "4";
        }
        else if(this.currentStep == "4"){
            this.currentStep = "3";
        }
        else if(this.currentStep == "3"){
            this.currentStep = "2";
        }
        else if(this.currentStep == "2"){
            this.currentStep = "1";
        }
    }
 

handleSave() {
    
    insertVehicleInformation({ 
        vehName:this.vehIdNum,
        vehRegNum: this.vehResNum,
        vehBrand:this.vehBrand,
        vehModel:this.vehModel,
        vehFuel:this.fueltype,
        vehColor:this.vehColor,
        vehTrans:this.vehTranType,
        vehAge:this.vehAge,
        vehMake:this.makeYear,
        vehRepair:this.vehRepairReq,
        vehActive:this.vehActive,
        vehLoan:this.vehLoan,
        vehFunded:this.fundfrom,
        vehPurDate:this.purDate,
        vehProfit:this.profit,
        vehPurAmt:this.purAmt,
        vehStatus:this.vehStatus,
        vehVariant:this.vehVariant
    })
    .then(result => {
        alert(result);
        this.recordId = result;

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Successfully created vehicle Information',
                variant: 'success'
            })
        );
    })
    .catch(error => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Error in creating vehicle  Information: ' + error.body.message,
                variant: 'error'
            })
        );
    });
    
}

handleUpdate2() {
    alert('da');
    alert(this.recordId );
    
    updateVehicleDetails({
        productId: this.recordId,
        vehBody: this.vehBody,
        vehCapa: this.vehCap,
        vehAcc: this.AccTime,
        vehKms: this.kms,
        vehFuelTank: this.fueltank,
        vehBattType: this.batterytype,
        vehEngCapacity: this.engineCap,
        engNum: this.engNum,
        chsNum:this.chsNum
       // vehSpeed: this.topspeed,
        // vehGrossWeight: this.grossweight,
       // vehWidth: this.width,
      //  vehHeight: this.vehHeight,
      //  vehLength: this.vehLength,
      //  vehAccident: this.VehAccident,
      //  vehTool: this.vehTools,
     //   vehPollution: this.vehPollution,
     //   vehACavailable: this.VehAcavailable,
     //   vehDoor: this.doorCount,
      //  vehDoorStyle: this.doorStyle,
      //  vehBattCap: this.batteryCap,
      //  vehEngName: this.engineName,
    })
    .then(() => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Successfully updated vehicle  Details',
                variant: 'success'
            })
        );
    })
    .catch(error => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Error in updating vehicle  Details: ' + error.body.message,
                variant: 'error'
            })
        );
    });
}

    
    handleUpdate3() {
        alert('da3');
    alert(this.recordId );
        
        updateOwnerDetails({ 
            productId: this.recordId,
            ownerName: this.ownerName, 
            ownerPhone: this.ownerPhone,
            ownerEmail: this.ownerEmail,
            preOwner: this.preOwner,
            sellPrice: this.sellPrice,
            vehSingleOwner: this.vehSingleOwner,
            vehDoctor: this.vehDoctor,
            vehInsurance: this.vehInsurance,
            vehRTA: this.vehRTA,
            vehOwnType:this.owntype,
            targetPrice: this.targetPrice,
            owneraddress : this.owneraddress,
            ownerAdhar : this.ownerAdhar
        })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully updated vehicle detail',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error in  updating vehicle detail entry: ' + error.body.message,
                    variant: 'error'
                })
            );
        });
    }

    handleUpdate4() {
        alert('da4');
    alert(this.recordId );
    uploadVehicleImages({
        productId: this.recordId,
        vehmain:this.vehmain,
        vehImg1: this.vehImg1,
        vehImg2:this.vehImg2,
        vehImg3:this.vehImg3,
        vehImg4: this.vehImg4
    })
    .then(() => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Successfully upload vehicle images',
                variant: 'success'
            })
        );
    })
    .catch(error => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Error in  uploading vehicle Images: ' + error.body.message,
                variant: 'error'
            })
        );
    });
        /*
        updateOdometerDetails({ 
            productId: this.recordId,
            odoDate:this.readingDate, 
	         odolastRead:this.lastReading, 	
	         odoCondn:this.condntype, 
	         odoStatus:this.odoStatus
        })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully updated odometer details',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error in  updating vehicle odometer details: ' + error.body.message,
                    variant: 'error'
                })
            );
        });
        */
    }

/*
    handleUpdate5() {
        alert('da5');
    alert(this.recordId );
        
        updateManufactureDetails({ 
            productId: this.recordId,
            manDate:this.ManfDate, 
            manStock:this.stockCode, 
            manBatch:this.batchNo, 
            manPlant:this.plantName
        })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully updated Manufacturing details',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error in  updating Manufacturing details: ' + error.body.message,
                    variant: 'error'
                })
            );
        });
    }
*/
    handleUpdate6() {
        alert('da6');
    alert(this.recordId );
        
        updateServicingDetails({ 
            productId: this.recordId,
            serActive:this.serviceActive, 
            serOEM:this.oemService, 
            serLastDate:this.serviceLD, 
            serNextDate:this.serviceND
        })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully updated Servicing details',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error in  updating Servicing details: ' + error.body.message,
                    variant: 'error'
                })
            );
        });
    }

    handleUpdate7() {
        alert('d7');
    alert(this.recordId );
        
        updateSubWarranty({ 
            productId: this.recordId,
            subCount:this.subCount, 
            subWarranty:this.warrantyCount, 
            subStartDate:this.warStrartDate, 
            subEndDate:this.warEndDate
   
        })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully updated subscription and warranty details',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error in  updating subscription and warranty details: ' + error.body.message,
                    variant: 'error'
                })
            );
        });
    }

  
    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = '';
        for(let i = 0; i < uploadedFiles.length; i++) {
            uploadedFileNames += uploadedFiles[i].name + ', ';
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                variant: 'success',
            }),
        );
    }

}