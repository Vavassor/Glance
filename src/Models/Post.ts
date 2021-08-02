import { model, Schema } from "mongoose";
import { PostModel as PostModelType } from "Types/Models";

const PostSchema = new Schema({
  account: {
    ref: "Account",
    required: true,
    type: Schema.Types.ObjectId,
  },
  content: {
    required: true,
    type: Schema.Types.String,
  },
  creation_date: {
    required: true,
    type: Schema.Types.Date,
  },
  title: {
    required: true,
    type: Schema.Types.String,
  },
});

export const PostModel = model<PostModelType>("Post", PostSchema);
