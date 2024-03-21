import { Search } from "./search";

type HeroProps = { searchTerm?: string; totalTitles?: string };

export const Hero = ({ searchTerm, totalTitles }: HeroProps) => (
  <div className="container mx-auto px-4 py-4 text-center lg:px-6 lg:py-8">
    <Search term={searchTerm} />
  </div>
);
