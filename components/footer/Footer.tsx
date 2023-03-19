import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Container from "$store/components/ui/Container.tsx";

import Newsletter from "./Newsletter.tsx";
import type { ComponentChildren } from "preact";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem(
  { item, class: _class = "" }: { item: Item; class?: string },
) {
  return (
    <Text variant="caption" tone="default-inverse" class={_class}>
      {isIcon(item)
        ? (
          <div class="border-default border-1 py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </Text>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 sm:py-12 sm:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
}

function Footer({ sections = [] }: Props) {
  const paymentOptions = [
    {
      id: "MasterCard",
      label: "MasterCard",
    },
    {
      id: "Visa",
      label: "Visa",
    },
    {
      id: "DinersClub",
      label: "DinersClub",
    },
    {
      id: "Boleto",
      label: "Boleto",
    },
    {
      id: "Amex",
      label: "Amex",
    },
    {
      id: "Hipercard",
      label: "Hipercard",
    },
    {
      id: "Elo",
      label: "Elo",
    },
  ];
  return (
    <footer class="w-full bg-secondaryBlue flex flex-col divide-y-1 divide-default">
      <div>
        <Container class="w-full flex flex-col divide-y-1 divide-default">
          <FooterContainer>
            <Newsletter />
          </FooterContainer>

          <FooterContainer class="bg-[#ECF2F6]">
            {/* Desktop view */}
            <ul class="hidden sm:flex flex-row gap-20">
              {sections.map((section) => (
                <li>
                  <div>
                    <Text
                      variant="heading-3"
                      tone="default-inverse"
                      class="text-priceColor"
                    >
                      {section.label}
                    </Text>

                    <ul
                      class={`flex ${
                        isIcon(section.children[0]) ? "flex-row" : "flex-col"
                      } gap-2 pt-2`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem
                            item={item}
                            class="text-secondaryTextColor opacity-60"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mobile view */}
            <ul class="flex flex-col sm:hidden sm:flex-row gap-4">
              {sections.map((section, idx) => (
                <li>
                  <Text variant="body" tone="default-inverse">
                    <details
                      class={`${
                        idx === 2 ? "" : "border-b-1 border-[#C9C9C9]"
                      }`}
                      open={idx === 2}
                    >
                      <summary class="text-priceColor mb-4">
                        {section.label}
                      </summary>

                      <ul
                        class={`flex ${
                          isIcon(section.children[0]) ? "flex-row" : "flex-col"
                        } gap-2 px-2 pt-2 pb-4`}
                      >
                        {section.children.map((item) => (
                          <li>
                            <SectionItem
                              item={item}
                              class="text-secondaryTextColor opacity-60"
                            />
                          </li>
                        ))}
                      </ul>
                    </details>
                  </Text>
                </li>
              ))}
            </ul>
          </FooterContainer>
        </Container>
      </div>

      <div>
        <Container class="w-full bg-white">
          <FooterContainer class="flex flex-col justify-between w-full">
            <Text class="text-xs text-lightGray">
              Livro Fácil @Copyright 2018 | Todos os direitos reservados CNPJ:
              96.318.142/0016-57 | Rodovia Presidente Dutra km 136 bloco 2 -
              Eugênio de Melo São José dos Campos / SP CEP: 12247-004 (Centro de
              Distribuição)
            </Text>
          </FooterContainer>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
