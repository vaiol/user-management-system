const { knex, TABLES } = require("../connection");

/**
 * @typedef CreateUserDTO {{ email: string, password: string, name: string }}
 * @typedef UpdateUserDTO {{ id: number, [email]: string, [password]: string, [name]: string }}
 * @typedef User {{ id: number, email: string, name: string }}
 */

const userFields = ["id", "name", "email"];

/**
 * @param user {CreateUserDTO}
 * @returns {Promise<User>}
 */
const addUser = user =>
  knex(TABLES.USERS)
    .insert(user)
    .returning(userFields);

/**
 * @param id {number}
 * @returns {Promise<User>}
 */
const getUser = id =>
  knex(TABLES.USERS)
    .select(userFields)
    .where({ id });

/**
 * @param [skip=0] {number}
 * @param [take=10] {number}
 * @param [order=id] {string}
 * @returns {Promise<User[]>}
 */
const getUsersList = (skip = 0, take = 10, order = "id") =>
  knex(TABLES.USERS)
    .select(userFields)
    .offset(skip)
    .limit(take)
    .orderBy(order);

/**
 * @param user {UpdateUserDTO}}
 * @returns {Promise<User>}
 */
const updateUser = user =>
  knex(TABLES.USERS)
    .update(user)
    .where({ id: user.id })
    .returning(userFields);

/**
 * @param id {number}
 * @returns {Promise<User>}
 */
const removeUser = id =>
  knex(TABLES.USERS)
    .del()
    .where({ id })
    .returning(userFields);

/**
 * @param email {string}
 * @returns {Promise<{ id: number }>}
 */
const getByEmail = email =>
  knex(TABLES.USERS)
    .select("id")
    .where({ email });

module.exports = {
  addUser,
  getUser,
  getUsersList,
  updateUser,
  removeUser,
  getByEmail
};
