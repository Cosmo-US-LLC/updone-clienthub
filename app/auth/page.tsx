"use client";

import { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../lib/store/hooks";
import { selectAuth, setAuth } from "../lib/store/features/authSlice";
import { apiRequest } from "../lib/services";
import Cookies from "js-cookie";
import RenderLoader from "../_components/ui/loader";
import { jwtDecode } from "jwt-decode";

const AuthRedirectPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { auth: storedData } = useAppSelector(selectAuth);

  const fetchAndStoreUser = useCallback(async () => {
    if (!token) return;

    try {
      const response = await apiRequest(`/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {},
      });

      if (response?.user) {
        dispatch(setAuth({ token, user: response.user }));
        Cookies.set("authToken", token);
        Cookies.set("authData", JSON.stringify(response.user));
      } else {
        console.warn("User fetch failed or empty response");
        dispatch(setAuth({ token, user: null }));
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      dispatch(setAuth({ token, user: null }));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (token) {
      fetchAndStoreUser();
    }
  }, [token, fetchAndStoreUser]);

  useEffect(() => {
    if (!token || !storedData?.token || !storedData?.user) return;

    try {
      const decodedToken = jwtDecode(token);
      const isSameUser = storedData.user.id === decodedToken.sub;

      if (storedData.token === token && isSameUser) {
        router.push("/");
      }
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }, [storedData, token, router]);

  return <RenderLoader />;
};

export default AuthRedirectPage;