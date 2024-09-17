import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from "recharts";
import dayjs from "dayjs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { formatNumber } from "@/components/util/utils";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ReportDailyLineCode, useReportDailyLineCodesLazyQuery } from "@/api";
import { Search, FormProps } from "../Search";

const CONTAINER_ID = "chart-container5";
const CustomTickFormatter = (tick: string) => {
  return dayjs(tick).format("M/D"); // '2024-07-01' -> '7/1'
};

export const Report5 = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [containerHeight, setContainerHeight] = useState(840);

  // 平均値
  const calcAvarage = (data: ReportDailyLineCode[]) => {
    if (data.length === 0) {
      methods.setValue("avarage", 0);
    } else {
      let sum = 0;
      data?.forEach((item) => {
        sum = sum + item.count;
      });

      methods.setValue("avarage", sum / data.length);
    }
  };
  const methods = useForm<FormProps>({
    defaultValues: { fontSize: "12" },
  });
  const [getReport, { data }] = useReportDailyLineCodesLazyQuery({
    onCompleted: (data) => {
      // 平均値計算
      if (data?.reportDailyLineCodes) {
        calcAvarage(data?.reportDailyLineCodes);
      }
    },
  });

  const onSubmit = (data: FormProps) => {
    getReport({
      variables: {
        search: {
          dateFrom: data.dateFrom,
          dateTo: data.dateTo,
          lineIds: data.lineIds,
          codeIds: data.codeIds,
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
    const { x, y, value } = props;
    return (
      <text
        x={x}
        y={y}
        dy={-10}
        fill="#8884d8"
        fontSize={fontSize}
        textAnchor="middle"
      >
        {formatNumber(value)}
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
  }, [isOpen, data]);

  return (
    <div className="h-full">
      <Accordion
        type="single"
        collapsible
        defaultValue="item-5"
        onValueChange={(value) => {
          value === "item-5" ? setIsOpen(true) : setIsOpen(false);
        }}
      >
        <AccordionItem
          value="item-5"
          className="border border-borderLight px-4"
        >
          <AccordionTrigger>
            <div />
          </AccordionTrigger>
          <AccordionContent>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Search reportType="report_work_rate" />
              </form>
            </FormProvider>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div
        id={CONTAINER_ID}
        style={{ height: "calc(100vh - 200px)", position: "relative" }}
      >
        <ResponsiveContainer width="100%" height={containerHeight} className="">
          <LineChart
            width={500}
            height={900}
            data={data?.reportDailyLineCodes || []}
            margin={{
              top: 55,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" tickFormatter={CustomTickFormatter} />
            <YAxis
              tick={{ fontSize }}
              tickFormatter={formatNumber}
              label={{
                value: "個",
                angle: 0,
                position: "top",
                offset: 20,
              }}
            />
            <Line
              type="linear"
              dataKey="count"
              stroke="#8884d8"
              strokeWidth={3}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="count"
                position="top"
                content={<CustomLabel />}
              />
            </Line>
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
                      {Number(standard).toLocaleString()}
                    </text>
                  );
                }}
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
                      x={x + 40}
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
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
