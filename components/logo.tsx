import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const font = localFont({
  src: "../public/fonts/font.woff2"
});
export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="logo" height={30} width={30} />
        <p
          className={cn(
            "text-lg text-violet-800 font-black pb-1",
            font.className
          )}
        >
          Task Manangment
        </p>
      </div>
    </Link>
  );
};
