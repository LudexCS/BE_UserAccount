import express, { Express } from 'express';
// e.g.,
// import loginRoutes from './routes/loginRoutes';

const app : Express = express();
app.use(express.json());

// e.g.,
// app.use('/api/login', loginRoutes);

export default app;