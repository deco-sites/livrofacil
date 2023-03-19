import Image from "deco-sites/std/components/Image.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import DescriptionModal from "$store/components/product/DescriptionModal.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";

import ProductSelector from "./ProductVariantSelector.tsx";
import { headerHeight, navbarHeightDesk } from "../header/constants.ts";

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
  const { displayDescriptionModal } = useUI();

  const [front, back] = images ?? [];

  const MOCK_SPECIFICATIONS = [
    {
      label: "Autor",
      value: "J. K. Rowling",
    },
    {
      label: "Ano Lançamento",
      value: "2001",
    },
    {
      label: "Edição",
      value: "1",
    },
    {
      label: "Número Páginas",
      value: "536",
    },
    {
      label: "Acabamento",
      value: "Brochura",
    },
    {
      label: "Idioma",
      value: "Lingua Portuguesa",
    },
    {
      label: "Altura",
      value: "21",
    },
    {
      label: "Lagura",
      value: "14",
    },
    {
      label: "Profundidade",
      value: "2.8",
    },
    {
      label: "Peso",
      value: "690 g",
    },
  ];

  console.log({ front, back });

  return (
    <Container class={`py-0 sm:py-10 sm:mt-[${headerHeight}]`}>
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
            </div>
            <h1>
              <Text variant="heading-3" class="font-extraBold">{name}</Text>
            </h1>
            <div class="flex flex-col">
              <Text class="text(base lightGray) mb-1">
                {MOCK_SPECIFICATIONS.find((spec) => spec.label === "Autor")
                  ?.label}:{" "}
                {MOCK_SPECIFICATIONS.find((spec) => spec.label === "Autor")
                  ?.value}
              </Text>
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
            {installments && !installments.includes("1x") && (
              <Text tone="subdued" variant="caption">
                {installments.replace(".", ",")}
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
                    <button class="font-button bg-primaryBlue text-default-inverse rounded w-6 h-6" // onClick={() => {
                      //   if (quantityOfProduct === 1) {
                      //     return;
                      //   }

                      //   setQuantityOfProduct((prev) => prev - 1);
                      // }}
                    >
                      -
                    </button>
                    <div class="flex justify-center w-6 h-6">
                      {/* {quantityOfProduct} */}
                      1
                    </div>
                    <button class="font-button bg-primaryBlue text-default-inverse rounded w-6 h-6" // onClick={() => {
                      //   setQuantityOfProduct((prev) => prev + 1);
                      // }}
                    >
                      +
                    </button>
                  </div>
                  <AddToCartButton
                    skuId={productID}
                    sellerId={seller}
                  />
                </div>
              </>
            )}
            <Button variant="secondary" class="border-none my-1 font-body">
              <Icon
                id="Heart"
                width={20}
                height={20}
                strokeWidth={2}
                color="#9E9E9E"
              />{" "}
              <span class="text-xs text-[#424242]">
                Adicionar a lista de desejos
              </span>
            </Button>
            <div>
              <p class="text(md [#333] center) mb-2">Formas de pagamento</p>
              <ul class="flex gap-2 justify-center">
                <li>
                  <Icon
                    id="MasterCardColored"
                    width={47}
                    height={30}
                    strokeWidth={2}
                  />
                </li>
                <li>
                  <Icon
                    id="VisaColored"
                    width={50}
                    height={30}
                    strokeWidth={2}
                  />
                </li>
                <li>
                  <Icon
                    id="DinersClubColored"
                    width={50}
                    height={30}
                    strokeWidth={2}
                  />
                </li>
              </ul>
            </div>
            <div class="px-4 mt-8 bg-[#FBFBFB]">
              <ul class="px-4">
                <li class="pt-4 pb-2">
                  <span class="flex gap-2 items-center text(sm secondaryColorHeading)">
                    <Icon
                      id="CreditCard"
                      width={20}
                      height={20}
                      strokeWidth={2}
                      color="#FFDB00"
                    />
                    Parcelamento no cartão de crédito
                  </span>
                </li>
                <li class="pt-2 pb-4">
                  <span class="flex gap-2 items-center text(sm secondaryColorHeading)">
                    <Icon
                      id="TwoCards"
                      width={20}
                      height={20}
                      strokeWidth={2}
                    />
                    Pagamento em até dois cartões
                  </span>
                </li>
              </ul>
            </div>
            <div class="pb-2 mb-8">
              <p class="text-secondaryTextColor px-0 pt-8 pb-2">
                Prazo de entrega
              </p>
              <div class="flex gap-1">
                <input
                  type="text"
                  class="border border-[#C0C0C0] rounded-sm py-3 pl-4 pr-0"
                  name="cepText"
                  id="cep-input"
                  placeholder="Insira aqui o seu CEP"
                />
                <button class="w-full bg-primaryBlue uppercase rounded text-default-inverse">
                  ok
                </button>
              </div>
              <div class="flex gap-2 items-center text(sm secondaryTextColor) pt-4">
                <Icon
                  id="Truck"
                  width={20}
                  height={20}
                  strokeWidth={2}
                />
                Entrega em TODO O BRASIL
              </div>
              <button
                class="text(sm primaryColorHeading underline) w-max"
                onClick={() => displayDescriptionModal.value = true}
              >
                Como podemos ajudar?
              </button>
            </div>
          </div>
          <hr />
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
          {/** Características */}
          <div>
            <Text class="text-secondaryBlue !text-heading-3 !font-medium">
              Características
            </Text>
            <table class="border border-[#C0C0C0] p-3 mb-12 mt-4">
              <tbody>
                {MOCK_SPECIFICATIONS.map((spec, idx) => {
                  return (
                    <tr key={`${spec}-${idx}`}>
                      <td class="p-4 font-heading-1 text-md text-secondaryTextColor">
                        {spec.label}
                      </td>
                      <td class="w-[45%] text-md text-right p-4 font-medium text-secondaryTextColor">
                        {spec.value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DescriptionModal />
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
