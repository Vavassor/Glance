import { Link } from "Components/Link";
import { LoginForm, LoginFormData } from "Components/LoginForm";
import { useAppDispatch } from "Hooks/ReduxHooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { logIn } from "Slices/AuthSlice";
import { RoutePath } from "Types/RoutePath";
import { exchangePassword } from "Utilities/Api";
import { logError } from "Utilities/Logging";
import { getAccessTokenPayload } from "Utilities/TokenUtilities";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = async (data: LoginFormData) => {
    const accessToken = await exchangePassword(data.username, data.password);
    const accessTokenPayload = getAccessTokenPayload(accessToken.accessToken);
    const accountId = accessTokenPayload?.sub;
    if (!accountId) {
      logError(
        "Failed to log in. The access token did not contain an account ID in the sub claim."
      );
      return;
    }
    dispatch(logIn({ accessToken, id: accountId }));
    history.push(RoutePath.Home);
  };

  return (
    <div className="m-auto max-w-sm px-3">
      <header className="py-4">
        <h1>{t("app.title")}</h1>
      </header>
      <LoginForm onSubmit={handleSubmit} />
      <div className="flex flex-col items-start">
        <Link to={RoutePath.BeginPasswordReset}>
          {t("login.begin_password_reset_link")}
        </Link>
        <Link to={RoutePath.Register}>{t("login.register_link")}</Link>
      </div>
    </div>
  );
};
