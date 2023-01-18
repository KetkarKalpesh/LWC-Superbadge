import { api, LightningElement, track, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import {refreshApex} from'@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from'lightning/platformShowToastEvent';
// ...
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';
import updateBoatList from'@salesforce/apex/BoatDataService.updateBoatList'; 

const SUCCESS_TITLE = 'Success';
const MESSAGE_SHIP_IT = 'Ship it!';
const SUCCESS_VARIANT = 'success';
const ERROR_TITLE   = 'Error';
const ERROR_VARIANT = 'error';
export default class BoatSearchResults extends LightningElement {
  @api selectedBoatId;
  columns = [
  {label:'Name', fieldName:'Name', editable: true},
  {label:'Length', fieldName:'Length__c', type:'number', editable: true},
  {label:'Price', fieldName:'Price__c', type:'currency', editable: true},
  {label:'Description', fieldName:'Description__c', editable: true}
  ];
  @api boatTypeId = '';
  @track boats;
  @track draftValues=[];
  isLoading = false;
  
  // wired message context
  @wire (MessageContext)
   messageContext;
  // wired getBoats method 
  @wire(getBoats,{boatTypeId:'$boatTypeId'})
  wiredBoats({error,data}) {
    if(data){
      this.boats = data;
      this.notifyLoading(false)
    }
    else if(error){
      this.error = error;
      this.notifyLoading(false);
    }
  }
  // public function that updates the existing boatTypeId property
  // uses notifyLoading
  @api searchBoats(boatTypeId) { 
    this.boatTypeId = boatTypeId;
    this.notifyLoading(true);
  }
  
  // this public function must refresh the boats asynchronously
  // uses notifyLoading
  @api async refresh() {
    this.notifyLoading(true);
    await refreshApex(this.boats);
    this.notifyLoading(false);
   }
  
  // this function must update selectedBoatId and call sendMessageService
  updateSelectedTile(event) {
    this.selectedBoatId = event.detail.boatId;
    this.sendMessageService(this.selectedBoatId);
   }
  
  // Publishes the selected boat Id on the BoatMC.
  sendMessageService(boatId) { 
    // explicitly pass boatId to the parameter recordId
    const message = {
      recordId:boatId,
    }
    publish(this.messageContext,BOATMC,message);
  }
  
  // The handleSave method must save the changes in the Boat Editor
  // passing the updated fields from draftValues to the 
  // Apex method updateBoatList(Object data).
  // Show a toast message with the title
  // clear lightning-datatable draft values
  handleSave(event) {
    // notify loading
    const updatedFields = event.detail.draftValues;
    // Update the records via Apex
    updateBoatList({data: updatedFields})
    .then(result => {
      const toast = new ShowToastEvent({
        title: SUCCESS_TITLE,
        message: MESSAGE_SHIP_IT,
        variant: SUCCESS_VARIANT
      })
      this.dispatchEvent(toast);
      this.draftValues=[];
      return this.refresh();
    })
    .catch(error => {
      const toast = new ShowToastEvent({
        title: ERROR_TITLE,
        message: error.message,
        variant: ERROR_VARIANT
      })
      this.dispatchEvent(toast);
    })
    .finally(() => {
    });
  }
  // Check the current value of isLoading before dispatching the doneloading or loading custom event
  notifyLoading(isLoading) { 
    let status =  isLoading?'loading':'doneloading'
    const loadEvent = new CustomEvent(status);
    this.dispatchEvent(loadEvent);
  }
}