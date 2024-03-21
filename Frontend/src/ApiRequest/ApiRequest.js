import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settingsSlice";

const BaseURL = `http://localhost:7000/api/v1`;

export async function RegistrationRequest(
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) {
  store.dispatch(ShowLoader());

  const URL = `${BaseURL}/registration`;
  const PostBody = {
    email,
    firstName,
    lastName,
    mobile,
    password,
    photo,
  };

  try {
    const res = await axios.post(URL, PostBody);

    store.dispatch(HideLoader());

    if (res.status === 200) {
      if (res.data.status === "fail") {
        if (res.data.data.keyPattern.email === 1) {
          ErrorToast("Email Already Exists");
          return false;
        } else {
          ErrorToast("Something Went Wrong");
          return false;
        }
      } else {
        SuccessToast("Registration Success");
        return true;
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (err) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
    return false;
  }
}
