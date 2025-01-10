import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
    },
    location: {
        type: String,
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        default: 'available',
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item;