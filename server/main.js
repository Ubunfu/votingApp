import { Meteor } from 'meteor/meteor';

// Import items.js API file
// This will run server-side
import '../imports/api/items.js';

// Logs on the server
console.log('Hello server :]');

Meteor.startup(() => {
  // code to run on server at startup
});
