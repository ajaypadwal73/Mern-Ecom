var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductCartschema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
})

const ProductCart = new mongoose.model("ProductCart", ProductCartschema);

const OrderSchema = new mongoose.Schema({
    products: [ProductCartschema],
    transaction_id: {},
    amount: {type: Number},
    address: String,
    status: {
        type: String,
        default: "Recieved",
        enum:["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }

}, {timestamps: true});

const Order = new mongoose.model("order", OrderSchema);

module.exports = { Order, ProductCart};