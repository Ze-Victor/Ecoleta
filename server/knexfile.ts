//Faz conexões que o arquivo connections não faz

//Não consegue funcionar com o export default
import path from 'path';

module.exports = {

    client: 'sqlite3',
    connection: {
        //vai em src na pasta database para achar o arquivo sqlite
        filename: path.resolve(__dirname, 'src', 'database' ,'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations') 
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds') 
    },
    useNullAsDefault: true,
};