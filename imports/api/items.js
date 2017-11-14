// Import Mongo DB features from Meteor packages
import {Mongo} from 'meteor/mongo';

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
