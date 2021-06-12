import knex from 'knex';
import path from 'path';
const connection = knex({
    client: 'sqlite3',
    connection: {
        //usa o path pra padronizar o caminho do arquivo
        //dirname é uma variavel global e retorna o caminho pra o diretorio do arquivo que esta executando ele
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    //Evite o erro do uso de valores padroes na hora do inserção de dados
    useNullAsDefault: true,
});

export default connection;

//Migrations = Historico de banco de dados
