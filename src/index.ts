import { Elysia } from "elysia";
import { router } from "../router/router";

const currentPort = process.env.PORT || 3000;
const app = new Elysia()

app.use(router);

app.listen(currentPort, () => {
  console.log(`WEB LINK: http://localhost:${currentPort}/`);
});
