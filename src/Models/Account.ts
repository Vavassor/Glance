import { model, Schema } from "mongoose";
import { AccountModel } from "Types/Models";

const accountSchema = new Schema({
  email: {
    required: true,
    type: Schema.Types.String,
    unique: true,
  },
  password: {
    required: true,
    type: Schema.Types.String,
  },
  username: {
    required: true,
    type: Schema.Types.String,
    unique: true,
  },
});

export const accountModel = model<AccountModel>("Account", accountSchema);
