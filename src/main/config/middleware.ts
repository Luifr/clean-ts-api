import { Express, json } from 'express';
import cors from 'cors';

export default (app: Express) => {
	app.use(json());
	app.use(cors());
};
