import { useAppSelector } from "@/app/lib/store/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiRequest } from "@/app/lib/services";
import { clearAuth, selectAuth } from "@/app/lib/store/features/authSlice";
import { setEmpty as setAuthEmpty } from "@/app/lib/store/features/authSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";
import { setEventsEmpty } from "@/app/lib/store/features/eventSlice";
import Cookies from "js-cookie";
import { BsCreditCard } from "react-icons/bs";

function SideNav() {
  const { auth: storedData } = useAppSelector(selectAuth);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null); // Set initial state to null
  const [loading, setLoading] = React.useState(true); // New loading state
  const dispatch = useDispatch();
  const [logoutPath, setLogoutPath] = React.useState("/"); // New loading state
  const [isClient, setIsClient] = React.useState(false);

  const handleLogout = async () => {
    await apiRequest("/logout", {
      method: "POST",
      headers: {
        revalidate: true,
        ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
      },
      body: {},
    }).then((res: any) => {
      console.log(res);
      // ✅ Clear Redux Authentication & Data States
      dispatch(clearAuth());
      dispatch(setStaffEmpty());
      dispatch(setBookingEmpty());
      dispatch(setJobEmpty());
      dispatch(setAuthEmpty());
      dispatch(setEventsEmpty());

      // ✅ Remove Authentication Cookies
      Cookies.remove("token");
      Cookies.remove("authToken");
      Cookies.remove("authData");

      // ✅ Redirect Based on Role
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/logout?status=200`);
    });
  };

  const links1 = [
    {
      title: "My Events",
      href: "/",
      active: false,
      disabled: false,
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
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      title: "Payments",
      href: "/payments",
      active: false,
      disabled: false,
      icon: (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 4.5H9.257C9.6511 4.49995 10.0414 4.57756 10.4055 4.72838C10.7696 4.8792 11.1004 5.10029 11.379 5.379L14.5 8.5M5.5 13.5H2.5M9 7.5L11 9.5C11.1313 9.63132 11.2355 9.78722 11.3066 9.9588C11.3776 10.1304 11.4142 10.3143 11.4142 10.5C11.4142 10.6857 11.3776 10.8696 11.3066 11.0412C11.2355 11.2128 11.1313 11.3687 11 11.5C10.8687 11.6313 10.7128 11.7355 10.5412 11.8066C10.3696 11.8776 10.1857 11.9142 10 11.9142C9.81428 11.9142 9.63038 11.8776 9.4588 11.8066C9.28722 11.7355 9.13132 11.6313 9 11.5L7.5 10C6.64 10.86 5.277 10.957 4.303 10.227L4 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 11V15.5C5.5 17.386 5.5 18.328 6.086 18.914C6.672 19.5 7.614 19.5 9.5 19.5H18.5C20.386 19.5 21.328 19.5 21.914 18.914C22.5 18.328 22.5 17.386 22.5 15.5V12.5C22.5 10.614 22.5 9.672 21.914 9.086C21.328 8.5 20.386 8.5 18.5 8.5H10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.75 14C15.75 14.4641 15.5656 14.9092 15.2374 15.2374C14.9092 15.5656 14.4641 15.75 14 15.75C13.5359 15.75 13.0908 15.5656 12.7626 15.2374C12.4344 14.9092 12.25 14.4641 12.25 14C12.25 13.5359 12.4344 13.0908 12.7626 12.7626C13.0908 12.4344 13.5359 12.25 14 12.25C14.4641 12.25 14.9092 12.4344 15.2374 12.7626C15.5656 13.0908 15.75 13.5359 15.75 14Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Settlements",
      href: "/settlements",
      active: false,
      disabled: false,
      icon: (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.75 5H6.25C5.55964 5 5 5.55964 5 6.25V18.75C5 19.4404 5.55964 20 6.25 20H18.75C19.4404 20 20 19.4404 20 18.75V6.25C20 5.55964 19.4404 5 18.75 5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.4987 11.8753C12.775 11.8753 13.0399 11.7656 13.2353 11.5702C13.4306 11.3749 13.5404 11.1099 13.5404 10.8337C13.5404 10.5574 13.4306 10.2924 13.2353 10.0971C13.0399 9.90174 12.775 9.79199 12.4987 9.79199C12.2224 9.79199 11.9575 9.90174 11.7621 10.0971C11.5668 10.2924 11.457 10.5574 11.457 10.8337C11.457 11.1099 11.5668 11.3749 11.7621 11.5702C11.9575 11.7656 12.2224 11.8753 12.4987 11.8753ZM12.4987 15.2087C12.775 15.2087 13.0399 15.0989 13.2353 14.9036C13.4306 14.7082 13.5404 14.4433 13.5404 14.167C13.5404 13.8907 13.4306 13.6258 13.2353 13.4304C13.0399 13.2351 12.775 13.1253 12.4987 13.1253C12.2224 13.1253 11.9575 13.2351 11.7621 13.4304C11.5668 13.6258 11.457 13.8907 11.457 14.167C11.457 14.4433 11.5668 14.7082 11.7621 14.9036C11.9575 15.0989 12.2224 15.2087 12.4987 15.2087Z"
            fill="currentColor"
          />
          <path
            d="M8.95703 9.58301V15.4163M16.0404 9.58301V15.4163"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Messages",
      href: "/messages",
      active: false,
      disabled: true,
      icon: (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5 15V17C14.5 17.2652 14.3946 17.5196 14.2071 17.7071C14.0196 17.8946 13.7652 18 13.5 18H6.5L3.5 21V11C3.5 10.7348 3.60536 10.4804 3.79289 10.2929C3.98043 10.1054 4.23478 10 4.5 10H6.5M21.5 14L18.5 11H11.5C11.2348 11 10.9804 10.8946 10.7929 10.7071C10.6054 10.5196 10.5 10.2652 10.5 10V4C10.5 3.73478 10.6054 3.48043 10.7929 3.29289C10.9804 3.10536 11.2348 3 11.5 3H20.5C20.7652 3 21.0196 3.10536 21.2071 3.29289C21.3946 3.48043 21.5 3.73478 21.5 4V14Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Reviews",
      href: "/reviews",
      active: false,
      disabled: true,
      icon: (
        <svg
          width="27"
          height="28"
          viewBox="0 0 27 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 7.84375L14.934 10.5368L18 10.9688L15.75 12.9347L16.5 15.8438L13.5 14.2074L10.5 15.8438L11.25 12.9347L9 10.9688L12.15 10.5368L13.5 7.84375Z"
            fill="currentColor"
          />
          <path
            d="M14.802 24.8438L13.5 24.0745L16.5 18.6899H21C21.1971 18.6902 21.3923 18.6506 21.5744 18.5734C21.7565 18.4962 21.922 18.3829 22.0613 18.24C22.2007 18.0971 22.3111 17.9273 22.3864 17.7405C22.4617 17.5538 22.5003 17.3536 22.5 17.1514V7.92067C22.5003 7.71855 22.4617 7.51836 22.3864 7.33157C22.3111 7.14478 22.2007 6.97506 22.0613 6.83214C21.922 6.68922 21.7565 6.57591 21.5744 6.4987C21.3923 6.42149 21.1971 6.38191 21 6.38221H6C5.80293 6.38191 5.60775 6.42149 5.42562 6.4987C5.2435 6.57591 5.07803 6.68922 4.93868 6.83214C4.79933 6.97506 4.68885 7.14478 4.61358 7.33157C4.5383 7.51836 4.4997 7.71855 4.5 7.92067V17.1514C4.4997 17.3536 4.5383 17.5538 4.61358 17.7405C4.68885 17.9273 4.79933 18.0971 4.93868 18.24C5.07803 18.3829 5.2435 18.4962 5.42562 18.5734C5.60775 18.6506 5.80293 18.6902 6 18.6899H12.75V20.2284H6C5.20435 20.2284 4.44129 19.9042 3.87868 19.3272C3.31607 18.7501 3 17.9675 3 17.1514V7.92067C3 7.10462 3.31607 6.32199 3.87868 5.74496C4.44129 5.16792 5.20435 4.84375 6 4.84375H21C21.7956 4.84375 22.5587 5.16792 23.1213 5.74496C23.6839 6.32199 24 7.10462 24 7.92067V17.1514C24 17.9675 23.6839 18.7501 23.1213 19.3272C22.5587 19.9042 21.7956 20.2284 21 20.2284H17.3738L14.802 24.8438Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];
  const links2 = [
    {
      title: "Settings",
      href: "/settings",
      active: false,
      disabled: false,
      icon: (
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_11889_161591)">
            <path
              d="M9.62716 11.2514C10.8537 11.2514 11.8481 10.2571 11.8481 9.03048C11.8481 7.80391 10.8537 6.80957 9.62716 6.80957C8.40059 6.80957 7.40625 7.80391 7.40625 9.03048C7.40625 10.2571 8.40059 11.2514 9.62716 11.2514Z"
              stroke="currentColor"
              strokeWidth="1.11046"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.106 11.251C15.0074 11.4743 14.978 11.722 15.0216 11.9621C15.0651 12.2023 15.1796 12.4239 15.3503 12.5983L15.3947 12.6427C15.5324 12.7803 15.6416 12.9436 15.7161 13.1233C15.7906 13.303 15.8289 13.4957 15.8289 13.6903C15.8289 13.8849 15.7906 14.0775 15.7161 14.2573C15.6416 14.437 15.5324 14.6003 15.3947 14.7378C15.2572 14.8755 15.0939 14.9847 14.9141 15.0592C14.7344 15.1337 14.5417 15.1721 14.3472 15.1721C14.1526 15.1721 13.9599 15.1337 13.7802 15.0592C13.6004 14.9847 13.4371 14.8755 13.2996 14.7378L13.2552 14.6934C13.0807 14.5227 12.8591 14.4082 12.619 14.3647C12.3788 14.3211 12.1311 14.3505 11.9079 14.4491C11.6889 14.5429 11.5022 14.6988 11.3706 14.8974C11.2391 15.096 11.1685 15.3287 11.1676 15.567V15.6928C11.1676 16.0855 11.0116 16.4621 10.7339 16.7398C10.4562 17.0174 10.0796 17.1734 9.68695 17.1734C9.29426 17.1734 8.91767 17.0174 8.64 16.7398C8.36233 16.4621 8.20634 16.0855 8.20634 15.6928V15.6262C8.20061 15.3811 8.12129 15.1435 7.9787 14.9441C7.83611 14.7448 7.63685 14.5929 7.40681 14.5083C7.18352 14.4098 6.93583 14.3804 6.69568 14.4239C6.45553 14.4675 6.23393 14.5819 6.05945 14.7526L6.01504 14.797C5.87753 14.9347 5.71423 15.0439 5.53449 15.1184C5.35475 15.1929 5.16208 15.2313 4.96751 15.2313C4.77293 15.2313 4.58026 15.1929 4.40052 15.1184C4.22078 15.0439 4.05748 14.9347 3.91998 14.797C3.78231 14.6595 3.67311 14.4962 3.5986 14.3165C3.52408 14.1367 3.48573 13.9441 3.48573 13.7495C3.48573 13.5549 3.52408 13.3623 3.5986 13.1825C3.67311 13.0028 3.78231 12.8395 3.91998 12.702L3.96439 12.6576C4.13506 12.4831 4.24955 12.2615 4.29309 12.0213C4.33664 11.7812 4.30724 11.5335 4.20869 11.3102C4.11485 11.0912 3.95903 10.9045 3.76041 10.773C3.5618 10.6414 3.32906 10.5708 3.09084 10.5699H2.96498C2.5723 10.5699 2.1957 10.4139 1.91804 10.1362C1.64037 9.85857 1.48438 9.48197 1.48438 9.08929C1.48438 8.69661 1.64037 8.32001 1.91804 8.04234C2.1957 7.76467 2.5723 7.60868 2.96498 7.60868H3.03161C3.27665 7.60295 3.51429 7.52363 3.71365 7.38104C3.91301 7.23846 4.06486 7.03919 4.14947 6.80915C4.24802 6.58586 4.27741 6.33818 4.23387 6.09802C4.19032 5.85787 4.07584 5.63627 3.90517 5.4618L3.86075 5.41738C3.72309 5.27987 3.61388 5.11658 3.53937 4.93683C3.46486 4.75709 3.42651 4.56442 3.42651 4.36985C3.42651 4.17527 3.46486 3.98261 3.53937 3.80287C3.61388 3.62312 3.72309 3.45983 3.86075 3.32232C3.99826 3.18466 4.16155 3.07545 4.3413 3.00094C4.52104 2.92643 4.71371 2.88808 4.90828 2.88808C5.10286 2.88808 5.29552 2.92643 5.47527 3.00094C5.65501 3.07545 5.8183 3.18466 5.95581 3.32232L6.00023 3.36674C6.1747 3.53741 6.39631 3.65189 6.63646 3.69544C6.87661 3.73898 7.1243 3.70958 7.34758 3.61104H7.40681C7.62577 3.51719 7.81251 3.36137 7.94404 3.16276C8.07558 2.96414 8.14616 2.7314 8.14711 2.49318V2.36733C8.14711 1.97465 8.30311 1.59805 8.58077 1.32038C8.85844 1.04271 9.23504 0.886719 9.62772 0.886719C10.0204 0.886719 10.397 1.04271 10.6747 1.32038C10.9523 1.59805 11.1083 1.97465 11.1083 2.36733V2.43395C11.1093 2.67217 11.1799 2.90492 11.3114 3.10353C11.4429 3.30215 11.6297 3.45797 11.8486 3.55181C12.0719 3.65036 12.3196 3.67976 12.5598 3.63621C12.7999 3.59267 13.0215 3.47818 13.196 3.30751L13.2404 3.2631C13.3779 3.12543 13.5412 3.01623 13.721 2.94171C13.9007 2.8672 14.0934 2.82885 14.2879 2.82885C14.4825 2.82885 14.6752 2.8672 14.8549 2.94171C15.0347 3.01623 15.198 3.12543 15.3355 3.2631C15.4731 3.4006 15.5823 3.5639 15.6568 3.74364C15.7314 3.92338 15.7697 4.11605 15.7697 4.31063C15.7697 4.5052 15.7314 4.69787 15.6568 4.87761C15.5823 5.05735 15.4731 5.22065 15.3355 5.35816L15.291 5.40257C15.1204 5.57705 15.0059 5.79865 14.9623 6.0388C14.9188 6.27895 14.9482 6.52664 15.0467 6.74993V6.80915C15.1406 7.02811 15.2964 7.21485 15.495 7.34639C15.6936 7.47792 15.9264 7.54851 16.1646 7.54946H16.2905C16.6831 7.54946 17.0597 7.70545 17.3374 7.98312C17.6151 8.26078 17.7711 8.63738 17.7711 9.03006C17.7711 9.42275 17.6151 9.79934 17.3374 10.077C17.0597 10.3547 16.6831 10.5107 16.2905 10.5107H16.2238C15.9856 10.5116 15.7529 10.5822 15.5543 10.7137C15.3556 10.8453 15.1998 11.032 15.106 11.251V11.251Z"
              stroke="currentColor"
              strokeWidth="1.11046"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_11889_161591">
              <rect
                width="17.7673"
                height="17.7673"
                fill="currentColor"
                transform="translate(0.742188 0.146484)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: "Payment Methods",
      href: "/payment-methods",
      active: false,
      disabled: false,
      icon: <BsCreditCard />,
    },
    {
      title: "Logout",
      href: "/",
      active: true,
      action: handleLogout,
      disabled: false,
      icon: (
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.40667 16.3128H4.44545C4.05277 16.3128 3.67617 16.1568 3.3985 15.8791C3.12084 15.6015 2.96484 15.2249 2.96484 14.8322V4.46791C2.96484 4.07523 3.12084 3.69863 3.3985 3.42096C3.67617 3.1433 4.05277 2.9873 4.44545 2.9873H7.40667"
            stroke="currentColor"
            strokeWidth="1.11046"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.5859 13.3523L16.2875 9.65074L12.5859 5.94922"
            stroke="currentColor"
            strokeWidth="1.11046"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.2899 9.65039H7.40625"
            stroke="currentColor"
            strokeWidth="1.48061"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    setLogoutPath(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    const findActiveIndex = () => {
      if (pathname == "/" || pathname.includes("/events")) {
        setActiveIndex(0);
      } else if (pathname.includes("/payments")) {
        setActiveIndex(1);
      } else if (pathname.includes("/settlements")) {
        setActiveIndex(2);
      } else if (pathname.includes("/messages")) {
        setActiveIndex(3);
      } else if (pathname.includes("/reviews")) {
        setActiveIndex(4);
      } else if (pathname.includes("/settings")) {
        setActiveIndex(5);
      } else if (pathname.includes("/payment-methods")) {
        setActiveIndex(6);
      }

      setLoading(false); // Set loading to false after determining the active index
    };

    findActiveIndex();
    setIsClient(true);
  }, [pathname]);

  return (
    <div className="flex flex-col items-center justify-between h-full pb-[22px]">
      <div className="flex flex-col items-end pr-1">
        {links1.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            aria-disabled={link.disabled}
            className={`w-[72px] h-[72px] ${
              link.disabled && "opacity-50 pointer-events-none"
            } aspect-square flex flex-col items-center justify-center group gap-y-[6px]`}
          >
            <div
              className={`${
                activeIndex == index
                  ? "bg-white p-2 text-[#350abc] shadow-lg"
                  : "group-hover:bg-white group-hover:p-2 text-white group-hover:text-[#350abc] group-hover:shadow-lg"
              } rounded-[10px] transition-all duration-200`}
            >
              {link.icon}
            </div>
            <span className="text-center text-[10px] text-white h-fit">
              {link.title}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-end pr-1">
        {links2.map((link, index) => (
          <Link
            key={index}
            href={link.active ? "#" : link.href}
            onClick={() => {
              link.active && link.action && link.action();
            }}
            aria-disabled={link.disabled}
            className={`w-[72px] h-[72px] ${
              link.disabled && "opacity-50 pointer-events-none"
            } aspect-square flex flex-col items-center justify-center group gap-y-[6px]`}
          >
            <div
              className={`${
                activeIndex == index + 5
                  ? "bg-white p-2 text-[#350abc] shadow-lg"
                  : "group-hover:bg-white group-hover:p-2 text-white group-hover:text-[#350abc] group-hover:shadow-lg"
              } rounded-[10px] transition-all duration-200`}
            >
              {link.icon}
            </div>
            <span className="text-center text-[10px] text-white h-fit">
              {link.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
