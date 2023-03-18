import { useSignal } from "@preact/signals"
import Image from "deco-sites/std/components/Image.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";

import ProductSelector from "./ProductVariantSelector.tsx";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function Details({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    image: images,
    name,
    gtin,
    brand,
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);
  const [front, back] = images ?? [];

  const quantityOfProduct = useSignal(1)

  return (
    <Container class="py-0 sm:py-10">
      <div class="flex flex-col gap-4 sm:flex-row sm:gap-10">
        {/* Image Gallery */}
        <div class="flex flex-row overflow-auto snap-x snap-mandatory scroll-smooth sm:gap-2">
          {[front, back ?? front].map((img, index) => (
            <Image
              style={{ aspectRatio: "360 / 500" }}
              class="snap-center min-w-[100vw] sm:min-w-0 sm:w-auto sm:h-[600px]"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={img.url!}
              alt={img.alternateName}
              width={360}
              height={500}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
        {/* Product Info */}
        <div class="flex-auto px-4 sm:px-0">
          {/* Breadcrumb */}
          <Breadcrumb
            itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
          />
          {/* Code and name */}
          <div class="mt-4 sm:mt-8 mb-10">
            <div>
              <Text tone="subdued" variant="caption" class="text(sm lightGray)">
                ISBN: {gtin}
              </Text>
              {/* <p>
                {JSON.stringify(installments, null, 2)}
              </p> */}
            </div>
            <h1>
              <Text variant="heading-3" class="font-extraBold">{name}</Text>
            </h1>
            <div class="flex flex-col">
              <Text class="text(base lightGray) mb-1">
                Editora: {brand}
              </Text>
              <button class="text(sm primaryColorHeading underline) w-max">
                Ver descrição
              </button>
            </div>
          </div>
          {/* Prices */}
          <div class="mt-4">
            <div class="flex flex-col gap-0">
              <Text
                class="line-through text-md"
                tone="subdued"
                variant="list-price"
              >
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </Text>
              <Text tone="price" variant="heading-2" class="text-priceColor">
                {formatPrice(price, offers!.priceCurrency!)}
              </Text>
            </div>
            {!installments.includes('1x') && (
              <Text tone="subdued" variant="caption">
                {installments.replace('.', ',')}
              </Text>
            )}
          </div>
          {/* Sku Selector */}
          <div class="mt-4 sm:mt-6">
            <ProductSelector product={product} />
          </div>
          {/* Add to Cart and Favorites button */}
          <div class="mt-4 sm:mt-10 flex flex-col gap-0">
            {seller && (
              <>
                <span class="text(xs lightGray)">Quantidade</span>
                <div class="flex gap-2 mb-2">
                  <div class="flex items-center">
                    <button
                      class="font-button bg-primaryBlue text-default-inverse rounded w-6 h-6"
                      onClick={() => {
                        if (quantityOfProduct <= 1) {
                          return
                        }

                        quantityOfProduct.value--
                      }}
                    >-</button>
                    <div class="flex justify-center w-6 h-6">{quantityOfProduct.value}</div>
                    <button
                      class="font-button bg-primaryBlue text-default-inverse rounded w-6 h-6"
                      onClick={() => {
                        quantityOfProduct.value++
                        console.log(quantityOfProduct)
                      }}
                    >+</button>
                  </div>
                  <AddToCartButton
                    skuId={productID}
                    sellerId={seller}
                  />
                </div>
              </>
            )}
            <Button variant="secondary" class="border-none my-1 font-body">
              <Icon id="Heart" width={20} height={20} strokeWidth={2} color="#9E9E9E" />{" "}
              <span class="text-xs text-[#424242]">Adicionar a lista de desejos</span>
            </Button>
            <div>
              <p class="text(md #333 center)">Formas de pagamento</p>
              <ul class="flex gap-2 justify-center">
                <li><Icon id="MasterCardColored" width={47} height={30} strokeWidth={2} /></li>
                <li><Icon id="VisaColored" width={50} height={30} strokeWidth={2} /></li>
                <li><Icon id="DinersClubColored" width={50} height={30} strokeWidth={2} /></li>
              </ul>
            </div>
            <div class="outline mt-4">
              <ul class="px-4">
                <li><span class="text(sm secondaryColorHeading)">Parcelamento no cartão de crédito</span></li>
                <li><span class="text(sm secondaryColorHeading)">Pagamento em até dois cartões</span></li>
              </ul>
            </div>
          </div>
          {/* Description card */}
          <div class="mt-4 sm:mt-6">
            <Text variant="caption">
              {description && (
                <details>
                  <summary class="cursor-pointer">Descrição</summary>
                  <div class="ml-2 mt-2">{description}</div>
                </details>
              )}
            </Text>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ProductDetails({ page }: Props) {
  if (page) {
    return <Details page={page} />;
  }

  return <NotFound />;
}

export default ProductDetails;
