import { Request, Response } from 'express';
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

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
  const id = Number(req.params?.id);
  const tour = tours.find((tour:any)=> tour.id === id
  );

  if(!tour) return res.status(404).json({
    status: 'fail',
    message: 'Invalid ID'
  })

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
  const id = +req.params.id;
  if(id > tours.length){
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: "Updated tour",
    }
  })
};

exports.deleteTour = (req: Request, res: Response)=>{
  const id = +req.params.id;
  if(id > tours.length){
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }
  res.status(204).json({
    status: 'success',
    data: null,
  })
};