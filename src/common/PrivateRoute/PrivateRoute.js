import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUser } from "../../utils/authServices";

function PrivateRoute() {
  const location = useLocation();

  const user = getUser();
  const isLoggedIn = user && user.userToken ? true : false;
  const loginPath = "/login";

  return (
    <>
      {isLoggedIn ? (
        <Outlet />
      ) : (
        <Navigate
          to={{
            pathname: loginPath,
            state: { from: location },
          }}
          replace
        />
      )}
    </>
  );
}

export default PrivateRoute;
