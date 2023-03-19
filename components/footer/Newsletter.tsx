import Text from "$store/components/ui/Text.tsx";

function Newsletter() {
  return (
    <div class="flex flex-col bg-secondaryBlue sm:flex-row items-center gap-6 sm:gap-20">
      <div class="flex flex-col gap-2 max-w-[400px]">
        <Text
          variant="heading-2"
          tone="default-inverse"
          class="text-heading-3 font-medium"
        >
          Assine nossa newsletter!
        </Text>
        <Text variant="caption" tone="default-inverse">
          Fique por dentro das novidades de ofertas exclusivas.
        </Text>
      </div>
      <form class="flex flex-row items-center gap-1 font-body text-body w-full sm:w-[408px]">
        <input
          class="py-2 px-3 flex-grow bg-white rounded text-default-inverse border-1 border-default"
          placeholder="Digite seu e-mail"
        />
        <button
          class="py-2 px-3 bg-yellowModal text-white rounded"
          type="button" // prevent form's default behavior
        >
          OK
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
