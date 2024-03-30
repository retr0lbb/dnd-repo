import fastify from "fastify";
import userRouter from "./routes/acount"
import caracterRouter from "./routes/caracter";
const app = fastify()


app.register(userRouter)
app.register(caracterRouter)

app.get("/", async(req, res)=> {
    return "hello welcome to our dungeons and dragons api; goto /users/login to logon"
})

app.listen({
    port: 8888
}).then(() => {
    console.log("server runninig")
})