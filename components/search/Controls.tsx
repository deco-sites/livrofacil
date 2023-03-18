import Logger from "$store/islands/Logger.tsx";
import Container from "$store/components/ui/Container.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import { headerHeight } from "../header/constants.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
}

function NotFound() {
  return <div />;
}

function Controls({ page }: { page: ProductListingPage }) {
  const open = useSignal(false);
  const filters = page?.filters;
  const breadcrumb = page?.breadcrumb;

  return (
    <Container class={`mt-[${headerHeight}] flex flex-col justify-between mb-4 md:mb-0 p-4 sm:gap-4 sm:flex-row sm:h-[53px] sm:justify-between sm:px-4`}>
      {/* <Logger value={page} /> */}
      <div class="flex flex-row items-center sm:p-0 mb-6 sm:m-0">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>
      <div class="flex flex-row sm:gap-4 items-center justify-between gap-6">
        <Button
          variant="secondary"
          onClick={() => {
            open.value = true;
          }}
          class="flex-1"
        >
          Filtrar por
          <Icon id="FilterList" width={18} height={18} />
        </Button>
        <Sort />
      </div>

      <Modal
        title="Filtrar"
        mode="sidebar-left"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <Filters filters={filters} />
      </Modal>
    </Container>
  );
}

function SearchControls({ page }: Props) {
  if (!page || !page.filters || page.filters.length === 0) {
    return <NotFound />;
  }

  return <Controls page={page} />;
}

export default SearchControls;
