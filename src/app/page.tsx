import Image from "next/image";


import KlaviyoFeedEditor from "./components/KlaviyoFeedEditor";
import KeyValueEditor from "./components/KeyValueEditor";
export default function Home() {
  return (
    <div className="min-h-screen p-2 flex flex-col items-center gap-10 ">
      <Image
        className="dark:invert"
        src="https://cdn.shopify.com/s/files/1/2423/6599/files/logolockup_sticker.png"
        alt="Logo"
        width={100}
        height={38}
        priority
        unoptimized
      />
            <h1 className="text-lg font-bold text-black font-[family-name:var(--font-geist-mono)]">Klaviyo Custom Product </h1>


      {/* Both feeds in one row */}
      <div className="flex flex-col lg:flex-row justify-center gap-10 w-full max-w-6xl">
        <KlaviyoFeedEditor />
        <KeyValueEditor />
      </div>

      <p className="mt-10 text-center text-lg text-red-600 font-[family-name:var(--font-geist-mono)]
              border border-red-600 rounded-md p-4 relative w-fit mx-auto bg-red-50">
  <span className="absolute -top-3 left-4 bg-red-50 px-2 text-sm font-semibold">Note:</span>
  When you preview a product on the Klaviyo template, feed updates may take a few minutes due to Git CDN caching.
</p>


      <footer className="mt-10 text-center  text-sm text-gray-800 font-[family-name:var(--font-geist-mono)]">
        Custom App developed by Retrospec Tech team
      </footer>
    </div>
  );
}
