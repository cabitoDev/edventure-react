import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    useMatches,
    NO_GROUP
  } from "kbar";
import { SearchIcon } from "../Navbar/SearchIcon";
import KResults from "./KResults";
import Kbd from "./Kbd";

  const actions = [
    {
      id: "blog",
      name: "Blog",
      shortcut: ["b"],
      keywords: "writing words",
      perform: () => (window.location.pathname = "blog"),
    },
    {
      id: "contact",
      name: "Contact",
      shortcut: ["c"],
      keywords: "email",
      perform: () => (window.location.pathname = "contact"),
    },
  ]

  export const KProvider = (props) => {
     return (
      <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner className="z-30 bg-secondary/60 backdrop-blur-md backdrop-filter">
            <KBarAnimator className="mx-auto w-[32rem] overflow-hidden rounded-xl border-[1px] border-tertiary bg-secondary/60 px-4 drop-shadow-2xl ">
              <div className="mx-2 flex items-end justify-between py-4">
              <SearchIcon size={18} />
                <KBarSearch className="w-full rounded-md border-b border-none border-gray-300 bg-transparent pt-2 text-gray-100 outline-none pd-left-sm" />
                <Kbd>esc</Kbd>
              </div>

              <KResults />
              <div className="h-4" />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        {props.children}
      </KBarProvider>
    </>
      );
  }