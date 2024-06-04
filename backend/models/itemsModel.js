import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
},{timestamps: true});

const Item = mongoose.model('Item', itemSchema); 

export default Item;