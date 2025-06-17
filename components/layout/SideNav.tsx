import Link from "next/link";
import React from "react";

function SideNav() {
  const links1 = [
    {
      title: "My Events",
      href: "/",
      icon: (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.2727 16.8182V9.04545H8.18182V16.8182H20.2727ZM20.2727 4.72727C20.7308 4.72727 21.1702 4.90925 21.4941 5.23318C21.818 5.55711 22 5.99644 22 6.45455V16.8182C22 17.2763 21.818 17.7156 21.4941 18.0395C21.1702 18.3635 20.7308 18.5455 20.2727 18.5455H8.18182C7.72372 18.5455 7.28438 18.3635 6.96045 18.0395C6.63653 17.7156 6.45455 17.2763 6.45455 16.8182V6.45455C6.45455 5.99644 6.63653 5.55711 6.96045 5.23318C7.28438 4.90925 7.72372 4.72727 8.18182 4.72727H9.04545V3H10.7727V4.72727H17.6818V3H19.4091V4.72727H20.2727ZM4.72727 20.2727H16.8182V22H4.72727C4.26917 22 3.82983 21.818 3.50591 21.4941C3.18198 21.1702 3 20.7308 3 20.2727V9.90909H4.72727V20.2727ZM18.5455 15.0909H15.0909V11.6364H18.5455V15.0909Z"
            fill="#350abc"
          />
        </svg>
      ),
    },
    {
      title: "Payments",
      href: "/payments",
      icon: <></>,
    },
  ];
  const links2 = [];

  return (
    <div>
      <div className="flex flex-col">
        {links1.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="w-[72px] h-[72px] aspect-square flex flex-col items-center justify-center group"
          >
            <div className="group-hover:bg-white p-2 rounded-[10px] stroke-white group-hover:stroke-[#350abc]">
              {link.icon}
            </div>
            <span className="text-center text-xs text-white">
            {link.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
