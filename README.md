# user-management-system
BE user management system


 ``` CREATE USER user_management_admin WITH ENCRYPTED PASSWORD 'user_management_password'; ```   
 ``` CREATE DATABASE user_management_db WITH OWNER user_management_admin; ```   
 ``` CREATE DATABASE user_management_db_test WITH OWNER user_management_admin; ```   

### Knex
``` npm run knex migrate:rollback ```   
``` npm run knex migrate:latest ```   
``` npm run knex seed:run ```   
