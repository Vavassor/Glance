import { EMAIL_VERIFICATION_CODE_CHAR_COUNT } from "Constants";
import { body, oneOf, param } from "express-validator";
import { handleValidationError } from "Middleware/ValidationErrorHandling";
import { IdType } from "Types/IdType";
import { RecoveryMethodType } from "Types/RecoveryMethodType";
import { isObjectId, isPassword, isUsername } from "Utilities/Validation";

export const validateCreateAccount = [
  body("account_registration_id").exists().custom(isObjectId),
  body("email_verification_code")
    .exists()
    .isLength({
      max: EMAIL_VERIFICATION_CODE_CHAR_COUNT,
      min: EMAIL_VERIFICATION_CODE_CHAR_COUNT,
    })
    .isInt(),
  handleValidationError,
];

export const validateDeleteAccount = [
  param("id").exists().custom(isObjectId),
  handleValidationError,
];

export const validateGetAccountById = [
  param("id").custom(isObjectId),
  handleValidationError,
];

export const validateIdentifyAccount = [
  oneOf([
    body("query").exists().isEmail(),
    body("query").exists().custom(isUsername),
  ]),
  handleValidationError,
];

export const validateSendPasswordReset = [
  oneOf([
    [body("id.email").isEmail(), body("id.type").equals(IdType.Email)],
    [
      body("id.type").equals(IdType.Username),
      body("id.username").custom(isUsername),
    ],
  ]),
  oneOf([
    [
      body("recovery_method.id").isString(),
      body("recovery_method.type").equals(RecoveryMethodType.Email),
    ],
  ]),
  handleValidationError,
];

export const validateUpdatePassword = [
  body("password").exists().custom(isPassword),
  handleValidationError,
];
