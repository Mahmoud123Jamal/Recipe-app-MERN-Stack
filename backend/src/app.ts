import express from "express";
import cors from "cors";
import recipeRoutes from "./routes/recipesRoute";
import authRoutes from "./routes/authRoute";
import path from "path";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.use(cors());
// Routes

app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);

export default app;
