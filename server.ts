const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const app = require('./app');

const port = process.env.PORT;

console.log(app.get('env'));
app.listen(port, ()=>{
  console.log(`App running on port ${port}...`);
});