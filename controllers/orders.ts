import { Request, Response } from "express";
import Order, { IOrder } from "../models/order";
import { ObjectId } from "mongoose";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarioId: ObjectId = req.body.usuarioConfirmado._id;
        const consulta = { user: usuarioId };
        const orders = await Order.find(consulta);
        res.json({ data: [...orders] });
    } catch (error) {
        console.error("Error en getOrders:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuario: ObjectId = req.body.usuarioConfirmado._id;
        const orderData: IOrder = req.body;

        // Realiza validaciones adicionales si es necesario

        const data = {
            ...orderData,
            user: usuario,
            createdAt: new Date(),
            status: "pending"
        };

        const order = new Order(data);
        await order.save();

        res.status(201).json({ data: order });
    } catch (error) {
        console.error("Error en createOrder:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
