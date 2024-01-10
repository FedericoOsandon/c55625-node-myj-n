const { Router } = require('express')
const { orderModel } = require('../../models/orders.model')

const router = Router()
// peperoni 30
// napolitanas 50
router.get('/', async (req, res)=>{
    // const orders = await orderModel.find({})
    const {size} = req.query
    const orders = await orderModel.aggregate([
        {$match: {size}},
        {$group: {_id: "$name", totalQuantity: {$sum: '$quantity'}}},
        {$sort: {totalQuantity: -1}},
        {$group: {_id: 1, orders: {$push: "$$ROOT"}}},
        {$project: {"_id": 0, orders: "$orders"}},
        {$merge: {into: 'reports'}}
    ])
    
    res.send({
        orders
    })
})



module.exports = router
