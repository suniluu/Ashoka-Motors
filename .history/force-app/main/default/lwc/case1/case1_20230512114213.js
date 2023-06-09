import { LightningElement, wire , track } from 'lwc';
import getCases from '@salesforce/apex/CasesController.getCases';
const columns = [
    { label: 'Case Number', fieldName: 'CaseNumber', type: 'text', sortable: true },
    { label: 'Subject', fieldName: 'Subject', type: 'text', sortable: true },
    { label: 'Status', fieldName: 'Status', type: 'text', sortable: true },
    { label: 'Priority', fieldName: 'Priority', type: 'text', sortable: true },
    { label: 'Owner Name', fieldName: 'Owner.Name', type: 'text', sortable: true },
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date', sortable: true },
  ];
  
export default class Case1 extends LightningElement {
    @track cases;
    columns = columns;
    @wire(getCases)
    wiredCases({ error, data }) {
       
        if (data) {
            //this.ALL_CASES = data;
            this.cases = data;
            alert(data);
            alert('hi');
            this.error = undefined;
        } 
    }

    
}