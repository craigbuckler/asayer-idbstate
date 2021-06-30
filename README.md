# Using IndexDB to Manage State in JavaScript

This project demonstrates how to use the browser's IndexedDB database to manage state in applications.

The project provides two primary files:

1. `js/lib/indexeddb.js` - an IndexedDB wrapper library with Promisifies the API.
1. `js/lib/state.js` - a state management object with `get` and `set` methods.

An example *todo* application demonstrates usage:

1. `index.html` - page
1. `css/main.css` - basic styles
1. `js/main.js` - single entry point which loads required modules
1. `js/components/todo-list.js` - displays current todo list and handles removing tasks
1. `js/components/todo-add.js` - todo entry form which handles adding tasks

Both components manage state through `js/lib/state.js`.

Copy all files to a web server or launch one, e.g. using Node.js:

```bash
npx small-static-server
```

and open `index.html` in a web browser.
