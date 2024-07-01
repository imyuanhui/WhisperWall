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
        "https://cdn5.vectorstock.com/i/1000x1000/05/54/seamless-texture-a-cartoon-brick-wall-vector-25670554.jpg",
    },
    tags: {
      type: [String],
      default: ["All"],
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
