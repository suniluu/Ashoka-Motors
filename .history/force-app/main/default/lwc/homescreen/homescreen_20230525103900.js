import { LightningElement ,track} from 'lwc';

export default class Homescreen extends LightningElement {

    @track vecilemangementValue = true;    
    @track CustomerManagementValue = false;
    @track DealerManagementValue = false;
    @track CarOwnerDetailValue = false;
    @track SalesManagementValue = false;
    @track PurchaseManagementValue = false;
    @track InvestmentsProfitsValue = false;
    @track ReportsValue = false;
    

   

    changeHandleAction(event) {
        const selected = event.detail.name;        
 
        this.currentContent = selected;
 
        if (selected == 'vecilemangement')
        {
            this.vecilemangementValue = true;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = false;
            

        }
 
        if (selected == 'CustomerManagement')
        {
            this.vecilemangementValue = true;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = false;
        }
 
        if (selected == 'DealerManagement')
        {
            this.vecilemangementValue = true;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = false;
        }

        if (selected == 'CarOwnerDetail')
        {
            this.vecilemangementValue = true;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = false;
        }

        if (selected == 'SalesManagement')
        {
            this.vecilemangementValue = true;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = false;
        }

        if (selected == 'PurchaseManagement')
        {
            this.vecilemangementValue = true;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = false;
        }


        if (selected == 'InvestmentsProfits')
        {
            this.vecilemangementValue = true;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = false;
        }

        if (selected == 'visualforce')
        {
            this.vecilemangementValue = true;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = false;
        }

      
    }

}