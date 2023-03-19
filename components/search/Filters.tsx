import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import type {
	Filter,
	FilterToggle,
	ProductListingPage,
} from "deco-sites/std/commerce/types.ts";

interface Props {
	filters: ProductListingPage["filters"];
  class?: string;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
	filter["@type"] === "FilterToggle";

function FilterValues({ key, values }: FilterToggle) {
	const flexDirection =
		key === "tamanho" || key === "cor" ? "flex-row" : "flex-col";

	return (
		<ul
			class={`flex gap-2 ${flexDirection}  pl-0 pr-5 max-h-[265px] overflow-y-auto scrollbar-color`}
		>
			{values.map(({ label, value, url, selected, quantity }) => {
				if (key === "cor") {
					return (
						<a href={url}>
							<Avatar
								// deno-lint-ignore no-explicit-any
								content={value as any}
								disabled={selected}
								variant="color"
							/>
						</a>
					);
				}

				if (key === "tamanho") {
					return (
						<a href={url}>
							<Avatar
								content={label}
								disabled={selected}
								variant="abbreviation"
							/>
						</a>
					);
				}

				return (
					<a href={url} class="flex items-center gap-2 my-1.5">
						<input type="checkbox" checked={selected} class="hidden" />
						<div class={`w-[18px] h-[18px] border rounded text-[12px] flex justify-center items-center pt-0.5 ${selected ? `border-secondaryBlue text-secondaryBlue` : "border-borderProduct"}`}>
							{selected && (`✔`)}
						</div>
						<Text variant="caption">{label}</Text>
						<Text tone="subdued" variant="caption">
							({quantity})
						</Text>
					</a>
				);
			})}
		</ul>
	);
}

export default function Filters({ filters, class: _class = "" }: Props) {
	return (
		<ul class={`hidden flex-col gap-6 p-4 mt-6 ${_class}`}>
			{filters.filter(isToggle).map((filter) => (
				<li class="flex flex-col gap-4">
					<Text
						variant="heading-2"
						class="text-secondaryBlue font-bold text-[18px]"
					>
						{filter.label}
					</Text>
          <div class="p-4 border-borderProduct border-1 rounded">
					  <FilterValues {...filter} />
          </div>
				</li>
			))}
		</ul>
	);
}
