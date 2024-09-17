import {
  useCodesQuery,
  useLinesQuery,
  useSearchConditionsLazyQuery,
  SearchCondition,
} from "@/api";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select as SelectComponent } from "@/components/ui/Select";
import { Separator } from "@/components/ui/Separator";
import { useFormContext } from "react-hook-form";
import Select, { MultiValue } from "react-select";
import { SearchConditionModal } from "./SearchConditionModal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useEffect, useState } from "react";

export type FormProps = {
  reportType:
    | "report_rate_last_month"
    | "report_error"
    | "report_line_rate"
    | "report_work_rate";
  lineIds: string[];
  codeIds: string[];
  dateFrom: string;
  dateTo: string;
  monthFrom: string;
  monthTo: string;
  month: string;
  isStandard: boolean;
  standard: number;
  isAvarage: boolean;
  avarage: number;
  exceptZero: boolean;
  fontSize: string;
};
const customStyles = {
  menu: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? "blue" : "grey",
    zIndex: 9999, // 高い値を設定して前面に表示する
  }),
};
interface Option {
  value: string;
  label: string;
}

type Props = {
  reportType:
    | "report_rate_last_month"
    | "report_work_rate"
    | "report_error"
    | "report_line_rate";
};
export const Search = ({ reportType }: Props) => {
  const [open, setOpen] = useState(false);
  const [getSearchCondition, { data, refetch }] =
    useSearchConditionsLazyQuery();
  const { data: { lines = [] } = {} } = useLinesQuery({
    variables: { search: {} },
  });
  const { data: { codes = [] } = {} } = useCodesQuery({
    variables: { search: {} },
  });
  const { register, watch, setValue } = useFormContext();
  const [selectedSearchCondition, setSelectedSearchCondition] =
    useState<SearchCondition>();
  const isStandard = watch("isStandard");
  const isAvarage = watch("isAvarage");
  const exceptZero = watch("exceptZero");

  const codeOptions = codes?.map((code) => ({
    value: code.id,
    label: code.name,
  }));

  const lineOptions = lines?.map((line) => ({
    value: line.id,
    label: line.name,
  }));

  const lineIds = watch("lineIds");
  const filterCodeOptions = (selectedLineIds: string[]) => {
    if (!selectedLineIds || selectedLineIds?.length === 0) return codeOptions;

    const filteredCodes = codes?.filter((code) => {
      if (selectedLineIds.includes(code.lineId)) return code;
    });

    return filteredCodes?.map((code) => ({
      value: code.id,
      label: code.name,
    }));
  };

  useEffect(() => {
    getSearchCondition({ variables: { search: { reportType: reportType } } });
  }, [reportType]);

  return (
    <div>
      <div>
        <div className="flex items-center gap-x-2">
          <label>検索条件</label>
          <SelectComponent
            onChange={(e) => {
              const condition = data?.searchConditions?.find(
                (condition) => condition.id === String(e.target.value)
              );

              if (condition) {
                setSelectedSearchCondition(condition);
                setValue("lineIds", condition.lineIds);
                setValue("codeIds", condition.codeIds);
                setValue("dateFrom", condition.dateFrom);
                setValue("dateTo", condition.dateTo);
                setValue("monthFrom", condition.monthFrom);
                setValue("monthTo", condition.monthTo);
                setValue("month", condition.month);
                setValue("searchConditionId", condition.id);
                setValue("isStandard", condition.isStandard);
                setValue("standard", condition.standard);
                setValue("isAvarage", condition.isAvarage);
                setValue("exceptZero", condition.exceptZero);
                setValue("fontSize", condition.fontSize);
              } else {
                setSelectedSearchCondition(undefined);
              }
            }}
          >
            <option />
            {data?.searchConditions?.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.name}
              </option>
            ))}
          </SelectComponent>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center gap-x-6">
        <div className="flex-1">
          <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-2">
              <Label className="w-10">工場</Label>
              <SelectComponent onChange={() => {}}>
                <option>本社第一</option>
              </SelectComponent>
            </div>

            <div className="flex items-center gap-x-2">
              <Label className="w-10">期間</Label>
              {["report_error", "report_work_rate"].includes(reportType) && (
                <>
                  <input
                    type="date"
                    className="border border-border p-2 rounded-md"
                    {...register("dateFrom")}
                  />
                  <span>〜</span>
                  <input
                    type="date"
                    className="border border-border p-2 rounded-md"
                    {...register("dateTo")}
                  />
                </>
              )}

              {["report_line_rate"].includes(reportType) && (
                <>
                  <input
                    type="month"
                    className="border border-border p-2 rounded-md"
                    {...register("monthFrom")}
                  />
                  <span>〜</span>
                  <input
                    type="month"
                    className="border border-border p-2 rounded-md"
                    {...register("monthTo")}
                  />
                </>
              )}

              {reportType === "report_rate_last_month" && (
                <input
                  type="month"
                  className="border border-border p-2 rounded-md"
                  {...register("month")}
                />
              )}
            </div>

            <div className="flex items-center gap-x-2 ml-auto">
              {[
                "report_rate_last_month",
                "report_error",
                "report_line_rate",
              ].includes(reportType) && (
                <div className="flex items-center gap-x-2">
                  <Checkbox
                    id="exceptZero"
                    checked={exceptZero}
                    onCheckedChange={(check) => {
                      check
                        ? setValue("exceptZero", true)
                        : setValue("exceptZero", false);
                    }}
                    label="ゼロ除外"
                  />
                </div>
              )}

              <div className="flex items-center gap-x-2">
                <Checkbox
                  id="isAvarage"
                  checked={isAvarage}
                  onCheckedChange={(check) => {
                    check
                      ? setValue("isAvarage", true)
                      : setValue("isAvarage", false);
                  }}
                  label="平均値"
                />
              </div>

              <div className="flex items-center gap-x-2">
                <Checkbox
                  id="isStandard"
                  checked={isStandard}
                  onCheckedChange={(check) => {
                    check
                      ? setValue("isStandard", true)
                      : setValue("isStandard", false);
                  }}
                  label="基準値"
                />
              </div>
              <Input
                type="number"
                {...register("standard", { valueAsNumber: true })}
                disabled={!isStandard}
                className="w-24"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-x-6">
            <div className="flex items-center gap-x-2">
              <Label className="w-10">製品</Label>
              <SelectComponent onChange={() => {}}>
                <option>ブシュ</option>
              </SelectComponent>
            </div>

            <div className="flex items-center gap-x-2">
              <Label className="w-14">ライン</Label>
              {lineOptions && (
                <Select
                  value={lineOptions.filter((option) =>
                    watch("lineIds")?.includes(option.value)
                  )}
                  options={lineOptions}
                  isMulti
                  isSearchable
                  styles={customStyles}
                  placeholder="ラインを選択"
                  onChange={(selectedOptions: MultiValue<Option>) => {
                    const values = selectedOptions.map(
                      (option) => option.value
                    );
                    setValue("lineIds", values);
                  }}
                />
              )}
            </div>

            <div className="flex items-center gap-x-2">
              <Label className="w-10">品番</Label>
              <Select
                options={filterCodeOptions(lineIds)}
                value={filterCodeOptions(lineIds)?.filter((option) =>
                  watch("codeIds")?.includes(option.value)
                )}
                isMulti
                isSearchable
                placeholder="品番を選択"
                className="min-w-60"
                onChange={(selectedOptions: MultiValue<Option>) => {
                  const values = selectedOptions.map((option) => option.value);
                  setValue("codeIds", values);
                }}
              />
            </div>

            <div className="flex items-center gap-x-2">
              <Label className="w-28 whitespace-nowrap">フォントサイズ</Label>
              <RadioGroup
                defaultValue="12"
                value={watch("fontSize")}
                className="flex items-center"
                onValueChange={(value) => {
                  setValue("fontSize", value);
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="12" id="small" className="w-3 h-3" />
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="16" id="middle" className="w-4 h-4" />
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20" id="large" className="w-5 h-5" />
                </div>
              </RadioGroup>
            </div>

            <SearchConditionModal
              searchCondition={selectedSearchCondition}
              open={open}
              setOpen={setOpen}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              refetch={refetch}
              reportType={reportType}
              exceptZero={exceptZero}
              lineIds={watch("lineIds")}
              codeIds={watch("codeIds")}
              dateFrom={watch("dateFrom")}
              dateTo={watch("dateTo")}
              monthFrom={watch("monthFrom")}
              monthTo={watch("monthTo")}
              month={watch("month")}
              isStandard={watch("isStandard")}
              standard={watch("standard")}
              isAvarage={watch("isAvarage")}
              avarage={watch("avarage")}
              fontSize={watch("fontSize")}
            />
          </div>
        </div>
        <div className="w-20 ml-auto">
          <Button
            type="submit"
            intent="default"
            className="w-full h-20 text-xl shadow-md"
          >
            集計
          </Button>
        </div>
      </div>
    </div>
  );
};
