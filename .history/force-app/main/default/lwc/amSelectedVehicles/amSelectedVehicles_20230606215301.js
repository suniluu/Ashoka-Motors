import { LightningElement,wire, api, track  } from 'lwc';
import insertSelectedCars from '@salesforce/apex/displaycars1.insertSelectedCars';
import displaycarselected from '@salesforce/apex/displaycars1.displaycarselected';

import uploadAttachment from '@salesforce/apex/VehclRepairHandlerClass.uploadAddress';

import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import styles from '@salesforce/resourceUrl/style';
import { NavigationMixin } from 'lightning/navigation';

import LightningModal from 'lightning/modal';


export default class AmSelectedVehicles extends NavigationMixin(LightningElement)  
{
    @api customerID1; 
    @api selectedCars1; 
    @api records;
    @track recordId;
    @track selectedCar;
    @track isModalOpen=false;
    @track selectedId;
    @track selectedId1;
    @track Proof=false;
    @track recordform=true;
    @track carId;
    getquoteforall()
    {
        alert(this.selectedCars1);
       
        let compDefinition = {
            componentDef: "c:discountcomp",
            attributes: {
                selectCustomer :this.customerID1 ,
                selectedCars2:this.selectedCars1
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
    handleBilling(event) 
    {
      this.isModalOpen = true;
      let selectedButton = event.target;
      this.selectedId = selectedButton.dataset.id;

      let compDefinition = {
        componentDef: "c:PaymentScreen",
        attributes: {
            selectCustomer :this.customerID1 ,
            selectedCar :this.selectedId
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

    handleQuote(event)
  {
    this.selectedId1=event.target.dataset.id;
    selectedCars1=[];
   
  }

    connectedCallback()
    {
        loadStyle(this, noHeader);
       // loadStyle(this,styles);
       
        displaycarselected({ 
            selectedCarIds :this.selectedCars1
        })
        .then(result => 
        {
          this.data=result;
          this.records= this.data;
        
        })
         .catch((error) => {
          console.error(error);
        });
    }
    handleRemove(event) 
    {
        const carIdToRemove = event.target.value;
        
        const updatedSelectedCars = new Set([...this.selectedCars1].filter(carId => carId !== carIdToRemove));
        
        this.selectedCars1 = updatedSelectedCars;

        const updatedRecords = this.records.filter(car => car.Id !== carIdToRemove);
        this.records = updatedRecords;
        
    }
      

    handleSave() 
    {
       
        const myList = Array.from(this.selectedCars1);
        insertSelectedCars({ 
            selectedCarIds :myList,
            custmID : this.customerID1
        })
        .then(() => {
          this.dispatchEvent(
              new ShowToastEvent({
                  title: 'Success',
                  message: 'Successfully save the record in Selected Cars',
                  variant: 'success'
              })
          );
      })
      .catch(error => {
          this.dispatchEvent(
              new ShowToastEvent({
                  title: 'Error',
                  message: 'Error in saving the record in Selected Cars: ' + error.body.message,
                  variant: 'error'
              })
          );
      });  
           
    }

  handleBack(event)
  {
    let compDefinition = {
        componentDef: "c:disaplaycars",
        attributes: {
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
  
}