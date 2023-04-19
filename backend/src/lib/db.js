import pg from 'pg';
//import { readFileAsync } from 'fs';
import { readFile } from 'fs/promises';


const SCHEMA_FILE = './sql/schema.sql';
const DROP_SCHEMA_FILE = './sql/drop.sql';

const { DATABASE_URL: connectionString, NODE_ENV: nodeEnv = 'development' } = process.env;

if (!connectionString) {
  console.error('vantar DATABASE_URL í .env');
  process.exit(-1);
}

const ssl = nodeEnv === 'production' ? { rejectUnauthorized: false } : false;

const pool = new pg.Pool({ connectionString, ssl });

pool.on('error', (err) => {
  console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
  process.exit(-1);
});

export async function query(q, values = []) {
  let client;
  try {
    client = await pool.connect();
  } catch (e) {
    console.error('unable to get client from pool', e);
    return null;
  }

  try {
    const result = await client.query(q, values);
    return result;
  } catch (e) {
    console.error('unable to query', e);
    console.info(q, values);
    return null;
  } finally {
    client.release();
  }
}

export async function createSchema() {
  try {
    const createSchemaSQL = await readFile(SCHEMA_FILE, 'utf8');
    const result = await query(createSchemaSQL);
    return result;
  } catch (e) {
    console.error('unable to create schema', e);
    return null;
  }
}

export async function dropSchema() {
  try {
    const dropSchemaSQL = await readFile(DROP_SCHEMA_FILE, 'utf8');
    const result = await query(dropSchemaSQL);
    return result;
  } catch (e) {
    console.error('unable to drop schema', e);
    return null;
  }
}

export async function end() {
  await pool.end();
}

export async function conditionalUpdate(table, id, fields, values) {
  try {
    const setValues = fields.map((field, i) => field ? `${field}=$${i+1}` : null).filter(Boolean).join(', ');
    const text = `UPDATE ${table} SET ${setValues} WHERE id=${id} RETURNING *`;
    const result = await query(text, values);
    return result;
  } catch (e) {
    console.error(`unable to update ${table} with id ${id}`, e);
    return null;
  }
}


export async function insert(table, values) {
  try {
    const text = `INSERT INTO ${table} VALUES(${values.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`;
    const result = await query(text, values);
    return result.rows[0];
  } catch (e) {
    console.error(`unable to insert into ${table}`, e);
    return null;
  }
}

export async function deleteFrom(table, id) {
  try {
    const text = `DELETE FROM ${table} WHERE id=$1 RETURNING *`;
    const result = await query(text, [id]);
    return result.rows[0];
  } catch (e) {
    console.error(`unable to delete from ${table}`, e);
    return null;
  }
}

export async function get(table, id) {
  try {
    const text = `SELECT * FROM ${table} WHERE id=$1`;
    const result = await query(text, [id]);
    return result.rows[0];
  } catch (e) {
    console.error(`unable to get from ${table}`, e);
    return null;
  }
}