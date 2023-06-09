import { LightningElement } from 'lwc';

export default class CustomerManagementScreen extends LightningElement 
{
    CallSellers(event)
    {
        let compDefinition = {
            componentDef: "c:CarSellerOwnerCmp",
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