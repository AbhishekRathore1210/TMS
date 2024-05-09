import express from 'express';
import { register, registerAdmin, loginAdmin } from '../../controllers/userController.mjs';
const userRoute = express.Router();
userRoute.post('/register', register);
userRoute.post('/AdminRegister', registerAdmin);
userRoute.post('/AdminLogin', loginAdmin);
export default userRoute;
//# sourceMappingURL=userRoute.mjs.map