"use client";

import { Suspense } from "react";
import { Tab } from "../Tab";
import { LineErrorTable } from "./LineErrorTable";

export default function LinesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="border-l-2 w-full px-12 border-white">
        <div className="border-b-2 w-full flex items-center border-white bg-[#ddd]">
          <Tab />
        </div>

        <LineErrorTable />
      </div>
    </Suspense>
  );
}
