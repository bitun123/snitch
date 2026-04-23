import { register, login, getProfile } from "../service/api";
import { useDispatch } from "react-redux";
import { setUser, setError, setLoading } from "../state/auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async ({
    userName,
    email,
    password,
    phone,
    isSeller,
  }) => {
    try {
      dispatch(setLoading(true));
      const data = await register({
        userName,
        email,
        password,
        phone,
        isSeller,
      });
      dispatch(setUser(data.user));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      dispatch(setLoading(true));
      const data = await login({ email, password });
      dispatch(setUser(data.user));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

const handleGetProfile = async () => {
try {
  dispatch(setLoading(true));
  const data = await getProfile();
  dispatch(setUser(data.user));
  dispatch(setError(null));
} catch (error) {
  dispatch(setError(error.message));
} finally {
  dispatch(setLoading(false));
}
}

  return { handleRegister, handleLogin ,handleGetProfile};
};
