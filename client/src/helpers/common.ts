import { AUTH_APP_UI_URL } from "../config";

export const handleError = async (response: Response) => {
  if (response.status === 400) {
    throw new Error((await response.json()).error);
  }
}

export const navigateToLogin = () => window.location.replace(AUTH_APP_UI_URL);
