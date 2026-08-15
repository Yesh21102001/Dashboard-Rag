import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

export default function GridTopbar() {
  return (
    <header className="flex justify-between items-center w-full px-md h-12 z-50 bg-surface-container-lowest border-b border-outline-variant shrink-0 transition-colors duration-150 ease-in-out">
      <div className="flex items-center gap-md">
        <span className="font-headline-md text-headline-md font-bold text-primary">
          RAG-Test-Platform
        </span>
      </div>

      <div className="flex items-center gap-sm">
        <div className="relative hidden md:block mr-md">
          <Icon
            name="search"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]"
          />
          <input
            className="pl-8 pr-3 py-1 bg-surface-container border border-outline-variant rounded-DEFAULT text-body-sm focus:outline-none focus:border-primary transition-colors h-7 w-64 text-on-surface placeholder:text-outline"
            placeholder="Search..."
            type="text"
          />
        </div>

        <div className="flex items-center gap-xs">
          <button className="w-8 h-8 flex items-center justify-center rounded-DEFAULT text-on-surface-variant hover:bg-surface-container transition-colors duration-150 ease-in-out">
            <Icon name="notifications" className="text-[20px]" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-DEFAULT text-on-surface-variant hover:bg-surface-container transition-colors duration-150 ease-in-out">
            <Icon name="smart_toy" className="text-[20px]" />
          </button>
        </div>

        <div className="h-5 w-px bg-outline-variant mx-sm" />

        <span className="font-label-caps text-label-caps text-primary-container px-2 py-1 bg-secondary-container rounded-DEFAULT flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary block" />
          RAG Sync Active
        </span>

        <Link href="/profile" className="w-7 h-7 rounded-full bg-surface-variant ml-sm flex items-center justify-center border border-outline-variant overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
          <Image
            alt="User Profile"
            className="w-full h-full object-cover"
            width={28}
            height={28}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKlTtlJVoS2Hy8BSWUm4tF4aUbbe7DIrLAJpVPr0TX80mFIKAeVN0SFRT7Etk-ZAPGZW0OC4Jtc9POULA2dS68IAhWb0nd27gSx3HmeQNT-cKcGWWo-pz1bWYmNRZ-3IyRB9FfMgforDUw7D89K5xY03NUzu35wZZNEUrTjU3S5hCMOW-SSB6Q3FvZdEAYmyY5ESGMdeuRF4ZPNtaXQD2ZCEMJlgzzoJ1cihfxGT-khY4_SSML_dNg"
          />
        </Link>
      </div>
    </header>
  );
}
