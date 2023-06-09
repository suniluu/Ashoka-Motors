import { LightningElement, wire, api, track } from 'lwc';
import getallvehciles1 from '@salesforce/apex/getsearchfilterdatacontroller.getvehicledetails1';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import { loadStyle } from "lightning/platformResourceLoader";
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import vechile from '@salesforce/schema/Product2';
import year from '@salesforce/schema/Product2.AM_Make_Year__c';
import kmsdriven from '@salesforce/schema/Product2.KMS_Travelled__c';
import fueltype from '@salesforce/schema/Product2.AM_Fuel_Type__c';
import bodytype from '@salesforce/schema/Product2.AM_Body_Type__c';
import transmission from '@salesforce/schema/Product2.AM_Transmission_Type__c';
export default class Testdependentpicklist extends LightningElement {
  @api selectedIds = new Set();
  @api selectedcars;
  @api records = [];
  @api recordId;
  @api errors;
  @api recordId1;
  @track colorss;
  @track searchmakeyear = '';
  @track searchkmsdriven = '';
  @track searchfueltype = '';
  @track searchbodytype = '';
  @track searchtransmissiontype = '';
  @track searchbrand = '';
  @track searchcolor = '';
  @api isActive = false;

  
  handleClick() 
  {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.handleToggleOn();
    } else {
      this.handleToggleOff();
    }
  }

  handleToggleOn() 
  {
    alert('on')
    this.records=null;
  }

  handleToggleOff() 
  {
    this.handlesearch();
  }



  
 
  @track options1 = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo1;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo1.data.defaultRecordTypeId', fieldApiName: year })
  typePicklistValues1({ error, data }) {
    if (data) {
      this.options1 = data.values;
    }

  }
  @track options2 = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo2;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo2.data.defaultRecordTypeId', fieldApiName: kmsdriven })
  typePicklistValues2({ error, data }) {
    if (data) {
      this.options2 = data.values;
    }

  }
  @track options3 = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo3;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo3.data.defaultRecordTypeId', fieldApiName: fueltype })
  typePicklistValues3({ error, data }) {
    if (data) {
      this.options3 = data.values;
    }

  }
  @track options4 = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo4;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo4.data.defaultRecordTypeId', fieldApiName: bodytype })
  typePicklistValues4({ error, data }) {
    if (data) {
      this.options4 = data.values;
    }

  }
  @track options5 = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo5;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo5.data.defaultRecordTypeId', fieldApiName: transmission })
  typePicklistValues5({ error, data }) {
    if (data) {
      this.options5 = data.values;
    }

  }
  handleKeymakeyear(event) {

    this.searchmakeyear = event.target.value;
    
  }
  handleFuelBlur(event) {
  const previousValue = this.selectedFuelType;
  const currentValue = event.target.value;
  
  if (previousValue === currentValue) 
  {
    event.target.value = '';
    alert(previousValue);
  } 
  else 
  {
    this.selectedFuelType = currentValue;
  }
}
  handlekmsdrive(event) {

    this.searchkmsdriven = event.target.value;



  }
  handlefueltype(event) {

    this.searchfueltype = event.target.value;



  }
  handlebodytype(event) {

    this.searchbodytype = event.target.value;



  }
  handletransmissiontype(event) {

    this.searchtransmissiontype = event.target.value;

  }


  handlebrand(event) {
    this.searchbrand = event.target.value;



  }
  /*kms: this.searchkmsdriven,*/
  handlesearch() {

    getallvehciles1({
      makeyear: this.searchmakeyear, fueltype: this.searchfueltype, bodytype: this.searchbodytype, transmission: this.searchtransmissiontype,
      brand: this.searchbrand, color: this.searchcolor
    })
    .then(result => {
      this.records = result;
    })
     
      .catch(error => {
        this.errors = error;
      });
  }
  selectedCar(event) {
    let img = event.target;
    let value = img.getAttribute('alt');

    this.searchbrand = value;
  }
  selectedColor(event) {

    this.colorss = event.target.style;
    this.searchcolor = this.colorss.background;
    alert(this.searchcolor);

  }
  handleAccountClick(event) {
    this.recordId = event.target.value;
   
    if (this.selectedIds.has(this.recordId)) {
      this.selectedIds.delete(this.recordId);
      for (const value of this.selectedIds) {
        alert(value);
      }
    }
    else {
      this.selectedIds.add(this.recordId);
      for (const value of this.selectedIds) {
        alert(value);
      }
    }
  }
  toggleSelected() {
    this.isSelected = !this.isSelected;
  }

  showButton(event) {
    const button = event.currentTarget.querySelector('.slds-button');
    button.classList.remove('slds-hidden');
  }
  hideButton(event) {
    const button = event.currentTarget.querySelector('.slds-button');
    button.classList.add('slds-hidden');
  }
  handleButtonClick(event) {
    this.recordId1 = event.target.value;
    alert(this.recordId1);
  }
  connectedCallback() {
    loadStyle(this, noHeader);
    this.handleToggleOff();

    
  }
  seletedcars(event) {
    this.selectedcars = event.target.value;
    for (const value of this.selectedcars) {
      alert(value);
    }
  }
}