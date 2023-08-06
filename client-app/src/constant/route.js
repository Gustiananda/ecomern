import { IconType } from "react-icons";
import { AiOutlineBarChart, AiOutlineMedicineBox } from "react-icons/ai";
import { BiBox, BiUserCircle, BiCategoryAlt } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { CgProfile, CgUserList } from "react-icons/cg";
import { FiHome, FiUsers } from "react-icons/fi";
import { GiShoppingCart } from "react-icons/gi";
import { RiDashboardLine } from "react-icons/ri";
import { MdPayment, MdOutlineLocalShipping } from "react-icons/md";
import { TbPhotoSensor } from "react-icons/tb";

const ROUTING_PAGES = {
  admin: [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: FiHome,
      type: "parent",
    },
    {
      label: "Customer",
      href: "/admin/customer",
      icon: BiUserCircle,
      type: "parent",
    },
    {
      label: "Product",
      href: "/admin/produk",
      icon: BiBox,
      type: "parent",
    },
    {
      label: "Tambah Produk",
      href: "/admin/produk/create",
      icon: AiOutlineMedicineBox,
      type: "child",
    },
    {
      label: "Category",
      href: "/admin/create-category",
      icon: BiCategoryAlt,
      type: "parent",
    },
    // {
    //   label: 'Orders',
    //   href: '/admin/orders',
    //   icon: RiDashboardLine,
    //   type: 'parent',
    // },
    {
      label: "Shipping",
      href: "/admin/shipping",
      icon: MdOutlineLocalShipping,
      type: "parent",
    },
    {
      label: "Report",
      href: "/admin/statistik",
      icon: AiOutlineBarChart,
      type: "parent",
    },
    // {
    //   label: 'Profile',
    //   href: '/admin/profile',
    //   icon: CgProfile,
    //   type: 'parent',
    // },
  ],
  user: [
    {
      label: "Dashboard User",
      href: "/user/dashboard",
      icon: FiHome,
      type: "parent",
    },
    {
      label: "Customer",
      href: "/user/customer",
      icon: BiUserCircle,
      type: "parent",
    },
    {
      label: "Payment",
      href: "/user/paymant",
      icon: MdPayment,
      type: "parent",
    },
    {
      label: "Bukti Payment",
      href: "/user/bukti-paymant",
      icon: TbPhotoSensor,
      type: "child",
    },
  ],
};

export { ROUTING_PAGES };
