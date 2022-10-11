import Knex from "knex";
import knexConfig from "./knexfile";

//@ts-ignore
import knexStringCase from "knex-stringcase";

const db = Knex(knexStringCase(knexConfig.production));

export default db;
