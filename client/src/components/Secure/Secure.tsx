import React from "react";

import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router";

const RestrictedRoute = (): JSX.Element => {
  const user = useAppSelector((store) => store.userSlice.user);
  const navigate = useNavigate();

  return <>{user ? navigate("/") : navigate("/auth")}</>;
};

export default RestrictedRoute;
