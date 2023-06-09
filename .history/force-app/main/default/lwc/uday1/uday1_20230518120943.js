import { LightningElement, track } from 'lwc';

export default class ParentModalBox extends LightningElement {
    @track isParentModalOpen = false;

    openParentModal() {
        this.isParentModalOpen = true;
    }
}


/*
import { LightningElement, track } from 'lwc';

export default class ChildModalBox extends LightningElement {
    @track isChildModalOpen = false;

    openChildModal() {
        this.isChildModalOpen = true;
    }
}
*/