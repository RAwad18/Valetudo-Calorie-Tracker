import mongoose from "mongoose";

const calObjSchema = mongoose.Schema({
    objType: {
        type: String,
        required: [true, 'Error! No type!'],
        enum: {
            values: ['food', 'activity'],
            message: `{VALUE} is not a valid type`
        }
    },
    date: { type: String, required: [true, 'Error! Invalid Date!'] },
    name: { type: String, required: [true, 'Error! No name!'] },
    calories: {
        type: Number,
        required: [true, 'Error! No calories!'],
        validate: {
            validator: function (value) {
                if (this.objType === 'activity')
                    return value < 0
                else
                    return value > 0
            },
            message: props => `${props.value} is not a valid for this type`
        }
    },
    // idk whether to make duration a number or a string
    amount: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    // MIGHT change type --- instead of number, it would be string (store 38g instead of just 38)
    protein: { type: Number, required: function () { return this.objType === 'food' } },
    carbs: { type: Number, required: function () { return this.objType === 'food' } },
    fat: { type: Number, required: function () { return this.objType === 'food' } },
    // MIGHT ADD MICRONUTRIENTS
    // MIGHT ADD A PICTURE (apple for food, stick man running for activity) --- the picture gets added via controllers (u get me?)
});

const CalObj = mongoose.model('CalObj', calObjSchema);

export default CalObj;