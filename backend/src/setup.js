import { createSchema, dropSchema, end, query } from './lib/db.js';
import dotenv from 'dotenv';
//import {readFileAsync} from 'fs';
import { readFile } from 'fs/promises';

dotenv.config();
 
async function create() {
  const drop = await dropSchema();

  if (drop) {
    console.info('schema dropped');
  } else {
    console.info('schema not dropped, exiting');
    process.exit(-1);
  }

  const result = await createSchema();

  if (result) {
    console.info('schema created');
  } else {
    console.info('schema not created');
  }

  await end();
}

async function insertData() {
  try {
    const createData = await readFile('./sql/insert.sql');
    await query(createData.toString('utf8'));
    console.info('Notendur búnir til');
  } catch (e) {
    console.error('Villa við að búa til notendur:', e.message);
    return;
  }
}

create().catch((err) => {
  console.error('Error creating running setup', err);
});

insertData().catch((err) => {
  console.error('Error inserting data', err);
});
