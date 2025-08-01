import Image from "next/image";


import KlaviyoFeedEditor from "./components/KlaviyoFeedEditor";
import KeyValueEditor from "./components/KeyValueEditor";
export default function Home() {
  return (
    <div className="min-h-screen p-10 flex flex-col items-center gap-10 bg-gray-50">
      <Image
        className="dark:invert"
        src="https://cdn.shopify.com/s/files/1/2423/6599/files/logolockup_sticker.png"
        alt="Logo"
        width={180}
        height={38}
        priority
        unoptimized
      />

      {/* Both feeds in one row */}
      <div className="flex flex-col lg:flex-row justify-center gap-10 w-full max-w-6xl">
        <KlaviyoFeedEditor />
        <KeyValueEditor />
      </div>

      <footer className="mt-10 text-center text-sm text-gray-500">
        Custom App developed by Retrospec Tech team
      </footer>
    </div>
  );
}
