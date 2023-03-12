import { NextFunction, Request, Response } from 'express';
const Tour = require('../models/tourModel');

exports.getAllTours = (req: any, res: Response) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req: Request, res: Response) => {
  const id = +req.params.id;
  // const tour = tours.find((tour: any) => tour.id === id);
  res.status(200).json({
    status: 'success',
    // data: tour,
  });
};

exports.createTour = async (req: Request, res: Response) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'fail',
      message: err?.message,
    });
  }
};

exports.updateTour = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour',
    },
  });
};

exports.deleteTour = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
