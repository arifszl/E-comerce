const Order = require("../model/order");
const Product = require("../model/product");
const User = require("../model/user");
const mongoose = require("mongoose");
const path = require('path');

const fs = require('fs');
const PDFDocument = require('pdfkit');

exports.homeController = async(req, res) => { //change only variable(homeController)
    const products = await Product.find();
    // return console.log(products)
    res.render("index", { title: "Home", products: products });
}

exports.contactController = (req, res) => {
    res.render("contact", { title: "Contact" });
}

exports.productDetailController = async(req, res) => {

    const prodId = req.query.pid;
    //   return console.log(prodId)
    Product.findById(prodId)
        .then(product => {
            res.render("productDetail", {
                product: product,
                title: product.productName,
                path: '/products',
                user: req.user
            });
        })
        .catch(err => console.log(err));
}

exports.productListController = async(req, res) => {
    const cat = req.params.cat;
    const products = await Product.find({ cateogaries: cat });
    res.render("productList", { title: "productList", prods: products });
}

exports.servicesController = (req, res) => {
    res.render("services",

        { title: "Services" });
}


exports.postCart = async(req, res) => {


    Product.findById(req.body.productId)
        .then(product => {
            return req.user.addCart(product)
        }).then(result => {
            res.redirect("/cart")
        })
}
exports.getcartController = async(req, res) => {

    User.findOne({ _id: req.user._id }).populate("cart.items.productId")
        .exec((err, u) => {
            if (err) return console.log(err);
            // return console.log(u.cart.items)
            res.render("cart", { title: "cart", user: u })


        })

}
exports.getconfirmedorderController = async(req, res) => { //change only variable(homeController)

    User.findOne({ _id: req.user._id }).populate("cart.items.productId")
        .exec((err, u) => {
            if (err) return console.log(err);
            // return console.log(u.cart.items)
            res.render("confirmorder", { title: "Confirm Order", user: u })


        })
}

exports.getorderController = async(req, res) => { //change only variable(homeController)

    Order.find({ user: req.user._id }).populate("products.productId")
        .exec((err, o) => {
            if (err) return console.log(err);
            // return console.log(u.cart.items)
            res.render("order", { title: "Order", user: req.user, orders: o })


        })
}
exports.gettrackOrderController = async(req, res) => { //change only variable(homeController)
    const oId = req.query.oid

    Order.findById(oId).populate("products.productId")
        .exec((err, o) => {
            if (err) return console.log(err);
            // return console.log(o)
            res.render("trackOrder", { title: "Order Tracking", user: req.user, order: o })


        })
}

exports.postremoveQty = async(req, res) => {


    Product.findById(req.body.productId)
        .then(product => {
            return req.user.removeQty(product)
        }).then(result => {
            res.redirect("/cart")
        })
}
exports.postremoveFromCart = async(req, res) => {


    const prodId = req.body.productId;
    const type = req.body.selecttype;
    req.user
        .removeFromCart(prodId)
        .then(result => {
            if (type === "cart") {
                res.redirect('/cart');
            } else {
                res.redirect('/confirmedorder');
            }

        })
        .catch(err => console.log(err));
}
exports.postcancelorder = async(req, res) => {


    const oId = req.body.oId;
    Order.findByIdAndRemove(oId)
        .then(result => {

            res.redirect('/order');


        })
        .catch(err => console.log(err));
}


exports.postConfirmOrder = async(req, res) => {


    const addressId = req.body.addressId;
    const totalPrice = req.body.totalPrice;

    const address = req.user.shippingDetail.filter(s => s._id.toString() === addressId)
        //  return console.log(address)

    const o = new Order({
        products: req.user.cart.items,
        user: req.user,
        totalPrice: totalPrice,
        shippingDetail: address[0]
    })
    o.save(result => {
        req.user
            .clearCart()
            .then(result => {

                res.redirect('/order');


            })
            .catch(err => console.log(err));
    })

}

exports.postinvoice = async(req, res) => { //change only variable(homeController)
    const orderId = req.body.orderId
    const invoiceName = 'invoice-' + orderId + '.pdf';
    const invoicePath = path.join('data', 'invoices', invoiceName);
    Order.findById(orderId).populate("products.productId")
        .exec((err, order) => {
            //   return console.log(o)
            const pdfDoc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader(
                'Content-Disposition',
                'inline; filename="' + invoiceName + '"'
            );
            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            pdfDoc.pipe(res);

            pdfDoc.fontSize(26).text('Invoice', {
                underline: true
            });
            pdfDoc.text('-----------------------');
            pdfDoc.text('SZL');
            let totalPrice = 0;
            order.products.forEach(prod => {
                // totalPrice += prod.quantity * prod.product.price;
                pdfDoc
                    .fontSize(14)
                    .text(
                        prod.productId.productName +
                        ' - ' +
                        prod.qty +
                        ' x ' +
                        '$' +
                        prod.productId.price
                    );
            });
            pdfDoc.text('---');
            pdfDoc.fontSize(20).text('Total Price: $' + order.totalPrice);

            pdfDoc.end();

            //     let doc = new PDFDocument({ margin: 50 });
            //     res.setHeader('Content-Type', 'application/pdf');
            //     res.setHeader(
            //         'Content-Disposition',
            //         'inline; filename="' + invoiceName + '"'
            //     );

            //     generateHeader(doc);
            //     generateCustomerInformation(doc, order);
            //     generateInvoiceTable(doc, order);
            //     generateFooter(doc);


            //     setTimeout(() => {
            //         doc.end();
            //         doc.pipe(fs.createWriteStream(invoicePath));
            //     }, 3000)
            // })



        })
}

// function generateHeader(doc) {
//     // doc.image('img/logo1.webp', 50, 45, { width: 50 })
//     doc
//         .fillColor('#444444')
//         .fontSize(20)
//         .text('ACME Inc.', 110, 57)
//         .fontSize(10)
//         .text('123 Main Street', 200, 65, { align: 'right' })
//         .text('New York, NY, 10025', 200, 80, { align: 'right' })
//         .moveDown();
// }

// function generateFooter(doc) {
//     doc.fontSize(
//         10,
//     ).text(
//         'Payment is due within 15 days. Thank you for your business.',
//         50,
//         780, { align: 'center', width: 500 },
//     );
// }

// function generateCustomerInformation(doc, invoice) {

//     doc.text(`Invoice Number: ${invoice._id}`, 50, 200)
//         .text(`Invoice Date: ${new Date()}`, 50, 215)
//         .text(`Balance Due: ${invoice.totalPrice}`, 50, 130)

//     .text(invoice.shippingDetail.customerName, 300, 200)
//         .text(invoice.shippingDetail.customerAdr, 300, 215)

//     .moveDown();
// }

// function generateTableRow(doc, y, c1, c2, c3, c4) {
//     doc.fontSize(10)
//         .text(c1, 50, y)
//         .text(c2, 150, y)
//         .text(c3, 280, y, { width: 90, align: 'right' })
//         .text(c4, 370, y, { width: 90, align: 'right' })

// }

// function generateInvoiceTable(doc, invoice) {
//     let i,
//         invoiceTableTop = 330;

//     for (i = 0; i < invoice.products.length; i++) {
//         const item = invoice.products[i];
//         const position = invoiceTableTop + (i + 1) * 30;
//         generateTableRow(
//             doc,
//             position,
//             item.item,
//             item.productId.price / item.qty,
//             item.qty,
//             item.productId.price,
//         );
//     }
// }