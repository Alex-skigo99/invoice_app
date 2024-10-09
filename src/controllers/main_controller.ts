import { Request, Response } from "express";
    
export const mainController = {
    hello: (req: Request, res: Response) => {res.status(200).json({ message: 'Hello from My API!' })},
};
