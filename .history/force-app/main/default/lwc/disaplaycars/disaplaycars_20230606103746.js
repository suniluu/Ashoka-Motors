import { LightningElement, wire, api, track } from 'lwc';
import getallvehciles1 from '@salesforce/apex/getsearchfilterdatacontroller.getvehicledetails1';
import getallpreferedvehcls from '@salesforce/apex/getsearchfilterdatacontroller.getpreferedvehciles';

import noHeader from '@salesforce/resourceUrl/NoHeader';

import renault from '@salesforce/resourceUrl/RenaultN';
import audi from '@salesforce/resourceUrl/AudiNew';
import honda from '@salesforce/resourceUrl/HondaNew';
import toyota from '@salesforce/resourceUrl/ToyotaNew';
import mahindra from '@salesforce/resourceUrl/MahindraNew';
import bmw from '@salesforce/resourceUrl/BMWNew';
import marutisuzuki from '@salesforce/resourceUrl/MarutiSuzuki';
import tata from '@salesforce/resourceUrl/TataN';
import kia from '@salesforce/resourceUrl/KIANew';
import volswagen from '@salesforce/resourceUrl/VolkswagenNew';
import ford from '@salesforce/resourceUrl/FordNew';
import hyundai from '@salesforce/resourceUrl/HyundaiNew';

import { loadStyle } from "lightning/platformResourceLoader";
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import vechile from '@salesforce/schema/Product2';
import year from '@salesforce/schema/Product2.AM_Make_Year__c';
import kmsdriven from '@salesforce/schema/Product2.KMS_Travelled__c';
import fueltype from '@salesforce/schema/Product2.AM_Fuel_Type__c';
import bodytype from '@salesforce/schema/Product2.AM_Body_Type__c';
import transmission from '@salesforce/schema/Product2.AM_Transmission_Type__c';
import { NavigationMixin } from 'lightning/navigation';

export default class Testdependentpicklist extends NavigationMixin(LightningElement) {
  @api customerid;
  Renault=renault;
  Audi=audi;
  HONDA=honda;
  Toyota=toyota;
  Mahindra=mahindra;
  BMW=bmw;
  MarutiSuzuki=marutisuzuki;
  Tata=tata;
  Kia=kia;
  Volkswagen=volswagen;
  Ford=ford;
  Hyundai=hyundai;

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
  @track kmtravveled= '';
  @track isActive = false;
  @track vehid;


  
  @track yearoptions = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo1;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo1.data.defaultRecordTypeId', fieldApiName: year })
  typePicklistValues1({ error, data }) {
    if (data) {
      this.yearoptions = data.values;
    }

  }
  
  @track fueloptions = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo3;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo3.data.defaultRecordTypeId', fieldApiName: fueltype })
  typePicklistValues3({ error, data }) {
    if (data) {
      this.fueloptions = data.values;
    }

  }
  @track bodytypeoptins = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo4;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo4.data.defaultRecordTypeId', fieldApiName: bodytype })
  typePicklistValues4({ error, data }) {
    if (data) {
      this.bodytypeoptins = data.values;
    }

  }
  @track tranmissionoptions = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo5;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo5.data.defaultRecordTypeId', fieldApiName: transmission })
  typePicklistValues5({ error, data }) {
    if (data) {
      this.tranmissionoptions = data.values;
    }

  }
  handleKeymakeyear(event)
   {
    this.searchmakeyear = event.target.value;
  }
  handlekmsdrive(event) 
  {
    this.searchkmsdriven = event.target.value;
  }
  handlefueltype(event) 
  {
    this.searchfueltype = event.target.value;
  }
  handlebodytype(event) 
  {
    this.searchbodytype = event.target.value;
  }
  handletransmissiontype(event)
   {

    this.searchtransmissiontype = event.target.value;

  }


  handlebrand(event) 
  {
    this.searchbrand = event.target.value;
  }
  handlepreferences() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.handleprefrencesOn();
    } else {
      this.handleprefrencesOff();
    }
  }
  clearfilters()
  {
    this.searchmakeyear = '';
    
    this.searchfueltype = '';
    this.searchbodytype = '';
    this.searchtransmissiontype = '';
    this.searchbrand = '';
    this.searchcolor = '';
    this.kmtravveled = '';
    this.isActive = false;
    getallvehciles1({
      makeyear: this.searchmakeyear, fueltype: this.searchfueltype, bodytype: this.searchbodytype, transmission: this.searchtransmissiontype,
      brand: this.searchbrand, color: this.searchcolor, kms :this.kmtravveled
    })
      .then(result => {
        this.records = result;
      })

      .catch(error => {
        this.errors = error;
      });

  }
  handleprefrencesOn() {

    getallpreferedvehcls({ custid: this.customerid })
      .then(result => {
        this.records = result;

      })

      .catch(error => {
        this.errors = error;
      });
  }

  handleprefrencesOff() {
    this.handlesearch();
  }
  handlesearch() 
  {
    getallvehciles1({
      makeyear: this.searchmakeyear, fueltype: this.searchfueltype, bodytype: this.searchbodytype, transmission: this.searchtransmissiontype,
      brand: this.searchbrand, color: this.searchcolor, kms :this.kmtravveled
    })
      .then(result => {
        this.records = result;
      })

      .catch(error => {
        this.errors = error;
      });
  }
  get vehcilekms()
    {
      return [
          {label:'10000-20000',value:'10000-20000'},
          {label:'20000-30000',value:'20000-30000'},
          {label:'30000-40000',value:'30000-40000'},
          {label:'40000-50000',value:'40000-50000'},
          {label:'50000-60000',value:'50000-60000'},
          {label:'60000-70000',value:'60000-70000'},
          {label:'70000-80000',value:'70000-80000'},
          {label:'80000-90000',value:'80000-90000'},
          {label:'90000-100000',value:'90000-100000'},
             ] 
  };
  handlesearchkmstraveld(event)
    {
      this.kmtravveled= event.target.value;
      
    }

  selectedCar(event) 
  {
    let img = event.target;
    let value = img.getAttribute('alt');
   
    this.searchbrand = value;
  }
 
  
  selectedColor(event){
    alert('k');
      this.colorss=event.target.style;
      this.searchcolor = this.colorss.background;
    alert(this.searchcolor);

  }
  selectecar(event) 
  {
    this.recordId = event.target.value;
    if (this.selectedIds.has(this.recordId)) {
      this.selectedIds.delete(this.recordId);
      
    }
    else {
      this.selectedIds.add(this.recordId);
      
    }
  }
 
  
  handlecorousalnav(event) 
  {
    this.recordId1 = event.target.value; 
    alert(this.recordId1);
   
    let compDefinition = {
      componentDef: "c:Carouselcars",
      attributes: 
	  {
        vehid: this.recordId1
      }
    };
 
    let encodedCompDef = btoa(JSON.stringify(compDefinition));
    this[NavigationMixin.Navigate]({
      type: "standard__webPage",
      attributes: {
        url: "/one/one.app#" + encodedCompDef
      }
    });
  }

  selectedcarNavigation() {
    let compDefinition = {
      componentDef: "c:amSelectedVehicles",
      attributes: {
        selectedCars1: Array.from(this.selectedIds),
        customerID1: this.customerid
      }
    };
    let encodedCompDef = btoa(JSON.stringify(compDefinition));
    this[NavigationMixin.Navigate]({
      type: "standard__webPage",
      attributes: {
        url: "/one/one.app#" + encodedCompDef
      }
    });
  }
  connectedCallback()
  {
    loadStyle(this, noHeader);
    this.handleprefrencesOff();
  }

}