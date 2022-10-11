import { Schema } from "mongoose";

export const ProductSchema = new Schema({
    name: { type: String, required: true},
    description: String,
    imageURL: String,
    price: Number,
    categories: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
});

/* categories:{
        type:Schema.Types.ObjectId,
        ref:'categories'
    }*/