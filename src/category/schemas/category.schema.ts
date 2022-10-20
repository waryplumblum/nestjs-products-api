/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    nameCategory: {type:String, required:true},
    descCategory: String
});

//exports = mongoose.model("Category",CategorySchema);