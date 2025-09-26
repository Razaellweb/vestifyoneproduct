import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const cookieConfig: Cookies.CookieAttributes = {
  expires: 7,
  secure: true,
  sameSite: "Lax",
  path: "/",
};

export const setCookie = (key: string, value: string) => Cookies.set(key, value, cookieConfig);
export const removeCookie = (key: string) => Cookies.remove(key);
export const getCookie = (key: string) => Cookies.get(key);

export function returnError(error: unknown): string {
  console.error(error);
  if (axios.isAxiosError(error)) return (error.response?.data as any)?.message ?? "An error occurred";
  if (error instanceof Error) return error.message;
  return "An unknown error occurred";
}
