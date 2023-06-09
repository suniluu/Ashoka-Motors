import { LightningElement,track,wire } from 'lwc';
import getAccounts2 from '@salesforce/apex/AccountControllerr.getAccounts2';


export default class DataTableWire extends LightningElement {
    @track data
    @track columns=[
        {label:'Id',fieldName:'Id',type:'text'},
        {label:'Name',fieldName:'Name',type:'text'},
        {label:'Phone',fieldName:'Phone',type:'phone'},
        {label:'Name',fieldName:'Name',type:'text'},
        {label:'Industry',fieldName:'Industry',type:'text'}
    ];
@wire(getAccounts2) getAccounts2({error,data})
{
    if(data)
    {
        this.data=data;
    }
    else if(error)
    {
        this.data=undefined;
    }
}
handleRowSelection(event) 
{
    const selectedRows = event.detail.selectedRows;
    const selectedRecordIds = selectedRows.map(row => row.Id);
    alert('uday');
    alert(selectedRecordIds);
}




}




