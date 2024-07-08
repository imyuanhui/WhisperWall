import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/whisper-wall-294a0.appspot.com/o/1720425753943headerImage_default.jpg?alt=media&token=5170c6a3-afd4-4704-be02-dad77f404c51",
    },
    pseudonym: {
      type: String,
      default: "whisperer",
    },
    tag: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
