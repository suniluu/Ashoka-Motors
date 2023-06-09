import { LightningElement ,track,api} from 'lwc';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import { loadStyle } from "lightning/platformResourceLoader";

export default class Homescreen extends LightningElement {

    @api vecilemangementValue = true;    
    @api CustomerManagementValue = false;
    @api DealerManagementValue = false;
    @api CarOwnerDetailValue = false;
    @api SalesManagementValue = false;
    @api PurchaseManagementValue = false;
    @api InvestmentsProfitsValue = false;
    @api ReportsValue = false;
    

   

    changeHandleAction(event) {
        const selected = event.detail.name;        
 
        this.currentContent = selected;
 
        if (selected == 'vehiclemangement')
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
            this.vecilemangementValue = false;
            this.CustomerManagementValue = true;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = false;
        }
 
        if (selected == 'DealerManagement')
        {
            this.vecilemangementValue = false;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = true;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = false;
        }

        if (selected == 'CarOwnerDetail')
        {
            this.vecilemangementValue = false;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = true;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = false;
        }

        if (selected == 'SalesManagement')
        {
            this.vecilemangementValue = false;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = true;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = false;
        }

        if (selected == 'PurchaseManagement')
        {
            this.vecilemangementValue = false;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = true;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = false;
        }


        if (selected == 'InvestmentsProfits')
        {
            this.vecilemangementValue = false;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = true;
            this.ReportsValue = false;
        }

        if (selected == 'Reports')
        {
            this.vecilemangementValue = false;
            this.CustomerManagementValue = false;
            this.DealerManagementValue = false;
            this.CarOwnerDetailValue = false;
            this.SalesManagementValue = false;
            this.PurchaseManagementValue = false;
            this.InvestmentsProfitsValue = false;
            this.ReportsValue = true;
        }

      
    }
    connectedCallback()
    {
      loadStyle(this, noHeader);
      
    }
  
}