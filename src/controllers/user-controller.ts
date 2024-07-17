import { NextFunction, Response, Request } from 'express';
import User from '../models/User.js';
import { hash, compare } from 'bcrypt';
import { error } from 'console';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "Success", users });
    }
    catch (error) {

        console.log(error);

        return res.status(400).json({ message: "Error", cause: error.message });
    }
}

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send("User is already registered!");
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        return res.status(201).json({ message: "Success", id: user._id.toString(), password: user.password.toString() });
    }
    catch (error) {

        console.log(error);

        return res.status(400).json({ message: "Error", cause: error.message });
    }
};

export const userSignin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User is not registered");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect password");
        }
        return res.status(200).json({ message: "Signed in!", id: user._id.toString() });
    }
    catch (error) {

        console.log(error);

        return res.status(400).json({ message: "Error", cause: error.message });
    }
};