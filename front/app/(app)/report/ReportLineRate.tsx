import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  LabelList,
  ReferenceLine,
  Legend,
  Tooltip,
} from "recharts";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { codes } from "./data";
import { Search, FormProps } from "./Search";
import { ReportError, useReportLineRateLazyQuery } from "@/api";
import dayjs from "dayjs";

const CONTAINER_ID = "chart-container-line-rate";

const CustomTickFormatter = (tick: string) => {
  return dayjs(tick).format("M月");
};
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CustomLabel = (props: any) => {
  const { x, y, value } = props;
  return (
    <text x={x} y={y} dy={-10} fontSize={14} textAnchor="middle">
      {value}
    </text>
  );
};

const dateArray = (monthFrom: string, monthTo: string) => {
  const fromDate = new Date(monthFrom);
  const toDate = new Date(monthTo);

  let dateArray = [];
  let currentDate = fromDate;

  while (currentDate <= toDate) {
    dateArray.push(currentDate.toISOString().split("T")[0]);

    currentDate = new Date(currentDate);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return dateArray;
};

const CustomLegend = (props: any) => {
  return (
    <div className="flex items-center gap-x-8 justify-center">
      {props.payload.map((entry: any, index: any) => (
        <div
          key={`item-${index}`}
          style={{ color: entry.color }}
          className="flex items-center gap-x-2"
        >
          <div className="h-6 w-10" style={{ backgroundColor: entry.color }} />
          <div>{entry.value}</div>
        </div>
      ))}
    </div>
  );
};

export const ReportLineRate = () => {
  const [months, setMonths] = useState<string[]>([]);
  let [lineNames, setLineNames] = useState<string[]>([]);
  const [dataValue, setDataValue] = useState<ReportError[]>([]);

  const [getReport] = useReportLineRateLazyQuery({
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      // 平均値計算
      if (data?.reportLineRate) {
        let monthDataList: any = [];
        months.forEach((month) => {
          let monthData: any = {};
          monthData["month"] = month;
          data?.reportLineRate?.forEach((item) => {
            if (item.month === month) {
              monthData[item.lineName] = item.rate;

              if (!lineNames.includes(item.lineName)) {
                // setLineNames([...lineNames, item.lineName]);
                lineNames.push(item.lineName);
              }
            }
          });
          monthDataList.push(monthData);
        });

        setDataValue(monthDataList);
        updateHeight();
        // calcAvarage(data?.reportErrors);
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
  const calcAvarage = (data: ReportError[]) => {
    if (data.length === 0) {
      methods.setValue("avarage", 0);
    } else {
      let sum = 0;
      data?.forEach((item) => {
        sum = sum + (item.count || 0);
      });

      methods.setValue("avarage", sum / data.length);
    }
  };
  const onSubmit = (data: FormProps) => {
    let monthFrom = "";
    let monthTo = "";
    if (data.monthFrom && data.monthFrom?.length > 7) {
      monthFrom = data.monthFrom;
    } else if (data.monthFrom?.length === 7) {
      monthFrom = `${data.monthFrom}-01`;
    } else {
      monthFrom = dayjs().startOf("month").format("YYYY-MM-DD");
    }
    if (data.monthTo && data.monthTo.length > 7) {
      monthTo = data.monthTo;
    } else if (data.monthTo.length === 7) {
      monthTo = `${data.monthTo}-01`;
    } else {
      monthTo = dayjs().add(2, "M").endOf("month").format("YYYY-MM-DD");
    }
    const monthList = dateArray(monthFrom, monthTo);
    setMonths(monthList);
    setLineNames([]);
    getReport({
      variables: {
        search: {
          monthFrom: monthFrom,
          monthTo: monthTo,
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
                  <Search reportType="report_line_rate" />
                </form>
              </FormProvider>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div
        id={CONTAINER_ID}
        style={{ height: "calc(100vh - 180px)", position: "relative" }}
      >
        <ResponsiveContainer width="100%" height={containerHeight} className="">
          <LineChart
            width={500}
            height={900}
            data={dataValue}
            margin={{
              top: 55,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="month" tickFormatter={CustomTickFormatter} />
            <YAxis
              tick={{ fontSize }}
              label={{
                value: "%",
                angle: 0,
                position: "top",
                offset: 20,
              }}
            />
            {lineNames.map((lineName) => (
              <Line
                type="linear"
                dataKey={lineName}
                stroke={getRandomColor()}
                strokeWidth={3}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey={lineName}
                  position="top"
                  content={<CustomLabel />}
                />
              </Line>
            ))}

            {dataValue && <Legend verticalAlign="bottom" height={36} />}
            <Tooltip />
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
