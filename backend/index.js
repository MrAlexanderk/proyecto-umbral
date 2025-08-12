import cors from "cors";
import "dotenv/config";
import express from "express";

import authRoute from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);

app.use((_, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
