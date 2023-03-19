import ProductCard from "$store/components/product/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import Button from "$store/components/ui/Button.tsx";
import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import Filters from "../search/Filters.tsx";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  flagDescontoOff?: boolean;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <Text>Not Found!</Text>
    </div>
  );
}

function Gallery(
  { page, flagDescontoOff }: {
    page: ProductListingPage;
    flagDescontoOff: boolean | undefined;
  },
) {
  const filters = page?.filters;

  return (
    <Container class="px-4 sm:py-10 md:(flex gap-6)">
      <Filters filters={filters} class="md:(flex mt-0 p-0 w-1/4)" />
      <div class="flex-col md:(w-3/4)">
        <div class="relative grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 md:gap-4 items-center place-items-stretch">
          {page.products?.map((product, index) => (
            <div class="w-full list-none">
              <ProductCard
                product={product}
                preload={index === 0}
                flagDescontoOff={flagDescontoOff}
              />
            </div>
          ))}
        </div>
        <div class="flex flex-row items-center justify-center gap-2 my-4 md:w-full">
          <a rel="prev" href={page.pageInfo.previousPage ?? "#"}>
            <Button
              disabled={!page.pageInfo.previousPage}
              variant="secondary"
              class="h-[40px] w-[40px]"
            >
              <Icon id="ChevronLeft" width={20} height={20} strokeWidth={2} />
            </Button>
          </a>
          <Button
            variant="blank"
            class="h-[40px] w-[40px] border border-secondaryBlue bg-secondaryBlue rounded"
          >
            <Text tone="default-inverse">
              {page.pageInfo.currentPage + 1}
            </Text>
          </Button>
          <a rel="next" href={page.pageInfo.nextPage ?? "#"}>
            <Button
              disabled={!page.pageInfo.nextPage}
              variant="secondary"
              class="h-[40px] w-[40px]"
            >
              <Icon id="ChevronRight" width={20} height={20} strokeWidth={2} />
            </Button>
          </a>
        </div>
      </div>
    </Container>
  );
}

function ProductGallery({ page, flagDescontoOff }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Gallery page={page} flagDescontoOff={flagDescontoOff} />;
}

export default ProductGallery;
