import Link from "next/link";
import { NavigationLink } from "../types";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSession } from "src/hooks";
type Props = {
  selected: string;
  links: NavigationLink[];
  className: string;
};

export const DesktopNavigation = ({ selected, links, className }: Props) => {
  const [rawUser, setRawUser] = useState<any>();
  const { data: session } = useSession();
  if (rawUser === undefined && session !== undefined) {
    setRawUser(session);
  }
  if (rawUser !== undefined && session !== undefined) {
    console.log(rawUser);
    console.log(session);
  }
  return (
    <nav
      className={`${className} fixed left-6 top-[5%] flex
h-[90%] w-28 flex-col  rounded-md pt-[4%]
bg-slate-200/90`}
    >
      <ul className={`flex h-full w-full flex-col `}>
        {rawUser !== undefined && rawUser.verified === true && (
          <li>
            <Link
              className="relative mb-[50%] flex flex-col items-center justify-center text-center text-gray-500 duration-200 hover:text-black"
              href={`${links.at(0)?.href}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>

              <span className="overflow-hidden">{links.at(0)?.name}</span>
            </Link>
          </li>
        )}
        {links.map((link) => {
          return (
            <li key={link.name}>
              {!link.name.includes("Reports") && (
                <Link
                  className="relative mb-[50%] flex flex-col items-center justify-center overflow-hidden text-center text-gray-500 duration-200 hover:text-black"
                  href={link.href}
                >
                  {link.name.includes("Reports") ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  ) : (
                    link.icon
                  )}
                  <span className="overflow-hidden">{link.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
