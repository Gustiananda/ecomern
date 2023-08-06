import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div class="list-group-item">
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            class="list-group-item list-group-item-action"
          >
            <h6>Profile</h6>
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            class="list-group-item list-group-item-action"
          >
            <h6>Orders</h6>
          </NavLink>
          <NavLink
            to="/dashboard/user/create-order"
            class="list-group-item list-group-item-action"
          >
            <h6>Order</h6>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
