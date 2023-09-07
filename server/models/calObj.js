import mongoose from "mongoose";

const PerGramSchema = new mongoose.Schema({
    calories: {
        type: Number,
        required: [true, 'Error! No "Calorie Per Gram" provided!']
    },
    protein: {
        type: Number,
        required: [true, 'Error! No "Protein Per Gram" provided!']
    },
    netCarbs: {
        type: Number,
        required: [true, 'Error! No "Net Carbs Per Gram" provided!']
    },
    fat: {
        type: Number,
        required: [true, 'Error! No "Fat Per Gram" provided!']
    },
});

const AltMeasuresSchema = new mongoose.Schema({
    serving_weight: {
        type: Number,
        required: true
    },
    measure: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        required: false
    },
    qty: {
        type: Number,
        required: true
    },
});

const calObjSchema = mongoose.Schema({
    type: {
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
                    return value <= 0
                else
                    return value >= 0
            },
            message: props => `${props.value} is not a valid for this type`
        }
    },
    protein: { type: Number, required: function () { return this.objType === 'food' } },
    netCarbs: { type: Number, required: function () { return this.objType === 'food' } },
    fat: { type: Number, required: function () { return this.objType === 'food' } },
    perGram: {
        type: PerGramSchema,
        required: function () { return this.objType === 'food' }
    },
    serving_qty: {
        type: Number,
        required: function () { return this.objType === 'food' }
    },
    serving_unit: {
        type: String,
        required: function () { return this.objType === 'food' }
    },
    serving_weight_grams: {
        type: Number,
        required: function () { return this.objType === 'food' }
    },
    alt_measures: {
        type: [AltMeasuresSchema],
        required: function () { return this.objType === 'food' }
    }
});



const CalObj = mongoose.model('CalObj', calObjSchema);

export default CalObj;