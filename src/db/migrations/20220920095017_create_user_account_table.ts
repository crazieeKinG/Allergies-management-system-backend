import { Knex } from "knex";
import { USER_TABLE_NAME } from "../../constants/model.constants";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(USER_TABLE_NAME, (table) => {
        table.string("id").notNullable().primary();
        table.string("full_name").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.datetime("date_of_birth").notNullable();
        table.string("address").notNullable();
        table.datetime("created_at").defaultTo(knex.fn.now()).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(USER_TABLE_NAME);
}
