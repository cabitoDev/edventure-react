import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Input,
} from "@nextui-org/react";
import "./Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { SearchIcon } from "./SearchIcon";
import assets from "../../assets";

export const NavBar = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state) => state.user.isAuthenticated
  );

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const user = useSelector((state) => {
    console.log(state);
    return state.user;
  });
  return (
    <Navbar>
      <NavbarBrand>
        <img src={assets.logo} />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Your events
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Create event
          </Link>
        </NavbarItem>

        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search event"
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={user.userInfo.picture}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem href={`${window.location.href}/settings`}>Settings</DropdownItem>
            <DropdownItem key="profile">Profile</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
