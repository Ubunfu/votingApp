/*
  This is where we will do all of our server-side DB inserts and stuff like that which we don't want to allow on the client side for security.
*/

// Need to import items collection here to enable DB access
// Has baked in server-side methods
import Items from './items.js';

/*
  This package checks variable types.
  Helps a little bit to prevent malicious input.
*/
import {check} from 'meteor/check';

Meteor.methods({
  // createNewItem is just the name of the method.
  // It takes two arguments, which we need for the insert.
  createNewItem(itemOne, itemTwo) {
    // Check types
    check(itemOne, String);
    check(itemTwo, String);

    // Check to make sure input is not empty.
    if(!itemOne || !itemTwo) {
      console.error("ERROR: invalid input.");
      return;
    }

    // Do the insert
    Items.insert({
      itemOne: {
        text:itemOne,
        value:0
      },
      itemTwo: {
        text:itemTwo,
        value:0
      }
    });

  },

  // Update an item when we click on it to vote
  updateItem(itemName, id) {
    // Check types
    check(itemName, String);
    check(id, String);

    // Grab a new date to update the item's timestamp.
    let date = new Date();

    /*
      Do the update
      Use the $inc colletions method instead of set!
      This way, you don't need the current value of the item in order to
      update it.  So I don't have to worry about passing that in somehow.
    */
    if (itemName == 'itemOne') {
      Items.update(id, {
        $inc: {
          'itemOne.value': 1
        },
        $set: {
          'lastUpdated': date
        }
      });
    }else if (itemName == 'itemTwo') {
      Items.update(id, {
        $inc: {
          'itemTwo.value': 1
        },
        $set: {
          'lastUpdated': date
        }
      });
    } else {
      console.log("ERROR: Unknown item.");
    }

  }

});
