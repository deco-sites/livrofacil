import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { AggregateOffer, Product } from "deco-sites/std/commerce/types.ts";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([url, value]) => (
        <a href={url}>
          <Avatar
            class="bg-default"
            variant="abbreviation"
            content={value}
            disabled={url === product.url}
          />
        </a>
      ))}
    </ul>
  );
}

interface ProductPriceProps {
  price?: number;
  listPrice?: number;
  offers?: AggregateOffer;
  installmentToObject: {
    billingDuration: number;
    billingIncrement: number;
  } | null;
}

function ProductPrice({
  price,
  listPrice,
  installmentToObject,
  offers,
}: ProductPriceProps) {
  const showInstallments = installmentToObject?.billingDuration &&
    installmentToObject?.billingDuration > 1;
  if (price === listPrice && showInstallments) {
    return (
      <div class="flex gap-2 mb-2 flex-col justify-start content-start">
        <Text
          variant="caption"
          tone="price"
          class="text-thirdTextColor text-[12px] leading-3"
        >
          <span class="text-priceColor text-[14px] font-bold">
            {installmentToObject.billingDuration}x
          </span>{" "}
          de{" "}
          <span class="text-priceColor text-[14px] font-bold">
            {formatPrice(
              installmentToObject.billingIncrement,
              offers!.priceCurrency!,
            )}
          </span>
        </Text>
        <Text class="text-thirdTextColor text-[12px] leading-3">
          ou{" "}
          <span class="text-priceColor text-[14px] font-bold">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>{" "}
          à Vista
        </Text>
      </div>
    );
  }

  return (
    <div class="flex items-center gap-2 mt-4 mb-2">
      <Text
        class="line-through text-[12px]"
        variant="list-price"
        tone="subdued"
      >
        {formatPrice(listPrice, offers!.priceCurrency!)}
      </Text>
      <Text
        variant="caption"
        // tone="price"
        class="text-priceColor text-[16px] font-bold"
      >
        {formatPrice(price, offers!.priceCurrency!)}
      </Text>
    </div>
  );
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;
  flagDescontoOff?: boolean;
}

function ProductCard({ product, preload, flagDescontoOff }: Props) {
  const { url, productID, name, image: images, offers } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, seller, discountOff, installmentToObject } =
    useOffer(offers);
  const showFlagDescontoOff = flagDescontoOff && Number(discountOff) > 0;

  return (
    <div
      id={`product-card-${productID}`}
      class="w-full group border border-borderProduct px-4 pt-2 pb-1 rounded relative min-h-[335px]"
    >
      {showFlagDescontoOff && (
        <div class="bg-blueFlag text-[12px] text-default-inverse rounded font-bold py-2 px-5 w-max absolute z-10">
          {discountOff}% OFF
        </div>
      )}
      <a href={url} aria-label="product link">
        <div class="relative w-full">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={200}
            height={279}
            class="rounded w-full group-hover:hidden"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={200}
            height={279}
            class="rounded w-full hidden group-hover:block"
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          {
            /* {seller && (
            <div
              class="absolute bottom-0 hidden sm:group-hover:flex flex-col gap-2 w-full p-2 bg-opacity-10"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(2px)",
              }}
            >
              <Sizes {...product} />
              <Button as="a" href={product.url}>

              </Button>
            </div>
          )} */
          }
          <a></a>
        </div>

        <div class="flex flex-col gap-1 py-2">
          <Text
            class="overflow-hidden overflow-ellipsis whitespace-nowrap my-2 text-[14px]"
            variant="caption"
          >
            {name}
          </Text>
          <ProductPrice
            {...{ listPrice, price, installmentToObject, offers }}
          />
          <a
            class="h-[36px] px-3 rounded uppercase bg-greenButton font-button text-button text-default-inverse border-transparent hover:bg-greenButtonHover hover:text-default-inverse hover:border-greenButtonHover active:bg-greenButtonHover active:text-default-inverse active:border-greenButtonHover disabled:border-default disabled:text-subdued disabled:bg-interactive-inverse focus:outline-none flex justify-center items-center"
            href={url}
          >
            Comprar
          </a>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
