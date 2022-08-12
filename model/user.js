const mongoose = require("mongoose")

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String
    },

    email: {
        type: String
    },
    password: {
        type: String
    },

    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            qty: {
                type: Number,
                default: 1
            }
        }]
    }
    // products: [{
    //     type: schema.Types.ObjectId,
    //     ref: "Product"
    // }]


})

userSchema.methods.addCart = function(product) {
    const productIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString()


    })
    let newQty = 1;
    const updatedCartItems = [...this.cart.items] //spread operator
    if (productIndex >= 0) {
        newQty = this.cart.items[productIndex].qty + 1; //quantity incremented
        updatedCartItems[productIndex].qty = newQty;
    } else {
        updatedCartItems.push({
            productId: product._id,
            qty: newQty
        })
    }
    const updatedCart = {
        items: updatedCartItems
    }
    this.cart = updatedCart
    return this.save()
}

userSchema.methods.removeQty = function(product) {
    const productIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString()


    })
    if (this.cart.items[productIndex].qty - 1 === 0) {
        alert("can not remove further")
    }
    let newQty = 1;
    const updatedCartItems = [...this.cart.items] //spread operator
    if (productIndex >= 0) {
        newQty = this.cart.items[productIndex].qty - 1; //quantity incremented
        updatedCartItems[productIndex].qty = newQty;
    } else {
        updatedCartItems.push({
            productId: product._id,
            qty: newQty
        })
    }
    const updatedCart = {
        items: updatedCartItems
    }
    this.cart = updatedCart
    return this.save()
}


module.exports = mongoose.model("User", userSchema)