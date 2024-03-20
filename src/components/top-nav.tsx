import { CircleUserRound, Home } from "lucide-react";
import Image from "next/image";
import { SiGithub as Github, SiDiscord as Discord } from "react-icons/si";

export const TopNav = () => (
  <nav className="container mx-auto flex w-full items-center justify-between px-4 py-4 lg:px-12">
    <a href="/" rel="noopener noreferrer">
      <Home
        fill="#FFF"
        stroke="#000"
        className="cursor-pointer text-2xl transition-transform hover:scale-125 focus:scale-125"
      />
    </a>

    <ul className="flex items-center gap-4 text-sm font-medium text-white">
      <li>
        <CircleUserRound
          stroke="#000"
          className="cursor-pointer rounded-full bg-white text-2xl transition-transform hover:scale-125 focus:scale-125"
        />
      </li>
    </ul>
  </nav>
);
