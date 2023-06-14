import mongoose from "mongoose";
import CalObj from "../models/calObj.js";
import DataArray from "../models/dataArray.js";

// Isn't really being used...since getAll is responding with full data for each calobj
export const getOne = async (req, res) => {
    const { id } = req.query;

    try {
        const obj = await CalObj.findById(id).exec()
        res.status(200).json(obj);  // response is just the object
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getAll = async (req, res) => {
    const { date } = req.query;

    try {
        if (!await DataArray.exists({ date: date }))
            res.status(404).json(`No objects with the date of ${date} exist`)
        else {
            const list = await DataArray.findOne({ date: date }).populate('data').exec();
            res.status(200).json(list.data)
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const addOne = async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const newCalObj = new CalObj(data);

    try {
        if (await DataArray.exists({ date: newCalObj.date })) {
            const list = await DataArray.findOne({ date: newCalObj.date });
            list.data.push(newCalObj._id);
            await list.save();
        }
        else {
            const list = new DataArray({ date: newCalObj.date, data: [newCalObj._id] });
            await list.save();
        }
        await newCalObj.save();
        res.status(201).json(newCalObj);
    } catch (error) {
        res.status(409).send({ message: error.message });
    }
}


export const updateOne = async (req, res) => {

    const { id, data } = req.body;
    const update = JSON.parse(data);
    const filter = { _id: id };

    try {
        const obj = await CalObj.findOneAndUpdate(filter, update, { new: true }).exec();

        res.status(200).json(obj);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateAll = async (req, res) => {
    const data = req.body;
    const date = data[0].date;
    const update = data.map(object => mongoose.Types.ObjectId(object._id));
    
    try {
        const list = await DataArray.findOne({date: date}).exec();
        list.data = update;
        await list.save();
        res.status(200).json(list);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteOne = async (req, res) => {

    const { id } = req.body;

    try {
        const obj = await CalObj.findByIdAndDelete(id);
        res.status(200).send(obj);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

export const deleteAll = async (req, res) => {
    const { date } = req.body;
    const filter = { date: date }
    try {
        await DataArray.deleteOne(filter)
        await CalObj.deleteMany(filter)
        res.status(204)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}


// FOR TESTING PURPOSES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// export const updateOne = async (req, res) => {

//     const test = [
//         {
//             "_id": "64837c63eef16b3a04fb097c",
//             "objType": "activity",
//             "date": "06/08/2023",
//             "name": "Working on Project",
//             "calories": -50,
//             "amount": 250,
//             "unit": "minutes",
//             "__v": 0
//         },
//         {
//             "_id": "64837c5eeef16b3a04fb0977",
//             "objType": "food",
//             "date": "06/08/2023",
//             "name": "Salmon",
//             "calories": 400,
//             "amount": 200,
//             "unit": "g",
//             "protein": 57,
//             "carbs": 5,
//             "fat": 10,
//             "__v": 0
//         }
//     ]
//     const dataInJSON = JSON.stringify(test);

//     try {
//         res.status(200).json(dataInJSON);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }