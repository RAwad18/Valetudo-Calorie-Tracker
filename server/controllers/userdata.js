import mongoose from "mongoose";
import UserData from "../models/userData.js";


export const getUserData = async (req, res) => {
    try {
        const [userData] = await UserData.find({});
        res.status(200).json(userData);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

export const createUserData = async (req, res) => {
    const data = req.body;
    try {
        const userData = new UserData(data);
        await userData.save();
        res.status(200).json(userData);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

export const updateUserData = async (req, res) => {
    const data = req.body;
    try {
        const [userData] = await UserData.find({});
        const update = await UserData.findOneAndUpdate({ _id: userData._id }, data, { new: true }).exec();
        res.status(200).json(update);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}