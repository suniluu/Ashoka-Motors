import { LightningElement ,track} from 'lwc';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import { loadStyle } from "lightning/platformResourceLoader";
import { NavigationMixin } from 'lightning/navigation';

export default class Homescreen extends NavigationMixin(LightningElement)
 {

    @track vecilemangementValue = true;    
    @track CustomerManagementValue = false;
    @track DealerManagementValue = false;
    @track CarOwnerDetailValue = false;
    @track SalesManagementValue = false;
    @track PurchaseManagementValue = false;
    @track InvestmentsProfitsValue = false;
    @track ReportsValue = false;
    
    @track showMenu = true;
    menuClass = 'menu-container';
    componentClass = 'component-container';
    
    openNav() {
      this.showMenu = !this.showMenu;
      if (this.showMenu) {
        this.menuClass = 'menu-container';
        this.componentClass = 'component-container';
      } else {
        this.menuClass = '';
        this.componentClass = 'expanded-container';
      }
    }

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
            let compDefinition = {
                componentDef: "c:disaplaycars",
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
   
    togglePanel() {
        let leftPanel = this.template.querySelector("div[data-my-id=leftPanel]");
        let rightPanel = this.template.querySelector("div[data-my-id=rightPanel]");
        if (leftPanel.classList.contains('slds-is-open')) {
            leftPanel.classList.remove("slds-is-open");
            leftPanel.classList.remove("open-panel");
            leftPanel.classList.add("slds-is-closed");
            leftPanel.classList.add("close-panel");
            rightPanel.classList.add("expand-panel");
            rightPanel.classList.remove("collapse-panel");
        } else {
            leftPanel.classList.add("slds-is-open");
            leftPanel.classList.add("open-panel");
            leftPanel.classList.remove("slds-is-closed");
            leftPanel.classList.remove("close-panel");
            rightPanel.classList.remove("expand-panel");
            rightPanel.classList.add("collapse-panel");
        }
    }

    goToCarOwner(){
        let compDefinition = {
            componentDef: "c:carSellerOwnerCmp",
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
    connectedCallback()
    {
      loadStyle(this, noHeader);
      
    }
  
}