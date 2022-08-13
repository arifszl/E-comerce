const mongoose = require("mongoose")

const schema = mongoose.Schema
const productSchema = new schema({
    productName: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    cateogaries: {
        type: String
    },
    imgurl: {
        type: String
    }
}, { timestamps: true })


module.exports = mongoose.model("Product", productSchema)