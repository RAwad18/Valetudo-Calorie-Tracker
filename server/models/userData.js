import mongoose, { Schema } from "mongoose";

const validatorFn = (value) => {
    if (value === 'N/A' || typeof value === 'number')
        return true
    else
        return false
}

const userDataSchema = new mongoose.Schema({
    calorieGoal: {
        type: Schema.Types.Mixed,
        required: [true, 'Error! No Calorie Goal provided!'],
        validate: {
            validator: validatorFn,
            message: props => `${props.value} is not a valid for this type`
        }
    },
    proteinGoal: {
        type: Schema.Types.Mixed,
        required: [true, 'Error! No Protein Goal provided!'],
        validate: {
            validator: validatorFn,
            message: props => `${props.value} is not a valid for this type`
        }
    },
    netCarbsGoal: {
        type: Schema.Types.Mixed,
        required: [true, 'Error! No Net Carbs Goal provided!'],
        validate: {
            validator: validatorFn,
            message: props => `${props.value} is not a valid for this type`
        }
    },
    fatGoal: {
        type: Schema.Types.Mixed,
        required: [true, 'Error! No Fat Goal provided!'],
        validate: {
            validator: validatorFn,
            message: props => `${props.value} is not a valid for this type`
        }
    },
    
});

const UserData = mongoose.model('UserData', userDataSchema);

export default UserData;