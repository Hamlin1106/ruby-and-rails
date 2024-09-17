import { useFactoriesQuery, useLinesQuery } from "@/api";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select as SelectComponent } from "@/components/ui/Select";

import Select, { MultiValue } from "react-select";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import Image from 'next/image'; 
import searchIcon from "@/public/images/search-icon.svg";

const customStyles = {
  menu: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? "blue" : "#404040",
    zIndex: 9999, // 高い値を設定して前面に表示する
  }),
};

interface Option {
  value: string;
  label: string;
}

export const Search = () => {
  const searchParams = useSearchParams();
  const lineIds = searchParams.get("lineIds")?.split(",") || [];
  const { register, watch, setValue } = useFormContext();
  const { data: { factories } = {} } = useFactoriesQuery();
  const { data: { lines = [] } = {} } = useLinesQuery({
    variables: { search: {} },
  });

  const lineOptions = lines?.map((line) => ({
    value: line.id,
    label: line.name,
  }));

  return (
    <div className="w-fit m-auto flex items-center gap-x-8">
      <div className="flex items-center gap-x-4">
        <Label className="w-fit">工場</Label>
        <SelectComponent className="w-[160px] custom-select rounded-md" 
          onChange={(e) => {
            setValue("factoryId", e.target.value);
          }}
        >
          <option value=""></option>
          {factories?.map((factory) => (
            <option key={`factory-${factory.id}`} value={factory.id}>
              {factory.name}
            </option>
          ))}
        </SelectComponent>
      </div>

      {/* <div className="flex items-center gap-x-2">
        <Label className="w-10">製品</Label>
        <SelectComponent onChange={() => {}}>
          <option>ブシュ</option>
        </SelectComponent>
      </div> */}

      <div className="flex items-center gap-x-4">
        <Label className="w-14">ライン</Label>
        {lineOptions && (
          <Select
            value={lineOptions.filter(
              (option) =>
                watch("lineIds")?.includes(option.value) ||
                lineIds.includes(option.value)
            )}
            options={lineOptions}
            isMulti
            isSearchable
            styles={customStyles}
            className="rounded-md custom-select"
            placeholder="ラインを選択"
            onChange={(selectedOptions: MultiValue<Option>) => {
              const values = selectedOptions.map((option) => option.value);
              setValue("lineIds", values);
            }}
          />
        )}
      </div>

      <div className="flex items-center gap-x-4">
        <Label>キーワード</Label>
        <Input placeholder="" {...register("keyword")} className="rounded-md"/>
      </div>

      <Button type="submit" className="custom-btn bg-[#002060]">
        <div className="img-div flex items-center justify-center w-7">
          <Image 
            src={searchIcon} 
            alt="Search" 
            className="w-full h-auto"
            /> 
        </div>
        <span>検索</span>
      </Button>
    </div>
  );
};
