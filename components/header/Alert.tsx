import Text from "$store/components/ui/Text.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useId } from "preact/hooks";
import Icon, { AvailableIcons } from "../ui/Icon.tsx";

export interface Props {
  alerts: {
    message: string;
    icon?: AvailableIcons;
  }[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <>
      {/* Mobile Version */}
      <div id={id} class="md:hidden">
        <Slider class="bg-secondaryBlue gap-6 scrollbar-none">
          {alerts.map((alert) => (
            <>
              <Text
                class="flex justify-center items-center w-screen h-[38px]"
                variant="caption"
                tone="default-inverse"
              >
                {alert?.icon && (
                  <Icon
                    id={alert?.icon}
                    width={20}
                    height={20}
                    strokeWidth={3}
                    class="text-orangeButton mr-4"
                  />
                )} {"    "} {alert.message}
              </Text>
            </>
          ))}
        </Slider>

        <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
      </div>

      {/* Desktop Version */}
      <div
        id={id}
        class="hidden md:flex flex-row justify-center items-center bg-secondaryBlue h-[38px]"
      >
        {alerts.map((alert, index) => (
          <>
            {alert?.icon && (
              <Icon
                id={alert?.icon}
                width={20}
                height={20}
                strokeWidth={2}
                class="mr-2 text-orangeButton"
              />
            )}
            <Text
              class="py-1 px-2"
              variant="caption"
              tone="default-inverse"
            >
              {alert.message}
            </Text>
            {index !== alerts.length - 1 && <span class="mx-2">|</span>}
          </>
        ))}
      </div>
    </>
  );
}

export default Alert;
