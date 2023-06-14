import mongoose from 'mongoose';

const activitySchema = mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String,  required: true },
    type: { type: String, enum: ['activity'], lowercase: true, required: true},
    calories: { type: Number, required: true },
    duration: { type: Number, required: true}
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;