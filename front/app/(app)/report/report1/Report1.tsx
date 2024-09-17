import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import "../styles.css";
import { codes } from "../data";
import { cn } from "@/components/util/utils";
import { Search, FormProps } from "../Search";
import {
  ReportAvailabilityRate,
  useReportAvailabilityRateLazyQuery,
} from "@/api";

const CONTAINER_ID = "chart-container";
const CustomLegend = (props: any) => {
  return (
    <div className="flex items-center gap-x-8 justify-center">
      {props.payload.map((entry: any, index: any) => (
        <div
          key={`item-${index}`}
          style={{ color: entry.color }}
          className="flex items-center gap-x-2"
        >
          <div
            className={cn("h-6 w-10")}
            style={{ backgroundColor: entry.color }}
          />
          <div>{entry.value === "prevValue" ? "前月" : "当月"}</div>
        </div>
      ))}
    </div>
  );
};

type Rate = {
  lineName: string;
  prevValue: number;
  thisValue: number;
};

export const Report1 = () => {
  const [dataValue, setDataValue] = useState<Rate[]>([]);

  const [getReport, { data: result }] = useReportAvailabilityRateLazyQuery({
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      const results = data.reportAvailabilityRate?.map((rate) => ({
        lineName: rate.lineName || "",
        prevValue: rate.prevRate || 0,
        thisValue: rate.rate || 0,
      }));
      if (results) {
        setDataValue(results);
      }

      // 平均値計算
      if (data?.reportAvailabilityRate) {
        calcAvarage(data?.reportAvailabilityRate);
      }
    },
  });

  const [isOpen, setIsOpen] = useState(true);
  const [containerHeight, setContainerHeight] = useState(800);

  let codeOptions = [];
  for (let i = 0; i < codes.length; i++) {
    codeOptions.push({ value: codes[i], label: codes[i] });
  }

  const methods = useForm<FormProps>({
    defaultValues: { fontSize: "12" },
  });

  // 平均値
  const calcAvarage = (data: ReportAvailabilityRate[]) => {
    if (data.length === 0) {
      methods.setValue("avarage", 0);
    } else {
      let sum = 0;
      data?.forEach((item) => {
        sum = (sum + (item.rate || 0)) | (item.prevRate || 0);
      });

      methods.setValue("avarage", sum / data.length);
    }
  };
  const onSubmit = (data: FormProps) => {
    getReport({
      variables: {
        search: {
          month: data.month,
          lineIds: data.lineIds,
          codeIds: data.codeIds,
          exceptZero: data.exceptZero,
        },
      },
    });
  };
  const isStandard = methods.watch("isStandard");
  const standard = methods.watch("standard");

  const isAvarage = methods.watch("isAvarage");
  const avarage = methods.watch("avarage");
  const fontSize = methods.watch("fontSize");

  const CustomLabel = (props: any) => {
    const { x, y, width, value } = props;

    // 0%ラベルは非表示
    if (!value || value === 0) return null;

    return (
      <text
        x={x + width / 2}
        y={y}
        dy={-10}
        fontSize={fontSize}
        textAnchor="middle"
      >
        {value}%
      </text>
    );
  };

  const updateHeight = () => {
    const parentHeight =
      document.getElementById(CONTAINER_ID)?.offsetHeight || 0;
    const diffrence = isOpen ? 200 : 0;
    setContainerHeight(parentHeight - diffrence); // 親コンテナの高さから200pxを引く
  };

  useEffect(() => {
    window.addEventListener("resize", updateHeight);
    updateHeight(); // 初期高さの設定

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    updateHeight(); // 初期高さの設定
  }, [isOpen]);

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        onValueChange={(value) =>
          value === "item-1" ? setIsOpen(true) : setIsOpen(false)
        }
      >
        <AccordionItem
          value="item-1"
          className="border border-borderLight px-4"
        >
          <AccordionTrigger>
            <div className="h-1" />
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <Search reportType="report_rate_last_month" />
                </form>
              </FormProvider>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div
        id={CONTAINER_ID}
        style={{ height: "calc(100vh - 200px)", position: "relative" }}
      >
        <ResponsiveContainer width="100%" height={containerHeight} className="">
          <BarChart
            width={500}
            height={300}
            data={dataValue}
            margin={{
              top: 55,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="lineName" tick={{ fontSize }} />
            <YAxis
              tick={{ fontSize }}
              label={{
                value: "%",
                angle: 0,
                position: "top",
                offset: 20,
              }}
            />
            <Bar dataKey="prevValue" fill="#8884d8">
              <LabelList
                dataKey="prevValue"
                position="top"
                content={<CustomLabel />}
              />
            </Bar>
            <Bar dataKey="thisValue" fill="#82ca9d">
              <LabelList
                dataKey="thisValue"
                position="top"
                content={<CustomLabel />}
              />
            </Bar>
            {isStandard && standard && (
              <ReferenceLine
                y={standard}
                stroke="#d80c18"
                strokeDasharray="6 6"
                strokeWidth={3}
                label={({ viewBox }) => {
                  const { x, y } = viewBox;
                  return (
                    <text
                      x={x + 40}
                      y={y - 10}
                      fill="#d80c18"
                      fontSize={fontSize}
                      textAnchor="end"
                    >
                      {standard}
                    </text>
                  );
                }}
              />
            )}
            {result && (
              <Legend
                verticalAlign="bottom"
                height={36}
                content={<CustomLegend />}
              />
            )}

            {isAvarage && avarage && (
              <ReferenceLine
                y={avarage}
                stroke="#096fc8"
                strokeDasharray="6 6"
                strokeWidth={3}
                label={({ viewBox }) => {
                  const { x, y } = viewBox;
                  return (
                    <text
                      x={x - 10}
                      y={y - 10}
                      fill="#096fc8"
                      fontSize={fontSize}
                      textAnchor="end"
                    >
                      {Math.round(avarage).toLocaleString()}
                    </text>
                  );
                }}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
