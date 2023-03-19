import { useUI } from "$store/sdk/useUI.ts";
import Icon from "$store/components/ui/Icon.tsx";

const DescriptionModal = () => {
  const { displayDescriptionModal } = useUI();

  return (
    <>
      <div
        class={`bg-black opacity-40 ${
          displayDescriptionModal.value ? "fixed" : "hidden"
        } z-10 left-0 top-0 h-screen w-screen`}
      />
      <div
        class={`bg-white ${
          displayDescriptionModal.value ? "fixed" : "hidden"
        } z-20 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2`}
      >
        alguma coisa
        <button onClick={() => displayDescriptionModal.value = false}>
          <Icon
            id="Close"
            width={20}
            height={20}
            strokeWidth={2}
          />
        </button>
      </div>
    </>
  );
};

export default DescriptionModal;
