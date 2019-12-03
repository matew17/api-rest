import mongoose, { Schema } from 'mongoose';

/**
 * Create database schema for roles.
*/

const RoleSchema = new Schema({
    name: {
        type: String,
        required: "name of the role is required"
    },
    commissionType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommissionType'
    }
});

export default mongoose.model('Role', RoleSchema);
