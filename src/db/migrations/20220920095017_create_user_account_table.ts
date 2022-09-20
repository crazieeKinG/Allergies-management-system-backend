import { Knex } from "knex";
import { USER_TABLE_NAME } from "../../constants/model.constants";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(USER_TABLE_NAME, (table) => {
        table.string("id").notNullable().primary();
        table.string("full_name").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.string("date_of_birth").notNullable();
        table.string("address").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(USER_TABLE_NAME);
}
