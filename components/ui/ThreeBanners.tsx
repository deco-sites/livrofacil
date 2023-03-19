import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import Slider from "./Slider.tsx";
import Container from "./Container.tsx";

export interface Banner {
	image: LiveImage;
	/**
	 * @description Image alt text
	 */
	alt: string;
	/**
	 * @description When you click you go to
	 */
	href: string;
}

export interface Props {
	images: Banner[];
}

export default function ThreeBanners({ images }: Props) {
	return (
		<div class="w-full ">
			<Container class="px-4 flex flex-col gap-4 mb-20 sm:(flex-row justify-between)">
				{images.map((image) => (
					<a href={image.href} class={`overflow-hidden flex flex-col gap-4`}>
						<Image
							src={image.image}
							alt={image.alt}
							width={368}
							height={200}
							class="mix-blend-multiply bg-blend-multiply"
							preload={false}
							loading="lazy"
						/>
					</a>
				))}
			</Container>
		</div>
	);
}
