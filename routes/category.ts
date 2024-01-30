import { Router } from "express";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getCategoryByCode,
	updateCategory,
} from "../controllers/category";
import jwtValidator from "../middlewares/validarJwt";
import { isAdmin } from "../middlewares/validarRol";

const router = Router();

router.get("/", [], getAllCategories);
router.get("/:CODE", getCategoryByCode);
router.post(
	"/",
	[
		jwtValidator,
		isAdmin,
		check("title", "El título es obligatorio").not().isEmpty(),
		check("title", "El título debe contener entre 3 y 25 caracteres").isLength({
			min: 3,
			max: 25,
		}),
		check("code", "El código es obligatorio").not().isEmpty(),
		recolectarErrores,
	],
	createCategory
);
router.patch(
	"/:CODE",
	[
		jwtValidator,
		isAdmin,
		check("title", "El título es obligatorio").not().isEmpty(),
		check("title", "El título debe contener entre 3 y 25 caracteres").isLength({
			min: 3,
			max: 25,
		}),
		recolectarErrores,
	],
	updateCategory
);

router.delete(
	"/:CODE",
	[jwtValidator, isAdmin, recolectarErrores],
	deleteCategory
);
export default router;