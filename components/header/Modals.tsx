import Modal from "$store/components/ui/Modal.tsx";
import { lazy, Suspense } from "preact/compat";
import { useUI } from "$store/sdk/useUI.ts";

import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Loading from "$store/components/ui/Loading.tsx";
import Text from "../ui/Text.tsx";
import Button from "../ui/Button.tsx";
import Icon from "../ui/Icon.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Cart = lazy(() => import("$store/components/minicart/Cart.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

interface Props {
	menu: MenuProps;
	searchbar?: SearchbarProps;
}

function Modals({ menu, searchbar }: Props) {
	const { displayCart, displayMenu, displaySearchbar } = useUI();

	return (
		<>
			<Modal
				// title="BEM-VINDO!
				// JÁ É CADASTRADO?"
				mode="sidebar-left"
				loading="lazy"
				headerContent={
					<header class="flex px-4 justify-between  border-b-1 border-default bg-secondaryBlue items-start h-20">
						<div class="flex flex-col pt-5 pb-5 h-20 relative">
							<h1>
								<Text
									variant="heading-2"
									class="text-white"
									tone="default-inverse"
								>
									BEM-VINDO!
								</Text>
							</h1>
							<h1>
								<Text
									variant="heading-2"
									class="text-white"
									tone="default-inverse"
								>
									JÁ É CADASTRADO?
								</Text>
							</h1>
						</div>
						<Button
							variant="blank"
							onClick={() => {
								displayMenu.value = false;
							}}
              class="bg-white h-[36px] px-2 rounded outline-none focus:outline-none active:bg-gray-200 hover:bg-gray-200 mt-5"
						>
							<Icon id="XMark" width={20} height={20} strokeWidth={4} class="stroke-current text-yellowModal"/>
						</Button>
					</header>
				}
				open={displayMenu.value}
				onClose={() => {
					displayMenu.value = false;
				}}
				class="w-2/3"
			>
				<Suspense fallback={<Loading />}>
					<Menu {...menu} />
				</Suspense>
			</Modal>

			<Modal
				title="Buscar"
				mode="sidebar-right"
				loading="lazy"
				open={
					displaySearchbar.value &&
					window?.matchMedia("(max-width: 767px)")?.matches
				}
				onClose={() => {
					displaySearchbar.value = false;
				}}
			>
				<Suspense fallback={<Loading />}>
					<Searchbar {...searchbar} />
				</Suspense>
			</Modal>

			<Modal
				title="Minha sacola"
				mode="sidebar-right"
				loading="lazy"
				open={displayCart.value}
				onClose={() => {
					displayCart.value = false;
				}}
			>
				<Suspense fallback={<Loading />}>
					<Cart />
				</Suspense>
			</Modal>
		</>
	);
}

export default Modals;
