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
  editoras: Banner[];
}

export default function Editoras({ editoras }: Props) {
  return (
    <div class="w-full bg-grayEditoras">
      <Container class="px-4 ">
        <Slider
          snap="snap-center sm:snap-start block first:ml-3 sm:first:ml-0 last:mr-6 sm:last:mr-0"
          class="gap-6 scrollbar-horizontal-min py-4"
        >
          {editoras?.map((editora) => (
            <a
              href={editora.href}
              class={`overflow-hidden flex flex-col gap-6 items-center min-w-[90px] sm:min-w-[190px]`}
            >
              <Image
                src={editora.image}
                alt={editora.alt}
                width={90}
                height={90}
                class="mix-blend-multiply bg-blend-multiply"
                preload={false}
                loading="lazy"
              />
            </a>
          ))}
        </Slider>
      </Container>
    </div>
  );
}
