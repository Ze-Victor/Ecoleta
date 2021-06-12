//Quando quer se referir ao tipo é com letra maiuscula
import {Knex} from 'knex';

export async function up(knex: Knex){
    //CRIAR A TABELA
    //primeiro parametro é o nome da tabela
    //segundo parametro é uma função
    //'table' é um parametro pra função e é a referencia pra minha tabela;
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('rua').notNullable();
        table.decimal('numero');
        table.string('city').notNullable();
        table.string('uf',2).notNullable();

    })
}
export async function down(knex: Knex){
    //VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('point');
}