"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidator = void 0;
const product_1 = __importDefault(require("../models/product"));
const orderValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { items, shippingDetails, price } = req.body;
    if (items) {
        items.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield product_1.default.findById(item.product);
            if (!product) {
                res.status(404).json({
                    msg: `Hay un producto de la orden que ya no existe, contacte con el proveedor para solucionarlo`,
                });
                return;
            }
        }));
    }
    if (shippingDetails) {
        const { name, lname, mail, dni, address } = shippingDetails;
        if (!name || !lname || !mail || !dni || !address) {
            res.status(400).json({
                msg: `Asegúrese de haber ingresado todos los campos obligatorios para el envío`,
            });
            return;
        }
        if (address.split(",").length < 3) {
            res.status(400).json({
                msg: `Asegúrese de que la dirección tenga un formato como el siguiente: "Calle Falsa 123, Paraná, Entre Ríos, Argentina, CP3100"`,
            });
            return;
        }
    }
    if (price <= 0) {
        res.status(400).json({
            msg: `El precio de los productos debe ser mayor a 0 (cero)`,
        });
        return;
    }
    next();
});
exports.orderValidator = orderValidator;
