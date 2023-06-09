import { LightningElement, track, wire } from 'lwc';


export default class MyComponent extends LightningElement {
    @track newIndustry = '';

    handleNewIndustryChange(event) {
        this.newIndustry = event.target.value;
    }

    handleAdd() {
        addIndustryValue({ newIndustry: this.newIndustry })
            .then(() => {
                // Success message or further actions
                console.log('New industry value added successfully');
            })
            .catch(error => {
                // Error handling
                console.error('Error adding new industry value:', error);
            });
    }
}
