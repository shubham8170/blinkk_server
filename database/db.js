const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
).then(
    console.log('db connected')
    ).catch((e)=>{
    console.error(e);
})