import { Search } from "./search";

type HeroProps = { searchTerm?: string; totalTitles?: string };

export const Hero = ({ searchTerm, totalTitles }: HeroProps) => (
  <div className="container mx-auto px-4 py-8 text-center lg:px-12 lg:py-16">
    <Search term={searchTerm} />
  </div>
);
