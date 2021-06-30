// simple state handler
import { IndexedDB } from './indexeddb.js';

export class State {

  static dbName = 'stateDB';
  static dbVersion = 1;
  static storeName = 'state';
  static DB = null;
  static target = new EventTarget();


  // object constructor
  constructor(observed, updateCallback) {

    // state change callback
    this.updateCallback = updateCallback;

    // observed properties
    this.observed = new Set(observed);

    // subscribe to set events
    State.target.addEventListener('set', e => {

      if (this.updateCallback && this.observed.has( e.detail.name )) {
        this.updateCallback(e.detail.name, e.detail.value);
      }

    });

  }


  // connect to IndexedDB database
  async dbConnect() {

    State.DB = State.DB || await new IndexedDB(
      State.dbName,
      State.dbVersion,
      (db, oldVersion, newVersion) => {

        // upgrade database
        switch (oldVersion) {
          case 0: {
            db.createObjectStore( State.storeName );
          }
        }

      });

    return State.DB;

  }


  // set value in DB
  async set(name, value) {

    // add observed property
    this.observed.add(name);

    // database update
    const db = await this.dbConnect();
    await db.set( State.storeName, name, value );

    // raise event
    const event = new CustomEvent('set', { detail: { name, value } });
    State.target.dispatchEvent(event);

  }


  // get value from DB
  async get(name) {

    // add observed property
    this.observed.add(name);

    // database fetch
    const db = await this.dbConnect();
    return await db.get( State.storeName, name );

  }

}
