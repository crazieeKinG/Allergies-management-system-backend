import { Knex } from "knex";
import {
    ALLERGY_TABLE_NAME,
    SYMPTOM_TABLE_NAME,
} from "../../constants/model.constants";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(SYMPTOM_TABLE_NAME, (table) => {
        table.increments("id");
        table.string("symptom").notNullable();
        table.string("description").nullable();
        table.string("allergy_id").notNullable();
        table
            .foreign("allergy_id")
            .references("id")
            .inTable(ALLERGY_TABLE_NAME);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(SYMPTOM_TABLE_NAME);
}
