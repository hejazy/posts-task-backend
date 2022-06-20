import setUpSwagger from './swagger.config';

const allowedEnvs = [
  'development', 'stage', 'test'
]

export const allowDevMode  = (app) => {
  if (!allowedEnvs.includes(process.env.NODE_ENV)) {
    return;
  }
  if(!process.env.ALLOWED_DOMAINS) app.enableCors();
  setUpSwagger(app);
};
