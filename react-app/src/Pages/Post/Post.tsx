import { Alert } from "Components/Alert";
import { PostForm, PostFormData } from "Components/Forms/PostForm";
import { Header } from "Components/Header";
import { useAccessToken } from "Hooks/useAccessToken";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { PostSpec } from "Types/Domain";
import { RoutePath } from "Types/RoutePath";
import { createPost } from "Utilities/Api";

export const Post: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const { getRefreshedAccessToken } = useAccessToken();
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = async (data: PostFormData) => {
    try {
      const { content } = data;
      const spec: PostSpec = {
        content,
      };
      const accessToken = await getRefreshedAccessToken();
      await createPost(accessToken.accessToken, spec);
      history.push(RoutePath.Home);
    } catch (error) {
      setHasError(true);
    }
  };

  return (
    <>
      <Header />
      {hasError && <Alert>{t("post_page.connection_error")}</Alert>}
      <PostForm className="m-auto max-w-sm py-8" onSubmit={handleSubmit} />
    </>
  );
};
