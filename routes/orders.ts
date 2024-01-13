import { Router } from 'express';
import  validarJwt  from '../middlewares/validarJwt';
import { recolectarErrores } from '../middlewares/recolectarErrores';

import { check } from 'express-validator';
import { getOrdenes, createOrder } from '../controllers/orders';
import { isVerified } from '../middlewares/validarVerificado';

const router = Router();

router.get('/', [validarJwt, recolectarErrores], getOrdenes)

router.post('/', [validarJwt, isVerified, check("price", "El precio es obligatorio").not().isEmpty(),
check("shippingCost", "El costo del envío es obligatorio").not().isEmpty(),
check("total", "El total es obligatorio").not().isEmpty(),
check("shippingDetails", "Los detalles de envío son obligatorios").not().isEmpty(),
check("items", "El array de productos es obligatorio").not().isEmpty(),
recolectarErrores
], createOrder)

export default router;