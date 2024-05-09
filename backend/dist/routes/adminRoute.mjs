import express from 'express';
import { createOrg } from '../controllers/userController.mjs';
const admin_route = express.Router();
admin_route.post('/createOrg', createOrg);
export default admin_route;
//# sourceMappingURL=adminRoute.mjs.map