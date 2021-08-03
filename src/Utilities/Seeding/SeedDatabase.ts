import { AccountModel, PostModel } from "Models";

export const seedDatabase = async () => {
  const vavassor = await AccountModel.create({
    email: "dawson.andrew@gmail.com",
    password: "password",
    username: "vavassor",
  });
  const post = await PostModel.create({
    content: "something",
    title: "Untitled",
  });
  post.setAccount(vavassor);
};
