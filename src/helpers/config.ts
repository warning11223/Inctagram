import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export const baseUrl = "https://inctagram.work/api/v1/";

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    //@ts-ignore
    const res: { data: { accessToken: string } } = await baseQuery(
      { url: "auth/update-tokens", method: "POST" },
      api,
      extraOptions,
    );
    if (res.data) {
      sessionStorage.setItem("accessToken", res.data?.accessToken);
      toast.success("Token was updated");
    } else {
      toast.error("Auth error");
      redirect("/sign-in");
    }
  }
  return result;
};
