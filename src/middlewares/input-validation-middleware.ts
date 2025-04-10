import {body} from 'express-validator'
import {Request, Response, NextFunction} from "express";
import {validationResult, ValidationError} from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array({onlyFirstError: true}).map((error: ValidationError) => ({
            message: error.msg,
            field: 'param' in error ? (error as any).param : 'field'
        }));
        res.status(400).json({ errorsMessages: formattedErrors });
    } else {
        next();
    }
};

export const authorisedCheckValidator = (req: Request, res: Response, next: NextFunction): void => {
    const authHead = req.headers.authorization;
    if (!authHead) {
        res.status(401).send();
    } else {
        const [scheme, encoded] = authHead.split(" ");
        if (scheme !== "Basic" || !encoded) {
            res.status(401).send();
        }
        const decoded = Buffer.from(encoded, 'base64').toString('utf8');
        const [username, password] = decoded.split(":");
        if (username === "admin" && password === "qwerty") {
            return next();
        } else {
            res.status(401).send();
        }
    }
};
export const inputNameBlogValidation = body('name').trim().isLength({min:1, max:15}).withMessage('Name must be from 1 to 15')
export const inputDescriptionValidation = body('description').trim().isLength({min:1, max:500}).withMessage('Description must be from 1 to 500')
export const InputURLValidation = body('websiteUrl').trim().isURL().withMessage('Invalid URL').isLength({min:1, max:100}).withMessage('WebsiteURL must be URL and from 1 to 100')
