import { Router } from "express";
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipescControllers";
import { upload } from "../middlewares/uploadMiddleware";
import { protect } from "../middlewares/authMiddleWare";
const router = Router();

router.post("/", upload.single("imageUrl"), protect, createRecipe);
router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", upload.single("imageUrl"), protect, updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
