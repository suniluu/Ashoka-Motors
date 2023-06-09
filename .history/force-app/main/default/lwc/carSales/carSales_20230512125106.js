import { LightningElement, wire,track,api} from 'lwc';
import getCarSalesListWrapper from '@salesforce/apex/CarSalesclass.getCarSalesListWrapper';
import CASE_STATUS from '@salesforce/schema/AM_Vehicle_Sale__c.Am_Brand__c';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

import { NavigationMixin } from 'lightning/navigation';

import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/Colors1'

const columns = [
  { label: 'Sale Name', fieldName: 'name',sortable: "true",cellAttributes: {
      class: 'slds-theme_shade slds-text-color_error',
      style:"Font-weight:bold"
      
  }},
  { label: 'Vehicle Registration No', fieldName: 'vehicleRegistrationNumber',sortable: "true" },
  
  { label: 'Model', fieldName: 'amModel' ,sortable: "true"},
  { label: 'Purchase Date', fieldName: 'vehiclePurchaseDate' ,sortable: "true"},
  { label: 'Purchase Amount', fieldName: 'vehiclePurchaseAmount',sortable: "true" },
  { label: 'Profit Sold', fieldName: 'priceSold' ,sortable: "true"},
  { label: 'Profit Gained', fieldName: 'profitGained' ,sortable: "true"},
  { label: 'Sold Date', fieldName: 'soldDate' ,sortable: "true"},
  { label: 'Brand', fieldName: 'brand' ,sortable: "true",
  actions: [{ label: 'All', checked: true, name: 'all' },
  { label: 'Tata', checked: false, name: 'Tata' },
  { label: 'Hyundai', checked: false, name: 'Hyundai' },
  { label: 'Maruti Suzuki', checked: false, name: 'Maruti Suzuki' }]}
  
];

export default class CarSales extends NavigationMixin(LightningElement) 
{
  columns = columns;
  isCssLoaded = false
  /*@wire(getPicklistValues, {  fieldApiName: CASE_STATUS })
  cases_status({ error, data }) {
      if (data) {
          data.values.forEach(pl => {
              this.latestActions.push({ label: pl.label, checked: false, name: pl.value });
          });
          this.columns.forEach(col => {
              if (col.label === 'Status') {
                  col.actions = [...col.actions, ...this.latestActions];
              }
          });
          this.showTable = this.latestActions.length > 0;
      } else if (error) {
          console.error(error);
      }
  }*/
  @wire(getCarSalesListWrapper,{searchTerm: '$searchTerm'}) 
  
  
  
  Sales 
  @track sortBy;
  @track sortDirection;
  @track searchTerm ='';

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
    let date = new Date(event.target.value);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    this.searchTerm = year + '-' + month + '-' + day;

    // Update the SOQL query to filter records by the Am_Sold_Date__c field
    this.Sales = getCarSalesListWrapper({ field: this.sortBy, sortOrder: this.sortDirection, searchTerm: this.searchTerm });

  }

  handleHeaderAction(event) {
    // gives the selection header action name
    const actionName = event.detail.action.name;
    
    // gives selected column definition
    const colDef = event.detail.columnDefinition;
    
    // assigning colmuns to new variable
    let cols = this.columns;

    if (actionName !== undefined && actionName !== 'all') {
        // filtering cases on selected actionname
        this.Sales = this.Sales.data.filter(_case => _case[colDef.label] === actionName);
    } else if (actionName === 'all') {
        // returning all cases
        this.Sales= this.Sales.data;
    }

    /* Following line is responsible for finding which header action selected and return corresponding actions then we will mark selcted as checked/true and remaining will be marked as unchecked/marked */
    
        cols.find(col => col.label === colDef.label).actions.forEach(action => action.checked = action.name === actionName);
        this.columns = [...cols];
    }
    

doSorting(event) 
{
  this.sortBy = event.detail.fieldName;
  this.sortDirection = event.detail.sortDirection;
  this.sortData(this.sortBy, this.sortDirection);
}
sortData(fieldname, direction) 
{
  let parseData = JSON.parse(JSON.stringify(this.Sales.data));
  let keyValue = (a) => {
      return a[fieldname];
  };
  let isReverse = direction === 'asc' ? 1: -1;
  // sorting data
  parseData.sort((x, y) => {
      x = keyValue(x) ? keyValue(x) : ''; // handling null values
      y = keyValue(y) ? keyValue(y) : '';
      // sorting values based on direction
      return isReverse * ((x > y) - (y > x));
  });
  this.Sales.data = parseData;
}    
  renderedCallback()
  { 
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