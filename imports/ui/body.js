// This imports the "Template" functionality from the meteor packages.
import {Template} from 'meteor/templating';

// Import Reactive Dictionary package
import {ReactiveDict} from 'meteor/reactive-dict';

// Import Session package
import {Session} from 'meteor/session';

/*
 import the "items" Collection from API...
*/
// import {Items} from '../api/items.js';

/*
  Because only one thing is exported from items.js, and I used the
  export default syntax, I can do away with the brackets around Items.
*/
import Items from '../api/items.js';

// Import dependency for "item" template
import './item.js';

/*
  Import the contents of the body.html file.
  When this file is imported, body.html will be imported too.
*/
import './body.html';

/*
  Subscribe to publications right away.
  onCreated is called as soon as the template is built.
*/
Template.body.onCreated(function() {
  // This is our reactive dictionary.
  this.state = new ReactiveDict();
  Meteor.subscribe('allItems');
});

/*
  These helpers are grabbable from within templates.
  We can pull data and display it with helpers.
*/
Template.body.helpers({
  firstName: 'Ryan',
  lastName: 'Allen',
  items() {
    // Helper to return stuff from our Items collection.
    // Page them one at a time, ordering by <item>.lastUpdated.
    return Items.find({}, {
      limit: 1,
      // sort 1 : oldest first
      // sort -1 : newest first
      sort: { lastUpdated: 1 }
    });
  },
  loggedIn() {
    // Returns the user ID if the user is logged in.
    return Meteor.userId();
  },
  showForm() {
    // Set up a new instance of this template
    const instance = Template.instance();

    // return the value of the 'show-form' state variable
    return instance.state.get('show-form');
  },
  bgColor() {
    return Session.get('bgColor');
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
  'click .bg-color'(event) {
    // Set the bg session variable
    Session.set('bgColor', 'orange');
  },
  'click .show-form'(event, instance) {
    // Set the 'show-form' state variable to true
    instance.state.set('show-form', true);
  },
  'click .btn-logger'(event) {
    console.log("You clicked the button...");
  },
  'submit .form-options'(event, instance) {
    // This fires every time we click the form's submit button
    // Below line stops page refreshing on submits that destroy our logs.
    event.preventDefault();

    // We can log the entire event to see the stuff we have access to
    // console.log(event);

    // Or we can grab specific parts of the event object
    console.log(event.target.choice1.value);
    console.log(event.target.choice2.value);

    // Instead of inserting from the client side, make the server do it.
    Meteor.call(
      'createNewItem',
      event.target.choice1.value,
      event.target.choice2.value,
      // This is a callback! Runs when this call is finished!  Args are error and response from server.
      (err, res)=> {
        if(err) {
          console.log(err);
        } else {
          console.log(res);

          // Clear the form after it is inserted
          event.target.choice1.value='';
          event.target.choice2.value='';

          // Hide the form again
          instance.state.set('show-form', false);
        }
      }
    );



  }
});
