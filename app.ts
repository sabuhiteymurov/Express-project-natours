const fs = require('fs');
const express = require('express');
import { Request, Response } from 'express';

const app = express();

app.use(express.json());


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req: Request, res: Response)=>{
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
};

const getTour = (req: Request, res: Response)=>{
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

const createTour = (req: Request, res: Response)=>{
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

const updateTour = (req: Request, res: Response)=>{
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

const deleteTour = (req: Request, res: Response)=>{
  const id = +req.params.id;
  if(id > tours.length){
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  };
  res.status(204).json({
    status: 'success',
    data: null,
  })
}

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

const port = 4000;
app.listen(port, ()=>{
  console.log(`App running on port ${port}...`);
});
