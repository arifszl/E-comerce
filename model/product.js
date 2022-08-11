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
})


module.exports = mongoose.model("Product", productSchema)