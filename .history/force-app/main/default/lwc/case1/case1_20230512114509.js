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
            this.ALL_CASES = data;
            this.cases = data;
           
            this.error = undefined;
        } 
    }
    handleHeaderAction(event) {
        // gives the selection header action name
        const actionName = event.detail.action.name;
        alert(actionName);
        
        // gives selected column definition
        const colDef = event.detail.columnDefinition;
        
        // assigning colmuns to new variable
        let cols = this.columns;
    
        if (actionName !== undefined && actionName !== 'all') {
            // filtering cases on selected actionname
            this.cases = this.ALL_CASES.filter(_case => _case[colDef.label] === actionName);
        } else if (actionName === 'all') {
            // returning all cases
            this.cases = this.ALL_CASES;
        }
    
        /* Following line is responsible for finding which header action selected and return corresponding actions then we will mark selcted as checked/true and remaining will be marked as unchecked/marked */
        
            cols.find(col => col.label === colDef.label).actions.forEach(action => action.checked = action.name === actionName);
            this.columns = [...cols];
        }

    
}