import { Document } from "mongoose";

export interface Category extends Document{
    readonly nameCategory: string;
    readonly descCategory: string;
}