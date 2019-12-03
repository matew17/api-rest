import mongoose, { Schema } from 'mongoose';

/**
 * Create database schema for CommissionType.
*/

const CommissionTypeSchema = new Schema({
    name: {
        type: String,
        required: "name of the commission type is required"
    },
    value: {
        type: Number,
        required: "Value of the commission type is required"
    },
    created: {
        type: Date,
        default: new Date
    }
});

export default mongoose.model('CommissionType', CommissionTypeSchema);
