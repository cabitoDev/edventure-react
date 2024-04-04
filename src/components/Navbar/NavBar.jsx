import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Input,
} from "@nextui-org/react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { SearchIcon } from "./SearchIcon";
import assets from "../../assets";
import { loginSuccess, logoutSuccess } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Auth0Lock } from "auth0-lock";

export const NavBar = () => {
  const user = useSelector((state) => {
    console.log(state);
    return state.user;
  });
  const pro = window.location.origin.includes("myedventure.netlify.app");
  const domain = pro
    ? "dev-9bbt1y5j.us.auth0.com"
    : "dev-9bbt1y5j.us.auth0.com";
  const clientId = pro
    ? "5gpAXndTBJpbEj4PbW8apKvpKe52XnYP"
    : "1gemzxvcpddr2gAfGUrbdR4kfqkiWI4Y";
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [lock, setLock] = React.useState();

  React.useEffect(() => {
    setLock(new Auth0Lock(clientId, domain));
  }, []);

  React.useEffect(() => {
    if (lock) {
      lock.on("authenticated", (authResult) => {
        lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            console.error("Error al obtener el perfil de usuario:", error);
            return;
          }
          dispatch(loginSuccess(profile));
          lock.hide();
          navigateTo(`/${profile.nickname}`);
        });
      });
    }
  }, [lock]);

  const handleLogout = () => {
    navigateTo("/");
    dispatch(logoutSuccess());
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        {user.isAuthenticated && <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />}
        <NavbarBrand>
          <img src={assets.logo} />
        </NavbarBrand>
   
      </NavbarContent>

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
      </NavbarContent>
      <NavbarContent justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        {!user.isAuthenticated && lock && (
          <NavbarItem key="signup" onClick={lock.show()}>
            <Link color="primary" href="#">
            Sign Up
          </Link>
          </NavbarItem>
        )}
        {user.isAuthenticated && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src={user.userInfo.picture}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem href={`/${user.userInfo.nickname}/settings`}>
                Settings
              </DropdownItem>
              <DropdownItem key="profile">Profile</DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  <Link color="danger" key="logout" >
                    Log Out
                  </Link>
                </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
      {user.isAuthenticated && <NavbarMenu>
        <NavbarMenuItem>
          <Link href={`/${user.userInfo.nickname}`}>Your events</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={`/${user.userInfo.nickname}/create`}>Create event</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={`/${user.userInfo.nickname}/settings`}>Settings</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="profile">
          <Link href={`/${user.userInfo.nickname}/profile`}>Profile</Link>
        </NavbarMenuItem>
        {user && (
          <NavbarMenuItem key="logout">
            <Link color="danger" onClick={handleLogout}>
              Log Out
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>}
    </Navbar>
  );
};
