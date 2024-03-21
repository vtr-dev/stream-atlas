import { Plus, User } from "lucide-react";
import * as D from "@/components/ui/dialog";
import NewStreamForm from "@/app/streams/_new";

export const TopNav = () => {
  return (
    <nav className="container mx-auto flex w-full items-center justify-between px-4 py-4 lg:px-12">
      <ul className="flex max-h-6 items-center gap-4 text-sm font-medium text-white">
        <li>
          <a
            href="/streams"
            rel="noopener noreferrer"
            className="cursor-pointer transition-transform hover:scale-125 focus:scale-125"
          >
            Início
          </a>
        </li>
        <li>
          <a
            href="/streams/animes"
            className="cursor-pointer transition-transform hover:scale-125 focus:scale-125"
          >
            Animes
          </a>
        </li>
        <li>
          <a
            href="/streams/series"
            className="cursor-pointer transition-transform hover:scale-125 focus:scale-125"
          >
            Séries
          </a>
        </li>
        <li>
          <a
            href="/streams/movies"
            className="cursor-pointer transition-transform hover:scale-125 focus:scale-125"
          >
            Filmes
          </a>
        </li>
      </ul>

      <ul className="flex max-h-6 items-center gap-4 text-sm font-medium text-white">
        <li>
          <D.Dialog>
            <D.DialogTrigger>
              <Plus
                stroke="#000"
                className="cursor-pointer rounded-full bg-white text-2xl transition-transform hover:scale-125 focus:scale-125"
              />
            </D.DialogTrigger>
            <D.DialogContent>
              <NewStreamForm />
            </D.DialogContent>
          </D.Dialog>
        </li>
        <li>
          <User
            stroke="#000"
            className="cursor-pointer rounded-full bg-white text-2xl transition-transform hover:scale-125 focus:scale-125"
          />
        </li>
      </ul>
    </nav>
  );
};
