import { LocaleSwitcher } from "lingo.dev/react/client";

export default function AppLocaleSwitcher() {
  return (
    <div className="absolute top-2 right-3 z-50 flex flex-col items-center">
      <LocaleSwitcher
        locales={["en", "fr", "ar"]}
        className="border border-gray-800 rounded-md py-2 px-3 text-white bg-primary cursor-pointer hover:bg-primary/80 transition-colors"
      />
    </div>
  );
}
