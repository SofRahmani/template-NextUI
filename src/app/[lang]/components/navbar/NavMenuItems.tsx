import { NavbarMenuItem } from '@nextui-org/navbar'
import { Link } from "@nextui-org/link";
import { Locale } from '@/i18n.config'


export interface NavMenuItemsProps {
  lang: Locale
  content: string;
  path: string;
}

export default function NavMenuItems({ lang, content, path }: NavMenuItemsProps) {
  return (
    <NavbarMenuItem>
      <Link color={`foreground`} href={`/${lang}${path}`} size="lg">
        {content}
      </Link>
    </NavbarMenuItem>
  );
}
