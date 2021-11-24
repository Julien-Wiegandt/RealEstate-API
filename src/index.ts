/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { usersRouter } from "./users/users.router";
import { housingsRouter } from "./housings/housings.router";
import { initDatabase } from "./db/index";

dotenv.config();

/**
 * App Variables
 */
if (
  !process.env.PORT &&
  !process.env.DB_USER &&
  !process.env.DB_HOST &&
  !process.env.DB_NAME &&
  !process.env.DB_PASS &&
  !process.env.JWT_KEY
) {
  console.error("Some env variables missing");
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 *  App Configuration
 */

initDatabase();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/housings", housingsRouter);

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});