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
    },
    userPhoneNo: { type: String },
    shippingDetail: [{
        customerName: { type: String },
        customerPhoneNo: { type: Number },
        customerAdr: { type: String }
    }]


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

        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== product._id.toString();
        });
        this.cart.items = updatedCartItems;
        return this.save();
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
userSchema.methods.removeFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.addAddress = function(adr, name, phone) {
    const updatedshippingDetail = [...this.shippingDetail];
    updatedshippingDetail.push({
        customerName: name,
        customerPhoneNo: phone,
        customerAdr: adr
    })
    this.shippingDetail = updatedshippingDetail;
    return this.save();
}
userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
}


module.exports = mongoose.model("User", userSchema)