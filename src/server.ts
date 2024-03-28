import fastify from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod";
const app = fastify()

//welcome to dnd meps


app.get("/", async(req, res)=> {
    const results = await prisma.player.findMany()

    return res.status(200).send(results)
})

app.post("/user/create", async(req, res) => {
    const userSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        pass: z.string().min(8)
    })
    const {email, name, pass} = userSchema.parse(req.body);

    try {
        const insertedUser = await prisma.player.create({
            data: {
                email, name, pass
            },
        })


        res.status(201).send({message: "Player created with sucess", insertedUser})
    } catch (error) {
        if(error){
            res.status(500).send({message: "Internal server error", error})
            throw error
        }
    }
})

app.listen({
    port: 8888
}).then(() => {
    console.log("server runninig")
})