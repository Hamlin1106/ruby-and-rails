"use client";

import { Report5 } from "./report5/Report5";
import { Report1 } from "./report1/Report1";
import { cn } from "@/components/util/utils";
import { useState } from "react";
import { ReportErrors } from "./ReportErrors";
import { ReportLineRate } from "./ReportLineRate";

const tabs = [
  { name: "可動率 前月比較", reportType: "report_rate_last_month" },
  { name: "可動率 ライン比較", reportType: "reportLineRate" },
  { name: "可動率 × 頻発停止回数", reportType: "report3" },
  { name: "頻発停止 回数", reportType: "reportError" },
  { name: "労働生産性 推移", reportType: "report_work_rate" },
  { name: "時間あたり出来高", reportType: "report6" },
];

const tabContentClass =
  "h-full mt-2 mx-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function ReportPage() {
  const [active, setActive] = useState<string>("report_rate_last_month");
  return (
    <div className="h-full">
      <div className="border-b border-gray-200">
        <nav className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 m-4">
          {tabs.map((tab) => (
            <div
              key={tab.name}
              onClick={() => setActive(tab.reportType)}
              className={cn(
                tab.reportType === active &&
                  "bg-red text-white font-semibold text-lg shadow-sm",
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-6 py-2 font-medium ring-offset-background transition-all cursor-pointer"
              )}
            >
              {tab.name}
            </div>
          ))}
        </nav>
      </div>

      <div
        className={cn(
          active !== "report_rate_last_month" && "hidden",
          tabContentClass
        )}
      >
        <Report1 />
      </div>
      <div
        className={cn(active !== "reportLineRate" && "hidden", tabContentClass)}
      >
        <ReportLineRate />
      </div>
      <div
        className={cn(active !== "reportError" && "hidden", tabContentClass)}
      >
        <ReportErrors />
      </div>
      <div
        className={cn(
          active !== "report_work_rate" && "hidden",
          tabContentClass
        )}
      >
        <Report5 />
      </div>
      {/* <Tabs defaultValue="report_rate_last_month" className="mt-10 mx-10">
        <TabsList>
          <TabsTrigger value="report_rate_last_month">可動率 前月比較</TabsTrigger>
          <TabsTrigger value="report2">可動率 ライン比較</TabsTrigger>
          <TabsTrigger value="report3">可動率 × 頻発停止回数</TabsTrigger>
          <TabsTrigger value="report4">頻発停止 回数</TabsTrigger>
          <TabsTrigger value="report_work_rate">労働生産性 推移</TabsTrigger>
          <TabsTrigger value="report6">時間あたり出来高</TabsTrigger>
        </TabsList>

        <div className="h-1 border-t border-border my-4" />

        <TabsContent value="report_rate_last_month">
          <Report1 />
        </TabsContent>
        <TabsContent value="report2"></TabsContent>
        <TabsContent value="report3"></TabsContent>
        <TabsContent value="report4"></TabsContent>
        <TabsContent value="report_work_rate">
          <Report5 />
        </TabsContent>
        <TabsContent value="report6"></TabsContent>
      </Tabs> */}
    </div>
  );
}
