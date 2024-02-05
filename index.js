import fs from 'fs';
import userModel from './db/models/userModel.js';


const findUsers = async () => {
    console.time("find users time start");
    // const res = await userModel.find({$text: {$search: "strawberry"}})
    // const res = await userModel.find({"favoriteFruit": "strawberry"})
    await userModel.find({$or: [{"name": "Coffey"},{"favoriteFruit": "strawberry"}]})
    console.timeLog("find users time end");    
}


const AddUsers = async () => {
    try {
    
        const jsonString = fs.readFileSync("./generated.json");
        const customer = JSON.parse(jsonString);
        console.log('Reading file done. Starting to write in to db', customer.length)
        customer.forEach(async e => {
            const user = new userModel(e);
            await user.save();            
        })
        console.log('Saving to db done')
        const a = await userModel.find({}).count()
        console.log(a)
    } catch (err) {
        console.log(err);
    }
}

const joinUsers = async () => {
    console.time("join start");


    const look = await userModel.aggregate(
        [
            { "$match": { "name": "Coffeey" } },
            {
            $lookup: {
                from: 'users',
                localField: 'name',
                foreignField: 'friends.name',
                as: 'names'
            }
        },
        { "$unwind": "$names" },
        {
            "$group": {
                "_id": null,
                "allTags": { "$addToSet": "$names" },
                "count": { "$sum": 1 }
            }
        }
     ]).exec()
    console.log(look, 'look')



    const pop = await userModel.find({ "name": "Coffey" }).populate("friends.name");
    console.log("pop", pop);    
    console.timeLog("join start");    

    console.timeEnd("join start");
}

export default {
    AddUsers,
    findUsers,
    joinUsers
}