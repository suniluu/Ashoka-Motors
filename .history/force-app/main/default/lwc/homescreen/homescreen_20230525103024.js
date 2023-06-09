import { LightningElement ,track} from 'lwc';

export default class Homescreen extends LightningElement {

    @track tutorialValue = true;    
    @track integrationValue = false;
    @track visualforceValue = false;
   

    changeHandleAction(event) {
        const selected = event.detail.name;        
 
        this.currentContent = selected;
 
        if (selected == 'tutorial')
        {
            this.tutorialValue = true;
            this.integrationValue = false;
            this.visualforceValue = false;
        }
 
        if (selected == 'integration')
        {
            this.tutorialValue = false;
            this.integrationValue = true;
            this.visualforceValue = false;
        }
 
        if (selected == 'visualforce')
        {
            this.tutorialValue = false;
            this.integrationValue = false;
            this.visualforceValue = true;
        }

      
    }

}