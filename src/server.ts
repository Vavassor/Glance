import express from "express";
import i18next from "i18next";
import FilesystemBackend from "i18next-fs-backend";
import i18nextHttpMiddleware from "i18next-http-middleware";
import { sequelize } from "Models";
import { join, resolve } from "path";
import { HttpStatus } from "Types/HttpStatus";
import { config, Environment } from "Utilities/Config";
import { logError } from "Utilities/Logging";
import { getErrorAdoFromErrorSingle } from "Utilities/Mapping/Ado";
import { seedDatabase } from "Utilities/Seeding/SeedDatabase";
import { router as routes } from "./Routes";

process.on("uncaughtException", (error) => {
  logError("An uncaught exception occurred.", error);
});

i18next
  .use(FilesystemBackend)
  .use(i18nextHttpMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: join(config.fileRoot, "../locales/{{lng}}/{{ns}}.json"),
    },
    detection: {
      caches: false,
      ignoreCase: false,
      lookupHeader: "accept-language",
    },
    fallbackLng: "en",
    preload: ["en"],
  });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(i18nextHttpMiddleware.handle(i18next));

if (config.environment === Environment.Production) {
  app.use(express.static(resolve(config.fileRoot, "../react-app/build")));
}

app.use(routes);

app.get("*", (request, response) => {
  response.sendFile(
    resolve(config.fileRoot, "../react-app/build", "index.html")
  );
});

app.use((request, response, next) => {
  if (request.accepts("html")) {
    response.status(HttpStatus.NotFound);
    next();
  } else if (request.accepts("json")) {
    response.status(HttpStatus.NotFound).json(
      getErrorAdoFromErrorSingle({
        details: request.t("page_not_found.api_error_details"),
        message: request.t("page_not_found.api_error_message"),
      })
    );
  } else {
    response.status(HttpStatus.NotAcceptable).end();
  }
});

(async () => {
  try {
    await sequelize.sync({ force: config.resetDatabase });
    if (config.resetDatabase) {
      await seedDatabase();
    }
    app.listen(config.port);
  } catch (error) {
    logError("Failed to sync the database.", error);
  }
})();
