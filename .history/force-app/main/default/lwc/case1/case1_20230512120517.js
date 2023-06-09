import { LightningElement, wire } from 'lwc';
import getCases from '@salesforce/apex/CasesController.getCases';
import CASE_STATUS from '@salesforce/schema/Case.Status';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

let DEFAULT_ACTIONS = [{ label: 'All', checked: true, name: 'all' }];

const columns = [
    { label: 'CaseNumber', fieldName: 'CaseNumber' },
    {
        label: 'Status', fieldName: 'Status', actions: DEFAULT_ACTIONS
    },
    { label: 'Subject', fieldName: 'Subject' },
    {
        label: 'Priority', fieldName: 'Priority',
        actions: [{ label: 'All', checked: true, name: 'all' },
        { label: 'Low', checked: false, name: 'Low' },
        { label: 'Medium', checked: false, name: 'Medium' },
        { label: 'High', checked: false, name: 'High' }]
    }
];

export default class Cases extends LightningElement {

    columns = columns;
    cases = [];
    ALL_CASES = [];
    latestActions = [];

   

  

    @wire(getCases)
    wiredCases({ error, data }) {
        if (data) {
            
            this.ALL_CASES = data;
            this.cases = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    handleHeaderAction(event) {
        const actionName = event.detail.action.name;
        const colDef = event.detail.columnDefinition;
        const cols = this.columns;

        if (actionName !== undefined && actionName !== 'all') {
            this.cases = this.ALL_CASES.filter(_case => _case[colDef.label] === actionName);
        } else if (actionName === 'all') {
            this.cases = this.ALL_CASES;
        }

        cols.find(col => col.label === colDef.label).actions.forEach(action => action.checked = action.name === actionName);
        this.columns = [...cols];
    }
}