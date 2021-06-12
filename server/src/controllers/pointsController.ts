import {Request, Response} from 'express';
import knex from '../database/connection';

class pointsController {
    async create(request: Request, response: Response){
        const {
            name,
            email,
            whatsapp,
            rua,
            numero,
            city,
            uf,
            items
    
        } = request.body;
    
        /**Vai servir para quando o body der alguma falha e não consiga executar a primeira
         * query a segunda não executa tbm pois depende da primeira **/
        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            rua,
            numero,
            city,
            uf 
        };
    
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return { 
                item_id,
                point_id,
            }
        });
    
        await trx('point_items').insert(pointItems);

        //Faz realmente a inserção no DB
        trx.commit();
    
        return response.json({
            id: point_id,
            //expred operator = retornar tudo que tem dentro de um objeto (...)
            ...point
        });
    }
    async show(request: Request, response: Response){
        
        /*Isso é uma desestruturação e é o mesmo que: 
            const id = request.params.id 
        Como o nome da variável é o mesmo do atributo que
        to buscando, fica mais elegante usar as chaves   
        */
        const {id} = request.params; 

        //WHERE: Afeta apenas as linhas que satisfazem a condição
        //Primeiro parametro é nome da linha, segundo a variavel do params;
        //first é pra retornar o primeiro que encontrar
        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({message: 'Point not found'})
        }

        //Retorna todos os items que estão relacionados com o ponto que buscamos no {id}
        //O select é só pra retornar apenas o titulo pois não precisamos de tudo
        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('title');

        return response.json({point, items});



    }
    async index(request: Request, response: Response){
        const {city, uf, items} = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        //Selecionar apenas todos os dados da tabela POints e não da tabela que fez join
        .select('points.*');
        

        return response.json(points);
    }
}

export default pointsController;