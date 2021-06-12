
import {Knex} from 'knex';

export async function up(knex: Knex){

    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();

        /*
            Quando se criar uma tabela no sql que faz algum tipo de relacionamento
            é preciso fazer a referencia, ou seja, criar a chamada chave estrangeira.
            Então, todo id que estiver nessa tabela precisa ser um id valido na tabela 'points'.
         */

        table.integer('point_id')
        .notNullable()
        .references('id')
        .inTable('points');

        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items');

    })
}
export async function down(knex: Knex){
    //VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('point_items');
}