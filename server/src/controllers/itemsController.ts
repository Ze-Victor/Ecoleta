import {Request, Response} from 'express';
import knex from '../database/connection';

class itemsController {
    async index(request: Request, response: Response){
        //pegando tudo da tabela items
        const items = await knex('items').select('*');
    
        //A função map vai percorrer todo o items (tipo o for earch) e vai retornar em cada um
        //deles o formato que eu desejo. (usando as informações deles individualmente).
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`,
            };
        });
    
        return response.json(serializedItems);
    }
};

export default itemsController;