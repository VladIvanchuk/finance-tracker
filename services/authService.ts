import Realm from "realm";

export const appId = "application-0-hcoeu";
export const app = new Realm.App({ id: appId });

export const login = async (email: string, password: string) => {
  try {
    const credentials = Realm.Credentials.emailPassword(email, password);
    const user = await app.logIn(credentials);

    return user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    await app.emailPasswordAuth.registerUser({ email, password });
    return login(email, password);
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const logout = async () => {
  if (app.currentUser) {
    await app.currentUser.logOut();
  }
};
