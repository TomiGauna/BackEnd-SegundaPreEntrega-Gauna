import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const prodsCollection = 'Products';

const prodsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    code: {
        type: Number,
        required: true,
        unique: true
    },

    stock: {
        type: Number,
        required: true
    },

    /* status: {
        type: Boolean
    }, */

    thumbnail: {
        type: Array,
        required: true
    }
})

prodsSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(prodsCollection, prodsSchema);

export default productModel