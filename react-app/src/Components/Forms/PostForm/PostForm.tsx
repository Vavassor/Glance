import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { Button } from "Components/Button";
import { FieldError } from "Components/FieldError";
import { TextArea } from "Components/TextArea";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createId } from "Utilities/HtmlIdAttribute";
import * as yup from "yup";

export interface PostFormData {
  content: string;
}

export interface PostFormProps {
  className?: string;
  onSubmit: (data: PostFormData) => void;
}

const schema = yup.object().shape({
  content: yup.string().required().trim(),
});

export const PostForm: React.FC<PostFormProps> = ({ className, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();

  const contentFieldId = "content";
  const contentErrorId = createId(contentFieldId, "error");

  return (
    <form
      className={clsx("flex flex-col gap-3", className)}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <TextArea
          errorId={!!errors.content ? contentErrorId : undefined}
          hasError={!!errors.content}
          id={contentFieldId}
          isRequired={true}
          label={t("post_form.content_field_label")}
          name="content"
          textareaProps={{ ...register("content") }}
        />
        <FieldError className="py-1" id={contentErrorId}>
          {errors.content?.message}
        </FieldError>
      </div>
      <Button type="submit">{t("post_form.post_button_label")}</Button>
    </form>
  );
};
