const mongoose = require("mongoose")

const schema = mongoose.Schema
const userSchema = new schema({
    name: {
        type: String
    },

    email: {
        type: String
    },
    password: {
        type: String
    },

    items: [{
        productId: {
            type: schema.Types.ObjectId,
            ref: "Product"
        },
        qty: {
            type: Number,
            default: 1
        }
    }]



})
module.exports = mongoose.model("User", userSchema)