"use client";

import { cn } from "@/components/util/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "品番", href: "/master/codes" },
  { name: "ライン", href: "/master/lines" },
  { name: "頻発停止", href: "/master/errors" },
  { name: "人員配置", href: "/master/line-users" },
  { name: "製品", href: "/master/products" },
  { name: "工場", href: "/master/factories" },
  { name: "分析 | 検索条件", href: "/master/search-conditions" },
];

export const Tab = () => {
  const pathname = usePathname();
  return (
    <nav className="inline-flex h-10 items-center justify-center gap-x-3 m-auto mt-5 mb-2">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          className={cn(
            pathname === tab.href &&
              "bg-red",
            "inline-flex items-center justify-center whitespace-nowrap p-4 font-semibold ring-offset-background transition-all cursor-pointer text-white text-lg text-center shadow-sm rounded-t-lg w-44 bg-[#777]"
          )}
          href={tab.href}
        >
          {tab.name}
        </Link>
      ))}
    </nav>
  );
};
