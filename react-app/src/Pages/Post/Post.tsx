import { PostForm, PostFormData } from "Components/Forms/PostForm";
import { Header } from "Components/Header";
import React from "react";

export const Post: React.FC = () => {
  const handleSubmit = async (data: PostFormData) => {};

  return (
    <>
      <Header />
      <PostForm className="m-auto max-w-sm py-8" onSubmit={handleSubmit} />
    </>
  );
};
