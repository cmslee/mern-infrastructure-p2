const mongoose = require('mongoose');

mongoose.set('strictQuery', true); //this is to suppress the version change error
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});