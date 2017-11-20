/*
  This is where we will do all of our server-side DB inserts and stuff like that which we don't want to allow on the client side for security.
*/

// Need to import items collection here to enable DB access
// Has baked in server-side methods
import Items from './items.js';

Meteor.methods({
  // createNewItem is just the name of the method.
  // It takes two arguments, which we need for the insert.
  createNewItem(itemOne, itemTwo) {
    console.log(itemOne, itemTwo);
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
  updateItem(itemName, thing) {
    console.log(itemName, thing);

    if (itemName == 'itemOne') {
      Items.update(thing._id, {
        $set: {
          'itemOne.value': thing.itemOne.value + 1
        }
      });
    }else if (itemName == 'itemTwo') {
      Items.update(thing._id, {
        $set: {
          'itemTwo.value': thing.itemTwo.value + 1
        }
      });
    } else {
      console.log("ERROR: Unknown item.");
    }

  }

});
