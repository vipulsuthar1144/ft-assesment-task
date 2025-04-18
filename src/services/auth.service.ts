import { baseInstance } from "@config/axios/axios.config";
import { IRequestSignInSchema } from "@schemas/signin.schema";
import { ApiEndpoints } from "@utils/api-constant";

export const AuthService = {
  signIn: async (payload: IRequestSignInSchema, signal: AbortSignal) => {
    return await baseInstance.post(`${ApiEndpoints.login}`, payload, {
      signal,
    });
  },
};
