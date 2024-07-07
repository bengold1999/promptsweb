import mongoose, { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required"],
    },
    tag: {
        type: String,
        required: [true, "Tag is required"],
    },
    like: {
        type: Number,
        default: 0,
    },
    dislike: {
        type: Number,
        default: 0,
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
});

const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;
