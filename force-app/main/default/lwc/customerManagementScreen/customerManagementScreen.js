import { LightningElement ,track,wire} from 'lwc';
import GetCustomerSaleViaPhoneNum from '@salesforce/apex/AMVehclRepairHandlerClass.GetCustomerSaleViaPhoneNum';

import { NavigationMixin } from 'lightning/navigation';

export default class CustomerManagementScreen extends NavigationMixin(LightningElement) 
{
    @track selectCustomer;
    @track selectedCar;
    @track BalanceAmount;
    @track AmountPaid;
    @track Due=0;
    @track Tax=0;
    @track DiscPerc=0;
    @track DiscAmount=0;
    
    @track isModalOpen=false;

    Addcustomer(event)
    {
        let compDefinition = {
            componentDef: "c:customerregandpref",
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
    

    editcustomer()
    {
        let compDefinition = {
            componentDef: "c:customereditcomp",
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
    

    deletecustomer()
    {
        let compDefinition = {
            componentDef: "c:customerdeletecomp",
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

    CallCustomerPrefernces()
    {
        let compDefinition = {
            componentDef: "c:customerDetailsComp",
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
    

    handleGivenPhoneNum(event)
    {
        this.PhoneNum=event.target.value;
           
        GetCustomerSaleViaPhoneNum({cphone:this.PhoneNum})
        .then((result) => 
        {
             if (result.length > 0) 
            {
                this.selectedCar = result[0].AM_Car_Id__c;
                this.selectCustomer = result[0].AM_Customer__c;
                this.AmountPaid=result[0].AM_Amount_Paid__c;
                this.Due=result[0].AM_Balance_Amount__c;
                this.DiscAmount=result[0].AM_Vehicle_Discount__c;
                this.DiscPerc=result[0].AM_Vehicle_Discount_Percent__c;
                this.Tax=result[0].AM_Vehicle_Tax__c;
            }
        })
      
    }
    handlePhonenumberSearch(event)
    {
        this.isModalOpen=false;

        let compDefinition = 
        {
            componentDef: "c:PaymentScreen",
            attributes: {
                selectedCar:this.selectedCar,
                selectCustomer:this.selectCustomer,
                AmountPaid: this.AmountPaid,
                Due:this.Due,
                DiscAmount:this.DiscAmount,
                DiscPerc:this.DiscPerc,
                Tax:this.Tax
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

    gotoBilling(event)
    {
        this.isModalOpen=true;
    }
    closedModal()
    {
        this.isModalOpen=false;
    }
    GetQuote()
    {
        
    }
}