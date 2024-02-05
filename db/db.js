import mongoose, { Schema } from "mongoose";

let instance;

class db {
    constructor() {
        if (instance) {
            throw new Error("New instance cannot be created!!");
        }
        instance = this;
    }

    connect = async() => {
        try {
            let url = 'mongodb://localhost:27017/test';
            let _db = await mongoose.connect(url);
            // _db.set({debug: true})
            return _db
        } catch (e) {
            return e;
        }
    }

}

let dbInstance = Object.freeze(new db());
export default dbInstance;