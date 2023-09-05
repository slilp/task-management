import Button from "components/atoms/Button";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

function NavBar() {
  return (
    <nav className="bg-purple-500 text-white">
      <div className="flex items-center justify-between p-2 mx-1 md:mx-5">
        <h1 className="font-bold text-xl">Task Management</h1>
        <Button
          data-testid="navbar-signout-btn"
          type="button"
          onClick={() => signOut()}
        >
          <div className="flex gap-2 align-middle">
            <Image src="/logout.png" alt="logout" height={30} width={30} />
            <span>Sign out</span>
          </div>
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
