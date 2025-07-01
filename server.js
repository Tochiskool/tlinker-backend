import express from 'express';
import data from './data.js';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://tlinker-frontend.vercel.app',
    ],
    credentials: true,
  })
);

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  console.log('Sending product:', product);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  console.log('Sending product:', product);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is working!');
});

const port = process.env.PORT || 5001;
// Catch all errors
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.setHeader('Access-Control-Allow-Origin', '*'); // or restrict to your domain
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.json({ message: err.message || 'Something went wrong' });
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
