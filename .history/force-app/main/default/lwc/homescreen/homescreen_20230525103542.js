import { LightningElement ,track} from 'lwc';

export default class Homescreen extends LightningElement {

    @track vecilemangementValue = true;    
    @track CustomerManagementValue = false;
    @track DealerManagementValue = false;
    @track CarOwnerDetailValue = false;
    @track SalesManagementValue = false;
    @track PurchaseManagementValue = false;
    @track DealerManagementValue = false;
    @track DealerManagementValue = false;
    @track DealerManagementValue = false;

   

    changeHandleAction(event) {
        const selected = event.detail.name;        
 
        this.currentContent = selected;
 
        if (selected == 'vecilemangement')
        {
            this.vecilemangement = true;
            this.CustomerManagement = false;
            this.DealerManagement = false;
            this.CarOwnerDetail = false;
            this.DealerManagement = false;
            this.DealerManagement = false;
            this.DealerManagement = false;
            this.DealerManagement = false;
            this.DealerManagement = false;

        }
 
        if (selected == 'integration')
        {
            this.tutorialValue = false;
            this.integrationValue = true;
            this.visualforceValue = false;
        }
 
        if (selected == 'visualforce')
        {
            this.tutorialValue = false;
            this.integrationValue = false;
            this.visualforceValue = true;
        }

      
    }

}