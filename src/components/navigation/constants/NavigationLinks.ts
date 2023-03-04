import { SignOutIcon } from 'src/components/icons/SignOutIcon';
import {
  HouseIcon,
  CalendarIcon,
  UsersIcon,
  ChartBarIcon,
  UserCircleIcon,
  ComputerIcon,
} from "../../icons";

const LinkStyles = "w-7 h-7 md:w-8 md:h-8";


export const NavigationLinks = [
  {
    name: "Reports",
    href: "/reports",
    icon: CalendarIcon({ className: LinkStyles }),
  },
  {
    name: "Games",
    href: "/allGames",
    icon: CalendarIcon({ className: LinkStyles }),
  },
  {
    name: "Outgoing ",
    href: "/otrades",
    icon: UsersIcon({ className: LinkStyles }),
  },
  {
    name: "Received ",
    href: "/rtrades",
    icon: ChartBarIcon({ className: LinkStyles }),
  },
  {
    name: "Profile",
    href: "/Profile",
    icon: UserCircleIcon({ className: LinkStyles }),
  },
  {
    name: "Sign Out",
    href: "/auth/desktopSignin",
    icon: SignOutIcon({ className: LinkStyles })

  }
];



