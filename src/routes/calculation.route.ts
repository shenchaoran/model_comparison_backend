import { Response, Request, NextFunction } from "express";
const MyRouter = require('./base.route');
import { calcuTaskDB } from '../models/calcu-task.model';
import * as CalcuCtrl from '../controllers/calcu-task.controller';

const db = calcuTaskDB;
const defaultRoutes = [
    'findAll',
    // 'insert',
    'remove'
    // 'update'
];
const router = new MyRouter(db, defaultRoutes);
module.exports = router;

// region auth
import { userAuthMid } from '../middlewares/user-auth.middleware';
userAuthMid(router);
// endregion

router.route('/:id')
    .get((req, res, next) => {
        CalcuCtrl.getCalcuTaskDetail(req.params.id)
            .then(doc => {
                res.locals = {
                    resData: doc,
                    template: {},
                    succeed: true
                };
                return next();
            })
            .catch(next);
    });