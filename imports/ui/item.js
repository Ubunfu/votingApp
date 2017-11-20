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
    // console.log(event);
    // console.log(this);
    // console.log(this.itemOne.text);
    // console.log(this._id);
    Items.update(this._id, {
      $set: {
        'itemOne.value': this.itemOne.value + 1
      }
    });
  },
  'click .vote-two'(event) {
    // console.log(event);
    // console.log(this);
    // console.log(this.itemTwo.text);
    // console.log(this._id);
    Items.update(this._id, {
      $set: {
        'itemTwo.value': this.itemTwo.value + 1
      }
    });
  }
});
