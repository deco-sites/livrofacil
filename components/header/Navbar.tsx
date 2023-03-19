import HeaderButton from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight, navbarHeightDesk } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import HeaderSearchMenu from "$store/islands/HeaderSearchMenu.tsx";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        class={`md:hidden flex flex-row justify-between items-center h-[${navbarHeight}] border-b-1 border-default w-full px-2 gap-2`}
      >
        <HeaderButton variant="menu" />

        <a
          href="/"
          class={`inline-flex items-center text-white min-h-[${navbarHeight}]`}
          aria-label="Store logo"
        >
          <Icon id="Logo" width={100} height={42} strokeWidth={0.4} />
        </a>

        <div class="flex gap-1">
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-center items-center border-b-1 border-default w-full pl-2 pr-3 h-24 md:(border-none px-0 max-w-[1280px] mx-auto)">
        <div class="flex-1">
          <a
            href="/"
            aria-label="Store logo"
            class="px-4 w-[277px] text-white text-heading-1 items-center justify-center flex -mt-5"
          >
            <Icon id="Logo" width={100} height={42} strokeWidth={0.4} />
          </a>
        </div>
        <div class="flex-1">
          <form action="/" method="get" class="block px-4 py-3 w-[665px]">
            <input
              type="text"
              name="search"
              placeholder="Digite aqui"
              class="w-full border-2 border-gray-200 rounded-md py-2 px-4 placeholder-gray-500 focus:outline-none focus:border-blue-400"
            />
          </form>
        </div>

        <div class="flex-1 w-44 flex items-center justify-center gap-2">
          <HeaderButton variant="heart" />
          <HeaderSearchMenu searchbar={searchbar} />
          <Button
            as="a"
            variant="icon"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" width={20} height={20} strokeWidth={0.4} />
          </Button>
          <HeaderButton variant="cart" />
        </div>
      </div>

      <div class={`hidden md:flex relative h-[${navbarHeightDesk}] border-t-1 border-white`}>
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
