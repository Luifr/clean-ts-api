import { Router } from 'express';

export default (router: Router) => {
	router.post('/signup', (_req, res) => {
		res.json({ ok: 'ok' });
	});
};
