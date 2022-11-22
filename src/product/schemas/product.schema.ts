/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    description: String,
    imageURL: String,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    categories: {type: mongoose.Schema.Types.ObjectId, ref:"Category"}//,
    //categorys: {type: Schema.Types.ObjectId, ref:"CATEGORY"}
});

//module.exports = mongoose.model('Product',ProductSchema);



/* categories:{
        type:Schema.Types.ObjectId,
        ref:'categories'
    }*/

/*
module.exports = mongoose.model("CATEGORIA",CategorySchema);
 */