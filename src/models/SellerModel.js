import mongoose, { Schema } from 'mongoose';

/**
 * Create database schema for roles.
*/

const SellerSchema = new Schema({
    nit: {
        type: Object,
        required: "Nit of the seller is required"
    },
    name: {
        type: String,
        required: "Name of the seller is required"
    },
    lastname: {
        type: String,
        required: "LastName of the seller is required"
    },
    phone: {
        type: Number,
        required: "Phone of the seller is required"
    },
    address: {
        type: String,
        required: "Address of the seller is required"
    },
    penalty: {
        type: Number,
        required: "Penalty of the seller is required"
    },
    comission: {
        type: Number,
        required: "Comission of the seller is required"
    },
    active: {
        type: Boolean,
        required: "State of the seller is required"
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
});

export default mongoose.model('Seller', SellerSchema);
