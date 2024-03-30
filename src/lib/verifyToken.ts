import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken"
import "dotenv/config"

export function verifyToken(req:FastifyRequest, res: FastifyReply, next: any){
    const barearToken = req.headers["authorization"]

    if(!barearToken){
        return res.status(400).send({message: "Missing token"});
    }

    const token = barearToken.split(" ")[1]

    if(!token){
        return res.status(400).send({message: "Missing token"});
    }


    try {
        const tokenSecrete = process.env.SECRETE_JWT;
        if(!tokenSecrete){
            return -1
        }
        const decoded = jwt.verify(token, tokenSecrete);
        req.user = decoded;

        next()
    } catch (error) {
        if(error){
            console.error(error);
            return res.status(500).send({message: "Invalid Token"})
        }
    }
}