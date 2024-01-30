import { Router } from "express";
import { login, register } from "../controllers/auth";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { existeEmail } from "../helpers/validacionesDB";

const router = Router();

router.post(
	"/register",
	[
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("mail", "El correo electrónico es obligatorio").not().isEmpty(),
		check("mail", "El correo electrónico no es válido").isEmail(),
		check(
			"password",
			"La contraseña debe tener al menos 6 caracteres"
		).isLength({ min: 6 }),
		check("mail").custom(existeEmail),
		recolectarErrores,
	],
	register
);

router.post(
	"/login",
	[
		check("mail", "El correo electrónico no es válido").isEmail(),
		check("mail", "El correo electrónico es obligatorio").not().isEmpty(),
		check(
			"password",
			"La contraseña debe tener al menos 6 caracteres"
		).isLength({ min: 6 }),
		recolectarErrores,
	],
	login
);

export default router;