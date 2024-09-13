// netlify/functions/categories.js

require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async function(event, context) {
  try {
    await client.connect();
    const database = client.db('TnkerMarketPlace');
    const collection = database.collection('categories');
    const categories = await collection.find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(categories),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to connect to MongoDB' }),
    };
  } finally {
    await client.close();
  }
};
