import { Elysia } from "elysia";
import { router } from "../router/router";
import { cors } from "@elysiajs/cors"
const currentPort = process.env.PORT || 3000;
const app = new Elysia()
app.use(cors({
  origin: "*",
  methods: ["POST", "GET", "DELETE", "PUT"]
}))
app.use(router);

app.listen({
  port: currentPort,
  hostname: "0.0.0.0",
}, ()=>{
  console.log(`WEB LINK: http://localhost:${currentPort}/`);
})
