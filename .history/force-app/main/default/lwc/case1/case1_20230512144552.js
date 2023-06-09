import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import getCases from '@salesforce/apex/CasesController.getCases';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Case from '@salesforce/schema/Case';
import status from '@salesforce/schema/Product2.AM_Make_Year__c';

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

   

    @wire(getObjectInfo, { objectApiName: Case })
  objectInfo;
  @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId',fieldApiName: AM_Brand})
    AM_Brand({ error, data }) {
      if (data) {
        data.values.forEach((pl) => {
          this.latestActions.push({
            label: pl.label,
            checked: false,
            name: pl.value
          });
        });
        this.columns.forEach((col) => {
          if (col.label === "CarBrand") {
            col.actions = [...col.actions, ...this.latestActions];
          }
        });
        
      } else if (error) {
        console.error(error);
      }
    }


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
        alert(actionName);
        alert(colDef.label);
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