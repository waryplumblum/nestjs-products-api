import { Schema } from "mongoose";

export const CategorySchema = new Schema({
    nameCategory: {type:String, required:true},
    descCategory: String
});