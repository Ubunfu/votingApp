// Import Mongo DB features from Meteor packages
import {Mongo} from 'meteor/mongo';

/*
  Import the server-side methods here, so that when we import the
  collection, we don't have to remember to also import the methods.
*/
import './methods.js';

/*
  Export a new variable named Items as a new Mongo DB Collection.
*/
// export const Items = new Mongo.Collection('items');

/*
  If I'm only exporting ond thing, I can use the "export default"
  syntax.
  We can use "meteor reset" to restart our app and clear our our DB.
*/
const Items = new Mongo.Collection('items');
export default Items;
/*
  Make a publication we can subscribe to on the client side.
  A Publication is like a carefully crafted selection of information to fulfill a purpose.
  Only do this if we're on the server.
*/
if (Meteor.isServer) {
  Meteor.publish('allItems', function() {
    /*
      Just return everything for now.
      We can filter this out later.
      Use Mongo queries to alter the data set.
    */
    return Items.find({});
  });
}
