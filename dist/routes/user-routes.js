import { Router } from "express";
import { getAllUsers, userSignup, userSignin, verifyUser, userLogout } from "../controllers/user-controller.js";
import { validate, signupValidator, signinValidator } from '../utils/validators.js';
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signupValidator), userSignup);
userRoutes.post('/signin', validate(signinValidator), userSignin);
userRoutes.get('/auth-status', verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map