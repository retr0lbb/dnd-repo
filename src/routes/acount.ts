import {FastifyInstance} from "fastify";
import { prisma } from "../lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import "dotenv/config"

export default async function(app: FastifyInstance) {
    
    app.post("/user/create", async(req, res) => {
        const userSchema = z.object({
            name: z.string(),
            email: z.string().email(),
            pass: z.string().min(8)
        })
        const {email, name, pass} = userSchema.parse(req.body);
    
        const hashedPass = await bcrypt.hash(pass, 12)
    
        try {
            const insertedUser = await prisma.player.create({
                data: {
                    email, name, pass: hashedPass
                },
            })
    
            res.status(201).send({message: "Player created with sucess", insertedUser})
        } catch (error) {
            if(error){
                if(error instanceof PrismaClientKnownRequestError && error.code === "P2002"){
                    res.status(400).send({message: "Duplicated key founded", error})
                }
                res.status(500).send({message: "Internal server error", error})
                throw error
            }
        }
    })
    
    app.post("/user/login", async(req, res)=> {
        const loginSchema = z.object({
            email: z.string().email(),
            password: z.string()
        })
    
        const { email, password } = loginSchema.parse(req.body);
    
    
        const locatedUser = await prisma.player.findUnique({
            where: {
                email: email
            }
        })
    
        if(!locatedUser?.pass){
            return res.status(400).send({message: "User does not provide a password"})
        }
        if(!await bcrypt.compare(password, locatedUser?.pass)){
            return res.status(403).send({message: "Passwords didnt match"})
        }
    
        const tokenSecrete = process.env.SECRETE_JWT
        if(!tokenSecrete){
            return -1;
        }
       const token = jwt.sign(locatedUser, tokenSecrete, {
            expiresIn: "2h"
        })
    
        return res.status(200).send({token})
    })
}