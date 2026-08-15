import {App} from '@tinyhttp/app';
import {JSONFile} from 'lowdb/node';
import {Low} from 'lowdb';
import {createApp} from 'json-server/lib/app.js';

const port = 3000;
const host = 'localhost';
const dbFile = 'mock/db.json';

const adapter = new JSONFile(dbFile);
const db = new Low(adapter, {});
await db.read();

const app = new App();
app.use('/api', createApp(db));

app.listen(port, () => {
  console.log(`Mock API: http://${host}:${port}/api`);
  console.log(`Payments: http://${host}:${port}/api/payments`);
}, host);
