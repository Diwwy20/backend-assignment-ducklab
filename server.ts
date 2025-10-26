import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import memberRoutes from "./routes/memberRoutes.ts";

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/members", memberRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
