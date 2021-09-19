import express from 'express';
import { ThreadsController } from "@modules/api/v1/controllers/threads.controller";

export const ThreadsRoutes = express.Router();

ThreadsRoutes.options("/*", function(req, res){
    res.header('Access-Control-Allow-Origin', '*'); // dev
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, X-Requested-With');
    res.send(200);
});

// Treads CRUD
ThreadsRoutes
    .get('/conversations/:id', ThreadsController.getConversation)
    .delete('/conversations/:id', ThreadsController.deleteConversation);
// Threads DATA
ThreadsRoutes
    .get('/conversations/:id/:sinceMoment',ThreadsController.getThreadMessages)
    .get('/conversations/:id/latest', ThreadsController.getThreadMessages)
