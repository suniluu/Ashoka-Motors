import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CustomerManagementScreen extends NavigationMixin(LightningElement) 
{
    Addcustomer(event)
    {
        let compDefinition = {
            componentDef: "c:customerregandpref",
            attributes: {
                CustomerManagementValue:true
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

}