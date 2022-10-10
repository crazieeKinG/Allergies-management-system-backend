import { Knex } from "knex";
import {
    REFRESH_TABLE_NAME,
    USER_TABLE_NAME,
} from "../../constants/model.constants";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(REFRESH_TABLE_NAME, (table) => {
        table.increments("id");
        table.string("refresh_token").notNullable();
        table.string("user_id");
        table.foreign("user_id").references("id").inTable(USER_TABLE_NAME);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(REFRESH_TABLE_NAME);
}
