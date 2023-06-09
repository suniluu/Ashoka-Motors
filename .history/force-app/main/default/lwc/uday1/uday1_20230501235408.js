import { LightningElement,api, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountControlleru.getAccounts';

export default class AccountList extends LightningElement {
  @track accounts = [];
  @api accountId;

  @wire(getAccounts)
  wiredAccounts({ error, data }) {
    if (data) 
    {
      this.accounts = data.map(account => ({ ...account, isSelected: false }));
    } 
  }

  handleAccountClick(event) 
  {
   
    this.accountId  = event.target.value;
    this.accounts = this.accounts.map(account => ({
      ...account,
      isSelected: account.Id ===  this.accountId  ? !account.isSelected : account.isSelected
    }));
  }
}
