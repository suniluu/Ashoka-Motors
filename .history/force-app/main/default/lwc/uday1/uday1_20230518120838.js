import { LightningElement, track } from 'lwc';

export default class ParentModalBox extends LightningElement {
    @track isParentModalOpen = false;

    openParentModal() {
        this.isParentModalOpen = true;
    }
}
