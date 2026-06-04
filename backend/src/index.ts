import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { initSchema } from './models/db';
import healthRouter from './routes/health';
import { notFound, errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/health', healthRouter);

// Fallbacks (must be registered after the routes)
app.use(notFound);
app.use(errorHandler);

// Make sure the database + schema exist before we start serving.
initSchema();

app.listen(config.port, () => {
  console.log(
    `[${config.appName}] backend listening on http://localhost:${config.port}`
  );
});
