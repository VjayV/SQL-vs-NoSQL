import { Schema } from "mongoose";
import dbInstance from "../db.js";

const friendSchema = {
    id: String,
    name: String
}
const userSchema = new Schema({
    guid: String,
    isActive: Boolean,
    balance: String,
    picture: String,
    age: Number,
    eyeColor: String,
    name: String,
    gender: String,
    company: String,
    email: String,
    phone: String,
    address: String,
    about: String,
    registered: String,
    latitude: Number,
    longitude: Number,
    tags: [],
    friends: [friendSchema],
    greeting: String,
    favoriteFruit: String,
})

// userSchema.index({'friends.name': 'text', name: 'text'});
userSchema.index({favoriteFruit: 'text'});
const db = await dbInstance.connect()
export default db.model("user", userSchema);