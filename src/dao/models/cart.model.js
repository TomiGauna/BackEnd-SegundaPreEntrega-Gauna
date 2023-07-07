import mongoose from "mongoose";

const cartsCollection = 'Carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Products",
              required: true
            },
            quantity: {
              type: Number,
              default: 0,
              min: 0
            }      
          }
        ],
        default: []
    }
});

cartSchema.pre('findOne', function() {
  this.populate('products.productId');
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel