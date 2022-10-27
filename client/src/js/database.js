import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// The following logic puts the inputed text to the indexedDB database 
export const putDb = async (content) => {
  console.log('Putting to database...');
  // Make database connection
  const jateDb = await openDB('jate', 1);
  // Make transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, jate: content });
  const result = await request;
  console.log('Data saved.', result);
};

// Gets everything from the database
export const getDb = async () => {
  console.log('Getting all data...');
  // Make database connection
  const jateDb = await openDB('jate', 1);
  // Make transaction
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
