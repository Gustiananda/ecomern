import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            class="list-group-item "
          >
            Create Category
          </NavLink>
          <NavLink to="/dashboard/admin/create-product" class="list-group-item">
            Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/products" class="list-group-item">
            Products
          </NavLink>
          <NavLink to="/dashboard/admin/orders" class="list-group-item ">
            Orders
          </NavLink>
          <NavLink to="/dashboard/admin/users" class="list-group-item ">
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
