
import { IRequestSignInSchema, ISignInSchema } from "@schemas/signin.schema";
import { AuthService } from "@services/auth.service";
import getAsyncThunk from "@store/getAsyncThunk";

export const AuthAPI = {
  signIn: getAsyncThunk<ISignInSchema, { signInCredentials: IRequestSignInSchema }>(
    "AuthAPI/signIn",
    async ({ signInCredentials }, signal) => {
      const result = await AuthService.signIn(signInCredentials, signal);
      if (result.data) return result.data;
      return null;
    }
  ),
};
