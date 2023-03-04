import React, { useState } from "react";
import { type NavigationLink } from "../types";
import Link from "next/link";
import { Settings } from "./Settings";
import Image from "next/image";

type Props = {
  selected: string;
  className: string;
  links: NavigationLink[];
};

export const MobileNavigation = ({ selected, links, className }: Props) => {
  const [settings, setSettings] = useState(false);

  const toggleSettings = () => setSettings((prev) => !prev);
  const closeSettings = () => setSettings(false);

  return (
    <>
      <nav
        className={`${className} fixed bottom-0 flex w-full bg-slate-200/90 py-2 shadow-md md:py-4`}
      >
        <ul className="flex w-full items-center justify-evenly">
          {links.map((link) => {
            if (link.name !== "Profile") {
              return (
                <li key={link.name}>
                  <Link href={link.href}>{link.icon}</Link>
                </li>
              );
            }

            // return (
            //   <li onClick={toggleSettings} key={link.name}
            //     className={`${settings ? 'cursor-pointer pointer-events-none' : 'cursor-pointer pointer-events-auto '}`} >
            //     {
            //       session?.user?.image ? (
            //         <Image className='w-7 h-7 md:w-9 sm:h-9 rounded-full object-cover'
            //           priority={true} width={36} height={36} src={session?.user?.image} alt='' />
            //       ) : (
            //         link.icon
            //       )
            //     }
            //   </li>
            // )
          })}
        </ul>
      </nav>
      <Settings settings={settings} setSettings={closeSettings} />
    </>
  );
};
