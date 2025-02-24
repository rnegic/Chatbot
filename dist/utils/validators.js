import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const signinValidator = [
    body("email").trim().isEmail().withMessage('Email is wrong.'),
    body("password").trim().isLength({ min: 6 }).withMessage('Password should contain 6 characters.'),
];
export const signupValidator = [
    body("name").notEmpty().withMessage('Name is required.'),
    ...signinValidator
];
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage('Name is required.'),
];
//# sourceMappingURL=validators.js.map