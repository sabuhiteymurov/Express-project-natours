const fs = require('fs');
const express = require('express');
import { Request, Response } from 'express';

const app = express();

app.use(express.json());

// app.get('/', (req: Request, res: Response)=>{
//   res.status(200).json({message: 'Hello from the server side!', app: 'Natours'});
// });
//
// app.post('/', (req: any, res:any)=>{
//   res.send('You can post to this endpoint...');
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req: Request, res: Response)=>{
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
});

app.post('/api/v1/tours', (req: Request, res: Response)=>{
  console.log(req.body);
  const newId = tours?.at(-1).id + 1;
  const newTour = Object.assign({id: newId}, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), (err:any)=>{
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      }
    })
  })
})

const port = 4000;
app.listen(port, ()=>{
  console.log(`App running on port ${port}...`);
});
