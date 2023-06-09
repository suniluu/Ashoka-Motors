import { LightningElement,track,api } from 'lwc';
import getPhoneNum from '@salesforce/apex/AmCustomerDetailController.getPhoneNum';
import createCST from '@salesforce/apex/AmCustomerDetailController.createCST';


export default class Customerexistingandpreferences extends LightningElement 

{
    @track input;
    @track isFormVisible = false;
    @track butval;
    @track showpage=false;
    @track data;
    @api records;

    @track dataid;
    

}