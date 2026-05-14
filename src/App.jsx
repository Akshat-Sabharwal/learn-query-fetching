import { Fetcher } from "./components/Fetcher";
import { Providers } from "./components/Providers";
import { Stats } from "./components/Stats";

export const App = () => {
  return (
    <Providers>
      <div className="w-full h-[100vh] flex p-8">
        <Fetcher />
        <Stats />
      </div>
    </Providers>
  );
};
