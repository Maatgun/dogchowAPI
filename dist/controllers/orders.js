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
exports.createOrder = exports.getOrders = void 0;
const orders_1 = __importDefault(require("../models/orders"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orders_1.default.find();
        res.json({ data: orders });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error al obtener las órdenes' });
    }
});
exports.getOrders = getOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const newOrder = yield orders_1.default.create(orderData);
        res.json({ data: newOrder });
        const updateOrders = yield orders_1.default.find();
        res.json({ data: updateOrders });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error al crear la orden' });
    }
});
exports.createOrder = createOrder;
