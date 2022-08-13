const mongoose = require("mongoose")

const Schema = mongoose.Schema


const orderSchema = new Schema({
    products: [{
        productId: {
            type: Schema.Types.ObjectId,

            ref: 'Product'
        },
        qty: { type: Number }
    }],
    user: {

        type: Schema.Types.ObjectId,

        ref: 'User'
    },
    totalPrice: { type: Number },
    shippingDetail: {
        customerName: { type: String },
        customerPhoneNo: { type: Number },
        customerAdr: { type: String }
    }
})
module.exports = mongoose.model("Order", orderSchema)