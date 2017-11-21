// This imports the "Template" functionality from the meteor packages.
import {Template} from 'meteor/templating';

// Import the item template
import './item.html';

// import the Items Collection
import Items from '../api/items.js';

// All of my helpers for the items template
Template.item.helpers({

});

// All of my event handlers for the items templates
Template.item.events({
  'click .vote-one'(event) {
    Meteor.call('updateItem', 'itemOne', this._id, (err)=> {
        if(err) {
          console.log(err);
        }
      } // callback
    ); // updateItem
  },
  'click .vote-two'(event) {
    Meteor.call('updateItem', 'itemTwo', this._id, (err)=> {
        if(err) {
          console.log(err);
        }
      } // callback
    ); // updateItem
  }
}); // events
