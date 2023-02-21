import { NextFunction, Request, Response } from 'express';
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req:Request, res: Response, next:NextFunction)=>{
  console.log('New request incoming');
  next();
});

app.use((req: any, res: Response, next: NextFunction)=>{
  req.requestTime = new Date().toISOString();
  next();
})


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
