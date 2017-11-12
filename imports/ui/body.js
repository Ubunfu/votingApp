// This imports the "Template" functionality from the meteor packages.
import {Template} from 'meteor/templating';

/*
 import the "items" Collection from API...
*/
// import {Items} from '../api/items.js';

/*
  Because only one thing is exported from items.js, and I used the
  export default syntax, I can do away with the brackets around Items.
*/
import Items from '../api/items.js';

/*
  Import the contents of the body.html file.
  When this file is imported, body.html will be imported too.
*/
import './body.html';

/*
  These helpers are grabbable from within templates.
  We can pull data and display it with helpers.
*/
Template.body.helpers({
  firstName: 'Ryan',
  lastName: 'Allen',
  items() {
    // Helper to return everything in our Items collection.
    return Items.find({});
  }
});

/*
  Events are formatted like:
  '<trigger-action> <selector>': <result-action>
  Events are used to do things, like submit forms, handling click
  events and updating content.
*/
Template.body.events({
/*
  es2015 JS syntax allows us to replace "function(event)"
  with "(event) =>".  It means the same thing.

  'click .btn-logger': (event) => {
    console.log("You clicked the button...");
  }
*/

// New meteor syntax allows us to modify the above like this
  'click .btn-logger'(event) {
    console.log("You clicked the button...");
  }
});
