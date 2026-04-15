import express from "express";
import morgan from "morgan";
import cookies from "cookie-parser";
import { config } from "./config/config.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

/***
 * import routes here
 * e.g.:
 * import authRoutes from "./routes/auth.route.js";
 */
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.routes.js";

//* App configuration */
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookies());

{
  /* Passport configuration */
}

app.use(passport.initialize());

{
  /* Google OAuth Strategy */
}

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (access_token, refresh_token, profile, done) => {
      return done(null, profile);
    },
  ),
);

//* Routes */

//authentication routes
app.use("/api/auth", authRoutes);


//product routes
app.use("/api/products", productRoutes);

export default app;
