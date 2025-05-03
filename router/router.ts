import { Elysia } from "elysia";
import { home } from "../controller/Page";
import { upload } from "../controller/ControllerMain";

export const router = new Elysia()
.use(home)
.use(upload)