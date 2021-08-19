import { join } from "path";
import { config } from "./Config";
import { fileExists, readTextFile } from "./Filesystem";

interface EmailTemplates {
  htmlTemplate: string;
  textTemplate: string;
}

export const getEmailTemplates = async (
  templateName: string,
  language: string,
  defaultLanguage: string
) => {
  const { fileRoot } = config;

  const localeFolder = language;
  let templateFolder = join(fileRoot, "Assets/Email Templates", localeFolder);
  const hasTemplatesForLanguage = await fileExists(templateFolder);
  if (!hasTemplatesForLanguage) {
    templateFolder = join(fileRoot, "Assets/Email Templates", defaultLanguage);
  }

  const htmlTemplate = await readTextFile(
    join(templateFolder, `${templateName}.html.template`)
  );
  const textTemplate = await readTextFile(
    join(templateFolder, `${templateName}.txt.template`)
  );

  const templates: EmailTemplates = {
    htmlTemplate,
    textTemplate,
  };
  return templates;
};
