"use client";

import { Suspense } from "react";
import { Tab } from "../Tab";
import { SearchConditionTable } from "./SearchConditionTable";

export default function LinesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="border-l-2 w-full px-12 border-white">
        <div className="border-b-2 w-full flex items-center bg-[#ddd]">
          <Tab />
        </div>

        <SearchConditionTable />
      </div>
    </Suspense>
  );
}
