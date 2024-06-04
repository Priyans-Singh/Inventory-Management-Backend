import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Item',
        default: []
    }]
},{timestamps: true});

const Category = mongoose.model('Category', categorySchema);

export default Category;