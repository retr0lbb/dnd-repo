import fastify from "fastify";

const app = fastify()


app.get("/", async(req, res)=> {
    return "hello, welcome to our api"
})


app.listen({
    port: 8888
}).then(() => {
    console.log("server runninig")
})