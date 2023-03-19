import ProductCard from "$store/components/product/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
	title: string;
	products: LoaderReturnType<Product[] | null>;
	itemsPerPage?: number;
}

function ProductShelf({ title, products }: Props) {
	const id = useId();

	if (!products || products.length === 0) {
		return null;
	}

	return (
		<Container
			id={id}
			class="grid grid-cols-[48px_1fr_48px] grid-rows-[48px_1fr_48px_1fr] py-10 px-0 sm:px-5"
		>
			<h2 class="row-start-1 col-span-full text-left pl-3 sm:p-0">
				<span class="text-[20px] text-secondaryBlue font-bold">{title}</span>
			</h2>

			<Slider
				class="gap-4 col-span-full row-start-2 row-end-5 sm:gap-6 scrollbar-horizontal-min pb-5"
				snap="snap-center sm:snap-start block first:ml-3 sm:first:ml-0 last:mr-6 sm:last:mr-0"
			>
				{products?.map((product) => (
					<div class="min-w-[190px] max-w-[190px] sm:min-w-[292px] sm:max-w-[292px]">
						<ProductCard product={product} />
					</div>
				))}
			</Slider>

			<>
				<div class="hidden relative sm:block z-10 col-start-1 row-start-3">
					<div class="absolute right-1/2 bg-interactive-inverse rounded border-none">
						<Button
							variant="arrow"
							data-slide="prev"
							aria-label="Previous item"
              class="group-hover:text-white"
						>
							<Icon size={20} id="ChevronLeft" strokeWidth={3} class="hover:text-white group-hover:text-white" />
						</Button>
					</div>
				</div>
				<div class="hidden relative sm:block z-10 col-start-3 row-start-3">
					<div class="absolute left-1/2 bg-interactive-inverse rounded border-none">
						<Button
              variant="arrow"
              data-slide="prev"
              aria-label="Previous item"
              class="group-hover:text-white"
						>
							<Icon size={20} id="ChevronRight" strokeWidth={3} class="hover:text-white group-hover:text-white" />
						</Button>
					</div>
				</div>
			</>

			<SliderControllerJS rootId={id} />
		</Container>
	);
}

export default ProductShelf;
