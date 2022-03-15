import app from '@main/config/app';
import request from 'supertest';

describe('SignupRoutes', () => {
	test('Should return an account on success', async () => {
		const response = await request(app)
			.post('/api/signup')
			.send({
				name: 'any_name',
				email: 'my@email.com',
				password: 'any_password',
				passwordConfirmation: 'any_password',
			});

		expect(response.status).toBe(200);
	});
});
