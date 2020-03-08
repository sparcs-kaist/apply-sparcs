import * as mongoose from 'mongoose';

// Set up MongoDB Options
const connectionUri: string = process.env.MONGO_URI;
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Connect to MongoDB
mongoose.connect(connectionUri, err => {
  if (err) console.error(`Unexpected error: ${err}`);
  else console.log(`Successfully connected to MongoDB.`);
});
