import express from 'express';
import {AccountController} from "@modules/api/v1/controllers";

export const AccountRoutes = express.Router();

AccountRoutes.options("/*", function(req, res){
    res.header('Access-Control-Allow-Origin', '*'); // dev
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, X-Requested-With');
    res.send(200);
});

// Account CRUD
AccountRoutes
    .put('/account', AccountController.createAccount)
    .get('/account/:id', AccountController.requestAccount)
    .get('/account', AccountController.requestAccountList)
    .patch('/account/:id', AccountController.updateAccount)
    .delete('/account/:id', AccountController.deleteAccount);

// Account Data
AccountRoutes
    .get('/account/:id/conversations', AccountController.getConversations);
