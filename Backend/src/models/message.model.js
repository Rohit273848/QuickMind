import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    sources: [
      {
        title: String,
        url: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);