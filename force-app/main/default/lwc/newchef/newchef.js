import { LightningElement, wire } from 'lwc';
import getAllcheforders from '@salesforce/apex/ChefscreenController.getAllcheforders';

const columns = [
    { label: 'Order Name', fieldName: 'CCXR_Order_Id__r.Name', type: 'text', sortable: true },
  { label: 'Quantity', fieldName: 'CCXR_Quantity__c', type: 'number', sortable: true },
  { label: 'Table', fieldName: 'CCXR_Table__c', type: 'text', sortable: true },
  { label: 'Order Status', fieldName: 'Order_status__c', type: 'text', sortable: true },
  
  
  { label: 'Assigned Chef', fieldName: 'Assignedtochef__r.Name', type: 'text', sortable: true },
  { label: 'Item Category', fieldName: 'CCXR_Items_ID__r.CCXR_Item_Category__c', type: 'text', sortable: true ,
  actions: [{ 
    label: 'Filter', 
    type: 'button', 
    name: 'filterItemCategory',
    iconName: 'utility:filter',
    disabled: false
  }]},
  { label: 'Item Name', fieldName: 'CCXR_Items_ID__r.CCXR_Item_Name__c', type: 'text', sortable: true },
  
 
  { label: 'Item ID', fieldName: 'CCXR_Items_ID__c', type: 'text', sortable: true },
  { label: 'Accept', type: 'button', typeAttributes: { 
    label: 'Accept', 
    name: 'Accept',
    
    variant: 'brand'
  }
},
{ label: 'Ready',type: 'button', typeAttributes: { 
    label: 'Ready', 
    name: 'Ready',
    
    variant: 'brand'
  }
}
];

export default class chefScreenComponent extends LightningElement {
  showItemCategoryPopup = false;
  chefOrders;
  filteredOrders;
  columns = columns;
  itemNameFilter = '';
  itemCategoryFilter = '';
  sortedColumn;
  sortedDirection;

  @wire(getAllcheforders)
  fetchChefOrders({ error, data }) {
    if (data) {
      this.chefOrders = data.map(order => ({
        ...order,
        'Assignedtochef__r.Name': order.Assignedtochef__r ? order.Assignedtochef__r.Name : '',
        'CCXR_Items_ID__r.CCXR_Item_Category__c': order.CCXR_Items_ID__r ? order.CCXR_Items_ID__r.CCXR_Item_Category__c : '',
        'CCXR_Items_ID__r.CCXR_Item_Name__c': order.CCXR_Items_ID__r ? order.CCXR_Items_ID__r.CCXR_Item_Name__c : '',
        'CCXR_Order_Id__r.Name': order.CCXR_Order_Id__r ? order.CCXR_Order_Id__r.Name : ''
      }));
      this.applyFiltersAndSorting();
    } else if (error) {
      console.error(error);
    }
  }
  handleRowAction(event) {
    const action = event.detail.action;
    const row = event.detail.row;

    switch (action.name) {
        case 'Accept':
            this.handleacceptbutton(row);
            break;
        default:
    }
    switch (action.name) {
        case 'Ready':
            
            break;
        default:
    }
}
handleHeaderAction(event) {
  const actionName = event.detail.action.name;
  if (actionName === 'searchItemCategory') {
    this.itemCategoryFilter = event.detail.value.toLowerCase();
  } else if (actionName === 'filterItemCategory') {
    this.showItemCategoryPopup = !this.showItemCategoryPopup;
  }
  this.applyFiltersAndSorting();
}

handleacceptbutton(row) 
{
 
  this.button1v=true;
  this.button2v=false;
  this.itemId = event.target.value;
  updatecheforderstatus({ cat: this.itemId, cat1: this.chefidd,but1 :this.button1v,but2 :this.button2v })
  .then(result => 
    {
      this.data=result;
      this.nooforders=this.data;
       if (this.nooforders == 3) 
       {
        updatechefemployeebusy({cid :this.chefidd})
       }
     return refreshApex(this.wiredData);
     })
     .catch((error) => {
      console.error(error);
    });
  }

  handleButtonClick11(event)
       {
        this.button2v=true;
        this.itemIdr = event.target.value;
        updatecheforderstatus1({cat:this.itemIdr,but2 : this.button2v})
        .then(result => {
          this.data=result;
          this.cheonfg=this.data.Assignedtochef__c;
          updatechefemployeeavailable({cid :this.cheonfg})
        return refreshApex(this.wiredData);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    deleteProduct(row)
    {
        deleteSelectVehicles({vid:row.Id})
        .then(() => {
            // Refresh the @wire function to update the UI with the latest data
            return refreshApex(this.Vehicles);
        })
        .then(() => {
            // Display a success toast message
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Vehicle deleted successfully',
                    variant: 'success',
                })
            );
        })
    }

  handleSearchItemName(event) {
    this.itemNameFilter = event.target.value.toLowerCase();
    this.applyFiltersAndSorting();
  }

  handleSearchItemCategory(event) {
    this.itemCategoryFilter = event.target.value.toLowerCase();
    this.applyFiltersAndSorting();
  }

  handleSort(event) {
    const { fieldName, sortDirection } = event.detail;
    this.sortedColumn = fieldName;
    this.sortedDirection = sortDirection;
    this.applyFiltersAndSorting();
  }

  applyFiltersAndSorting() {
    let filteredData = this.chefOrders;

    // Apply filters
    filteredData = filteredData.filter(order =>
      order.CCXR_Items_ID__r.CCXR_Item_Name__c.toLowerCase().startsWith(this.itemNameFilter) &&
      order.CCXR_Items_ID__r.CCXR_Item_Category__c.toLowerCase().startsWith(this.itemCategoryFilter)
    );

    // Apply sorting
    if (this.sortedColumn && this.sortedDirection) {
      filteredData = this.sortData(filteredData, this.sortedColumn, this.sortedDirection);
    }

    this.filteredOrders = filteredData;
  }

  sortData(data, fieldName, sortDirection) {
    const reverse = sortDirection === 'desc' ? -1 : 1;
    return [...data].sort((a, b) => {
      if (a[fieldName] > b[fieldName]) {
        return reverse;
      } else if (a[fieldName] < b[fieldName]) {
        return -reverse;
      }
      return 0;
    });
  }
}
