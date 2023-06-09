import { LightningElement, wire,track,api} from 'lwc';
import getCarSalesListWrapper from '@salesforce/apex/CarSalesclass.getCarSalesListWrapper';

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

  { label: 'Brand', fieldName: 'brand' ,sortable: "true"},
  
];

export default class CarSales extends NavigationMixin(LightningElement) 
{
  columns = columns;
  isCssLoaded = false

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