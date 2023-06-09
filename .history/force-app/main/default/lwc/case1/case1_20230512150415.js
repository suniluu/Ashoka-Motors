import { LightningElement, wire } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getCases } from '@salesforce/apex/CasesController';

import CASE_OBJECT from '@salesforce/schema/Case';
import CASE_STATUS_FIELD from '@salesforce/schema/Case.Status';

const DEFAULT_ACTIONS = [{ label: 'All', checked: true, name: 'all' }];

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
    allCases = [];
    latestActions = [];

    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: CASE_STATUS_FIELD })
    wiredPicklistValues({ error, data }) {
        if (data) {
            this.latestActions = data.values.map(pl => ({
                label: pl.label,
                checked: false,
                name: pl.value
            }));
            this.columns.forEach(col => {
                if (col.label === 'Status') {
                    col.actions = [...DEFAULT_ACTIONS, ...this.latestActions];
                }
            });
        } else if (error) {
            console.error(error);
        }
    }

    @wire(getCases)
    wiredCases({ error, data }) {
        if (data) {
            this.allCases = data;
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

        if (actionName !== undefined && actionName !== 'all') {
            this.cases = this.allCases.filter(_case => _case[colDef.fieldName] === actionName);
        } else if (actionName === 'all') {
            this.cases = this.allCases;
        }

        this.columns.find(col => col.label === colDef.label).actions.forEach(action => {
            action.checked = action.name === actionName;
        });
        this.columns = [...this.columns];
    }
}



/*import { LightningElement, wire } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getCases } from '@salesforce/apex/CasesController';

import CASE_OBJECT from '@salesforce/schema/Case';
import CASE_STATUS_FIELD from '@salesforce/schema/Case.Status';

const DEFAULT_ACTIONS = [{ label: 'All', checked: true, name: 'all' }];

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
    allCases = [];
    latestActions = [];

    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: CASE_STATUS_FIELD })
    wiredPicklistValues({ error, data }) {
        if (data) {
            this.latestActions = data.values.map(pl => ({
                label: pl.label,
                checked: false,
                name: pl.value
            }));
            this.columns.forEach(col => {
                if (col.label === 'Status') {
                    col.actions = [...DEFAULT_ACTIONS, ...this.latestActions];
                }
            });
        } else if (error) {
            console.error(error);
        }
    }

    @wire(getCases)
    wiredCases({ error, data }) {
        if (data) {
            this.allCases = data;
            this.cases = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    // Placeholder getCases method, replace with your implementation
    getCases() {
        return getCases(); // Call your Apex method to retrieve case records
    }

    handleHeaderAction(event) {
        const actionName = event.detail.action.name;
        const colDef = event.detail.columnDefinition;

        if (actionName !== undefined && actionName !== 'all') {
            this.cases = this.allCases.filter(_case => _case[colDef.fieldName] === actionName);
        } else if (actionName === 'all') {
            this.cases = this.allCases;
        }

        this.columns.find(col => col.label === colDef.label).actions.forEach(action => {
            action.checked = action.name === actionName;
        });
        this.columns = [...this.columns];
    }
}
*/