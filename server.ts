const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE?.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : ''
);

const main = async () => {
  await mongoose.connect(DB, {
    useNewUrlParser: true,
  });
  console.log('DB connection established!');
};

main().catch((err) => console.log(err));

const port = process.env.PORT;

console.log(app.get('env'));
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

export {};
