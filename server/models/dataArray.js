import mongoose, { Schema } from "mongoose";

const dataArraySchema = mongoose.Schema({
    date: { type: String, required: [true, 'Error! Invalid Date!'] },
    data: {
        type: [{ type: Schema.Types.ObjectId, ref: 'CalObj' }]
    }
})

const DataArray = mongoose.model('DataArray', dataArraySchema);
export default DataArray;