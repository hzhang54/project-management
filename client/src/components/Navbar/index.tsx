import React from "react";
import Link from "next/link";
import { Search, Settings, Menu, Sun, Moon, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import Image from "next/image";

type Props = {};

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // grab current user information using backend api for getting authenticated user query
  const { data: currentUser } = useGetAuthUserQuery({});

  // create a function to handle user sign out. Handle any signout error by printing to console.
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // return null if current user doesn't exist
  if (!currentUser) return null;
  // get user detail from the current user returned from backend api call
  const currentUserDetails = currentUser?.userDetails;

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* Search bar */}
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8 dark:text-white" />
          </button>
        )}
        <div className="relative flex h-min w-[200px]">
          <Search className="dark: absolute top-1/2 left-[4px] mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-white" />
          <input
            className="focus: w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 outline-none focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-white"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
      {/* Icons */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? `rounded p-2 dark:hover:bg-gray-700`
              : `rounded p-2 hover:bg-gray-100`
          }
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>
        <Link
          href="/settings"
          className={
            isDarkMode
              ? "h-min w-min rounded p-2 dark:hover:bg-gray-700"
              : "h-min w-min rounded p-2 hover:bg-gray-100"
          }
        >
          <Settings className="h-5 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="mr-5 ml-2 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block">
          <div className="hidden items-center justify-between md:flex">
            <div className="align-center flex h-9 w-9 justify-center">
              {!!currentUserDetails?.profilePictureUrl ? (
                <Image
                  src={`https://hui-pm-image-s3.s3.us-west-2.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                  alt={currentUserDetails?.username || "User Profile Picture"}
                  width={100}
                  height={50}
                  className="h-full rounded-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
              )}
            </div>
            <span className="mx-3 text-gray-800 dark:text-white">
              {currentUserDetails?.username}
            </span>
            <button
                className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
                onClick={handleSignOut}
                >
                Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
