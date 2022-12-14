import { Knex } from "knex";
import { ALLERGY_TABLE_NAME } from "../../constants/model.constants";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ALLERGY_TABLE_NAME, (table) => {
        table.string("id").primary();
        table.string("allergy_name").notNullable();
        table.string("referred_name").defaultTo("");
        table.text("description").defaultTo("");
        table.string("risk_level").notNullable();
        table.string("photo_url").defaultTo("");
        table.datetime("created_at").defaultTo(knex.fn.now()).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ALLERGY_TABLE_NAME);
}
