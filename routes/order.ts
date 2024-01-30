import { Router } from "express";
import { check } from "express-validator";

import validarJWT from "../middlewares/validarJwt";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { isVerified } from "../middlewares/validarVerificado";
import { getOrders, createOrder } from "../controllers/order";

const router = Router();

// Rutas

// Obtener órdenes
router.get("/", [validarJWT, recolectarErrores], getOrders);

// Crear nueva orden
router.post("/", [
    validarJWT,
    isVerified,
    check("price").isNumeric().withMessage("El precio debe ser numérico"),
    check("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
    check("total", "El total es obligatorio").not().isEmpty(),
    check("shippingDetails", "Los detalles de envío son obligatorios").not().isEmpty(),
    check("items", "El array de productos es obligatorio").not().isEmpty(),
    recolectarErrores
], createOrder);

export default router;
