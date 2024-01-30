import { Router } from "express";
import {
	createOrder,
	deleteOrder,
	getAllFromUser,
	getOneById,
	getOrdersByStatus,
	updateOrder,
} from "../controllers/order";
import jwtValidator from "../middlewares/validarJwt";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { orderValidator } from "../middlewares/orderValidator";
const router = Router();
router.get("/", [jwtValidator, recolectarErrores], getAllFromUser);
router.get("/:ID", [jwtValidator, recolectarErrores], getOneById);
router.get(
	"/status/:STATUS",
	[jwtValidator, recolectarErrores],
	getOrdersByStatus
);
router.post(
	"/",
	[
		jwtValidator,
		check("items", "Debe haber al menos un producto en la orden").isArray({
			min: 1,
		}),
		check("price", "El precio es obligatorio").not().isEmpty(),
		orderValidator,
		recolectarErrores,
	],
	createOrder
);
router.put(
	"/:ID",
	[
		jwtValidator,
		check("items", "Debe haber al menos un producto en la orden").isArray({
			min: 1,
		}),
		check("price", "El precio es obligatorio").not().isEmpty(),
		orderValidator,
		recolectarErrores,
	],
	updateOrder
);
router.delete("/:ID", [jwtValidator, recolectarErrores], deleteOrder);

export default router;