const { Orders_Info, OrderItem_Info  } = require('../models');
const createOrders_Info = async (req, res) => {
    try {
        const orders_info = await Orders_Info.create(req.body);
        return res.status(201).json({
            orders_info,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders_infos = await Orders_Info.findAll({
            include: [
                {
                    model:  OrderItem_Info

                }
            ]
        });
        return res.status(200).json({ orders_infos });
    } catch (error) {
        return res.status(500).send(error.message);
    }
} 

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const orders_info = await Orders_Info.findOne({
            where: { id: id },
            include: [
                {
                    model: OrderItem_Info
                }
            ]
        });
        if (orders_info) {
            return res.status(200).json({ orders_info });
        }
        return res.status(404).send('Order with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Orders_Info.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedOrder = await Orders_Info.findOne({ where: { id: id } });
            return res.status(200).json({ user: updatedOrder });
        }
        throw new Error('Order not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Orders_Info.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("Order deleted");
        }
        throw new Error("Order not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createOrders_Info,
    getAllOrders,
    getOrderById, 
    updateOrder,
    deleteOrder

}
