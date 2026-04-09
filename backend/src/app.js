import express from "express";
import morgan from "morgan";
import cookies from "cookie-parser";

/***
 * import routes here
 * e.g.:
 * import authRoutes from "./routes/auth.route.js";
 */
import authRoutes from "./routes/auth.route.js";






//* App configuration */
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookies());

//* Routes */
app.use("/api/auth", authRoutes);

export default app;
