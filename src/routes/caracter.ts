import { FastifyInstance } from "fastify";
import { verifyToken } from "../lib/verifyToken";
import { prisma } from "../lib/prisma";
import {z} from "zod"
import "dotenv/config"

export default async function(app: FastifyInstance) {
    app.get("/caracter/:id", {preHandler: verifyToken} ,async(req, res) => {
        const paramsSchema = z.object({
            id: z.string()
        })
        const {id} = paramsSchema.parse(req.params);
        try {
    
            if(!id){
                return -1
            }
            const caracter = await prisma.caracter.findUnique({
                where: {
                    id: id
                }
            });
            if(!caracter){
                return res.status(404).send({message: "No caracter Founded"});
            }
            return caracter;
        } catch (error) {
            if(error){
                return res.status(500).send({message: "Internal server error"})
            }
        }
    })
    
    app.post("/api/caracter/create", {preHandler: verifyToken}, async(req, res) => {
        const characterSchema = z.object({
            caracter_name: z.string(),
            experience_points: z.number(),
        })
        const {caracter_name, experience_points} = characterSchema.parse(req.body)
    
        const createdChar = await prisma.caracter.create({
            data: {
                caracter_name,
                experience_points,
                playerId: req.user.id
            }
        })
    
        return createdChar
    
    })
}