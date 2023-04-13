import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import xss from 'xss';
import { conditionalUpdate, query } from '../lib/db.js';
import logger from '../lib/logger.js'; 

dotenv.config();

/**
 * Hjálparföll fyrir notendur, uppfletting, búa til, uppfæra.
 */

const { BCRYPT_ROUNDS: bcryptRounds = 1 } = process.env;

async function createUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, parseInt(bcryptRounds, 10));

  const q = `
    INSERT INTO
      users (username, email, password)
    VALUES
      ($1, $2, $3)
    RETURNING *`;

  const values = [xss(username), xss(email), hashedPassword];
  const result = await query(q, values);

  return result.rows[0];
}

async function comparePasswords(password, hash) {
  const result = await bcrypt.compare(password, hash);

  return result;
}

async function findByUsername(username) {
  const q = 'SELECT * FROM users WHERE username = $1';

  try {
    const result = await query(q, [username]);

    if (result.rowCount === 1) {
      return result.rows[0];
    }
  } catch (e) {
    logger.error('unable to query user by username');
    return null;
  }

  return false;
}

async function findByEmail(email) {
  const q = 'SELECT * FROM users WHERE email = $1';

  try {
    const result = await query(q, [email]);

    if (result.rowCount === 1) {
      return result.rows[0];
    }
  } catch (e) {
    logger.error('unable to query user by email');
    return null;
  }

  return false;
}

async function findById(id) {
  const q = 'SELECT * FROM users WHERE id = $1';

  try {
    const result = await query(q, [id]);

    if (result.rowCount === 1) {
      return result.rows[0];
    }
  } catch (e) {
    console.error('Gat ekki fundið notanda eftir id');
  }

  return null;
}

function isInt(i) {
  return i !== '' && Number.isInteger(Number(i));
}

function isString(s) {
  return typeof s === 'string';
}

async function updateUser(id, password, email, profilePicture, description) {
  if (!isInt(id)) {
    return null;
  }

  const fields = [
    isString(password) ? 'password' : null,
    isString(email) ? 'email' : null,
    isString(profilePicture) ? 'profilePicture' : null,
    isString(description) ? 'description' : null
  ];

  let hashedPassword = null;

  if (password) {
    hashedPassword = await bcrypt.hash(password, parseInt(bcryptRounds, 10));
  }

  const values = [
    hashedPassword,
    isString(email) ? xss(email) : null,
    isString(profilePicture) ? profilePicture : null,
    isString(description) ? description : null
  ];

  fields.push('updated');
  values.push(new Date());

  const result = await conditionalUpdate('users', id, fields, values);

  if (!result) {
    return null;
  }

  const updatedUser = result.rows[0];
  delete updatedUser.password;

  return updatedUser;
}

export {
  createUser,
  comparePasswords,
  findByUsername,
  findByEmail,
  findById,
  updateUser
};