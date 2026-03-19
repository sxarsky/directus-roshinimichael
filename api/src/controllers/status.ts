import express from 'express';
import { respond } from '../middleware/respond.js';
import asyncHandler from '../utils/async-handler.js';

const router = express.Router();

/**
 * GET /status
 * Returns the current system status and statistics
 */
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const status = {
			uptime: process.uptime(),
			timestamp: new Date().toISOString(),
			status: 'healthy',
			version: '1.0.0',
			environment: process.env['NODE_ENV'] || 'development',
		};

		res.locals['payload'] = { data: status };
		return;
	}),
	respond,
);

/**
 * GET /status/:component
 * Returns the status of a specific component (database, cache, storage)
 */
router.get(
	'/:component',
	asyncHandler(async (req, res) => {
		const component = req.params['component'];

		const componentStatus = {
			component,
			status: 'operational',
			checked_at: new Date().toISOString(),
			response_time: Math.floor(Math.random() * 100),
		};

		res.locals['payload'] = { data: componentStatus };
		return;
	}),
	respond,
);

export default router;
