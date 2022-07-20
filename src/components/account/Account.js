import React, { Fragment } from "react";
import { NavLink, Switch, Route, useHistory } from "react-router-dom";
import { useAuth } from "../../components/store/AuthContext";
import Profile from "./Profile";
import OrderHistory from "./OrderHistory";
import ChangePassword from "./ChangePassword";
import "./Account.css";

const Account = ({ useRouteMatch }) => {
  let match = useRouteMatch();
  const history = useHistory();

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/anydrinks/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="d-block d-md-none">
        <div className="accountm__menu mx-4">
          <h5 className="account-title m-0 p-3">Account</h5>
          <div className="accountm-menu-item">
            <NavLink
              to="/anydrinks/profile"
              className="d-flex justify-content-between"
            >
              Profile
              <i className="bi bi-chevron-right"></i>
            </NavLink>
          </div>
          <div className="accountm-menu-item">
            <NavLink
              to="/anydrinks/orderhistory"
              className="d-flex justify-content-between"
            >
              Order History
              <i className="bi bi-chevron-right"></i>
            </NavLink>
          </div>
          <div className="accountm-menu-item">
            <NavLink
              to="/anydrinks/changepassword"
              className="d-flex justify-content-between"
            >
              Change Password
              <i className="bi bi-chevron-right"></i>
            </NavLink>
          </div>
          <div className="accountm-menu-item" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>

      <div className="d-none d-md-block">
        <div className="row me-0">
          <div className="col-md-4 col-lg-3">
            <ul className="nav d-block m-3">
              <li className="account-nav-item">
                <NavLink exact to={`${match.url}`} activeClassName="active">
                  Profile
                </NavLink>
              </li>
              <li className="account-nav-item">
                <NavLink
                  to={`${match.url}/orderhistory`}
                  activeClassName="active"
                >
                  Order History
                </NavLink>
              </li>
              <li className="account-nav-item">
                <NavLink
                  to={`${match.url}/changepassword`}
                  activeClassName="active"
                >
                  Change my password
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-8 col-lg-9">
            <Switch>
              <Route exact path={`${match.path}`}>
                <Profile />
              </Route>
              <Route path={`${match.path}/orderhistory/`}>
                <OrderHistory />
              </Route>
              <Route path={`${match.path}/changepassword/`}>
                <ChangePassword />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Account;
