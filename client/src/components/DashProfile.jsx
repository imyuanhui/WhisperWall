import React from "react";
import { TextInput, Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { username, email } = currentUser;
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-5">
        <div className="w-32 h-32 self-center">
          <img
            src={currentUser.profilePicture}
            alt="avatar"
            className="rounded-full w-full h-full object-cover border-8 border-[lightGray] cursor-pointer"
          />
        </div>
        <TextInput id="username" type="text" defaultValue={username} />
        <TextInput
          id="email"
          type="email"
          placeholder="name@flowbite.com"
          value={email}
          required
        />
        <TextInput
          id="password"
          type="password"
          placeholder="********"
          required
        />
        <Button type="submit" gradientDuoTone="redToYellow" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5 text-sm">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
