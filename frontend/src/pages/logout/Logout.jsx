import { useEffect } from "react";
// import { selectLoggedInUser, signOutAsync } from '../authSlice';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectLoggedInUser,
  signOutUserAsync,
} from "../../store/auth/authSlice";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutUserAsync());
  });
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
