import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from 'express'

export class FirstMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        console.log(`${req.method} at ${req.url} recived `)
        next()
    }
}

// app.use()