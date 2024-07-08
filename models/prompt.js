import mongoose, { Schema, model, models } from 'mongoose';

const promptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required'],
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    which:{
        type: String,
        required: [true, 'Which is required'],
    }
});

const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;
