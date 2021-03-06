const mongoose = require('mongoose')
const config = require('config')

module.exports = function(){
  const db = config.get('db')
    mongoose.connect(db,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => console.log(`Connect to ${db}...`))
    .catch(err => console.error('Could not connect to MongoDB...'))

}
 