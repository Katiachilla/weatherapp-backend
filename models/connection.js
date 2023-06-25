const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://katiachilla:d1SCeKuT8o8ajGcE@cluster0.ycy5frs.mongodb.net/weatherapp';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
