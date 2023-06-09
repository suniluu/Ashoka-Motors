import { LightningElement,track,wire} from 'lwc';
import getVehicleRepairsdata from'@salesforce/apex/AM_VehicleRepairsClass.getVehicleRepairsdata';
export default class AM_VehicleRepairsComp extends LightningElement {
@track columns=[{ label: 'Name',fieldName: 'Name',type: 'text'},
{ label: 'Air_Bags',fieldName: 'AM_Air_Bags__c',type: 'Checkbox'},
{ label: 'Actual_Repair_Amount',fieldName: 'AM_Actual_Repair_Amount__c',type: 'Currency'},
{ label: 'Air_Working_Condition',fieldName: 'AM_Air_Working_Condition__c',type: 'Checkbox'},
{ label: 'CarNumber',fieldName: 'AM_CarNumber__c',type: 'text'}]
@track error;
@track vehiclelist ;
@wire(getVehicleRepairsdata)
wiredVehicle({error,data}) {
    if (data) {
        this.vehiclelist = data;
    } else if (error) {
        this.error = error;
    }
}
}