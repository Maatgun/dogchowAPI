"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarJwt_1 = __importDefault(require("../middlewares/validarJwt"));
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const express_validator_1 = require("express-validator");
const orders_1 = require("../controllers/orders");
const validarVerificado_1 = require("../middlewares/validarVerificado");
const router = (0, express_1.Router)();
router.get("/", [validarJwt_1.default, recolectarErrores_1.recolectarErrores], orders_1.getOrdenes);
router.post("/", [
    validarJwt_1.default,
    validarVerificado_1.isVerified,
    (0, express_validator_1.check)("price", "El precio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("total", "El total es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingDetails", "Los detalles de envío son obligatorios").not().isEmpty(),
    (0, express_validator_1.check)("items", "El array de productos es obligatorio").not().isEmpty(),
    recolectarErrores_1.recolectarErrores
], orders_1.createOrder);
exports.default = router;
