import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,                       //
      ref: "user",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,                   //✅ store URL or base64 string
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const message = mongoose.model("message", messageSchema);
export default message;
