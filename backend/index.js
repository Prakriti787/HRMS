import express from 'express';
 
const app = express();
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
