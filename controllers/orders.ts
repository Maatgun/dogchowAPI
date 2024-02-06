
import { Request, Response } from 'express';
import Order, { IOrder } from '../models/orders';

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find();
        res.json({data: orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: 'Error al obtener las órdenes'});

    }
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderData: IOrder = req.body;
        const newOrder = await Order.create(orderData);
        res.json({data: newOrder});

        const updateOrders = await Order.find();
        res.json({data: updateOrders});

    } catch (error) {
        console.log(error);
        res.status(500).json({msj: 'Error al crear la orden'});
    }
}