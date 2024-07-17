import { Router } from "express";
import { getAllUsers, userSignup, userSignin } from "../controllers/user-controller.js";
import { validate, signupValidator, signinValidator } from '../utils/validators.js';
const userRoutes = Router();
userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signupValidator), userSignup);
userRoutes.post('/signin', validate(signinValidator), userSignin);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map