import mongoose from 'mongoose';

const foodSchema = mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String,  required: true },
    type: { type: String, enum: ['food'], lowercase: true, required: true},
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fat: { type: Number, required: true },
    micros: [{
        name: String,
        amount: Number
    }],
});

const Food = mongoose.model('Food', foodSchema);

export default Food;
