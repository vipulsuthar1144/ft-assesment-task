import useLocalStorage from "@hooks/useLocalStorage";
import { IRequestSignInSchema } from "@schemas/signin.schema";
import { useAppDispatch, useAppSelector } from "@store/store";
import { AuthAPI } from "@store/thunk-services/auth.thunk";
import { LocalStorageKeys, NavigationRoutes } from "@utils/constant";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isSignInError,isSignInLoading } = useAppSelector((state) => state.auth);
  const [__, setAccessToken] = useLocalStorage(LocalStorageKeys.ACCESS_TOKEN, "");
  const [_, setAdminData] = useLocalStorage(LocalStorageKeys.USER_DATA, {});
  

  const onSubmit = async (data: IRequestSignInSchema) => {
    await dispatch(AuthAPI.signIn({ signInCredentials: data }))
      .unwrap()
      .then((response) => {
        if (response?.accessToken) {
          setAccessToken(response.accessToken);
          setAdminData(response?.data ?? {});
          navigate(NavigationRoutes.BASE, { replace: true });
        }
      });
  };

  return (
    <div>SignIn</div>
  )
}

export default SignIn