import express from 'express';
import PointsController from './controllers/pointsController';
import ItemsController from './controllers/itemsController';

//Essa funcção Router serve para desacoplar as rotas do arquivo principal do programa
const routes = express.Router();

const pointController = new PointsController;
const itemController = new ItemsController;

routes.get('/items', itemController.index);

routes.post('/points', pointController.create);
routes.get('/points/:id', pointController.show);
routes.get('/points', pointController.index);

//é preciso exportar as rotas para ter acesso a elas no server.
export default routes;