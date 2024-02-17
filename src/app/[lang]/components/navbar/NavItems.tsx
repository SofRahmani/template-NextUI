import { NavbarItem } from '@nextui-org/navbar'
import NextLink from "next/link";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from 'clsx'
import { Locale } from '@/i18n.config'


export interface NavItemsProps {
  lang: Locale
  content: string;
  path: string;
}

export default function NavItems({ lang, content, path }: NavItemsProps) {
  return (
    <NavbarItem>
      <NextLink
        className={clsx(
          linkStyles({ color: "foreground" }),
          "data-[active=true]:font-medium data-[active=true]:text-primary"
        )}
        color="foreground"
        href={`/${lang}${path}`}
      >
        {content}
      </NextLink>
    </NavbarItem>
  );
}
