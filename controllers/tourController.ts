import { NextFunction, Request, Response } from 'express';
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkBody = (req: Request, res: Response, next: NextFunction)=>{
  if(!req.body.name || !req.body.price){
    return res.status(400).json({
      status:  'fail',
      message: 'Missing name or price'
    })
  }
  next();
}

exports.checkId = (req: Request, res: Response, next: NextFunction, val: string)=>{
  const id = +val;
  if(id > tours.length){
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }
  next();
}

exports.getAllTours = (req: any, res: Response)=>{
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
}

exports.getTour = (req: Request, res: Response)=>{
  const id = +req.params.id
  const tour = tours.find((tour:any)=> tour.id === id
  );
  res.status(200).json({
    status: 'success',
    data: tour
  })
}

exports.createTour = (req: Request, res: Response)=>{
  const newId = tours?.at(-1).id + 1;
  const newTour = Object.assign({id: newId}, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), ()=>{
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      }
    })
  })
};

exports.updateTour = (req: Request, res: Response)=>{
  res.status(200).json({
    status: 'success',
    data: {
      tour: "Updated tour",
    }
  })
};

exports.deleteTour = (req: Request, res: Response)=>{
  res.status(204).json({
    status: 'success',
    data: null,
  })
};