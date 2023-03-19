import Image from "deco-sites/std/components/Image.tsx";
import Text from "./Text.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
	image: LiveImage;
}

function CompraParceira({ image }: Props) {
	return (
		<div class="flex flex-col gap-2 bg-secondaryBlue py-[20px] px-[8px] xl:(max-w-[832px] mx-auto rounded flex-row)">
			<div class="flex gap-4 items-center mb-4 xl:(w-1/2 pl-[62px] m-0) relative">
				<Image class="xl:(absolute w-[135px] h-[135px] left-[-90px] bottom-[-35px])" src={image} width={60} height={60} loading="lazy" />
				<div class="flex flex-col">
					<span class="text-white font-bold xl:(text-[20px])">
						Compre aqui seu material escolar!
					</span>
					<span class="text-white xl:(text-[20px])">é pratico, rápido e seguro.</span>
				</div>
			</div>
			<div class="flex gap-4 xl:(w-1/2)">
				<input
					class=" w-3/5 py-2 px-3 flex-grow bg-white rounded text-secondaryBlue text-[12px] border-1 border-default xl:(w-3/4 text-[16px])"
					placeholder="Escreva aqui o nome da escola"
				/>
				<button
					class="w-2/5 py-2 px-3 bg-orangeButton rounded text-white xl:(w-[15%] text-[16px])"
					type="bgutton" // prevent form's default behavior
				>
					OK
				</button>
			</div>
		</div>
	);
}

export default CompraParceira;
