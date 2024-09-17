import {
  Line,
  useCreateLineMutation,
  useFactoriesQuery,
  useUpdateLineMutation,
} from "@/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useEffect } from "react";
import Image from 'next/image'; 
import deleteIcon from "@/public/images/delete-icon.svg";
import addIcon from "@/public/images/add-icon.svg";

const formDataSchema = z.object({
  name: z.string().trim().min(1, "必須項目です"),
  factoryId: z.string().trim().min(1, "必須項目です"),
  takt: z.number().positive(),
});

type Props = {
  open: boolean;
  line?: Line;
  setOpen: (open: boolean) => void;
  onClose: () => void;
};

export const LineFormModal = (props: Props) => {
  const { data: { factories = [] } = {} } = useFactoriesQuery();
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Line>({
    resolver: zodResolver(formDataSchema),
    mode: "onBlur",
    defaultValues: {
      name: props.line?.name || "",
      factoryId: props.line?.factoryId || "",
      takt: props.line?.takt,
    },
  });
  const [createLine] = useCreateLineMutation({ onCompleted: props.onClose });
  const [updateLine] = useUpdateLineMutation({ onCompleted: props.onClose });

  const onSubmit = (data: Line) => {
    if (props.line) {
      updateLine({
        variables: { id: props.line?.id, attributes: data },
      });
    } else {
      createLine({ variables: { attributes: data } });
    }
    reset();
  };

  const handleClose = (isOpen: boolean) => {
    reset();
    props.onClose();
  };

  useEffect(() => {
    if (props.line) {
      setValue("name", props.line.name);
      setValue("factoryId", props.line.factoryId);
      setValue("takt", props.line.takt);
    }
  }, [props.line]);

  return (
    <div>
      <Dialog open={props.open} onOpenChange={handleClose}>
        {/* <DialogTrigger asChild>
        <div
          className="ml-auto text-link underline cursor-pointer"
          onClick={props.onOpen}
        >
          現在の検索条件を保存
        </div>
      </DialogTrigger> */}
        <DialogContent className="sm:max-w-[600px] bg-white flex flex-col items-center justify-center gap-y-16">
          <DialogHeader className="bg-[#eee] py-7">
            <DialogTitle className="text-center">
              {props.line ? "登録情報更新" : "新規登録"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-full gap-y-9 text-center">
            <div className="w-full">
              <label className="ml-3">工場</label>
              <Select {...register("factoryId")} className="block w-full custom-select rounded-md mt-4">
                <option />
                {factories?.map((factory) => (
                  <option key={factory.id} value={factory.id}>
                    {factory.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-full">
              <Label className="ml-3" htmlFor="name">ライン名</Label>
              <Input
                id="name"
                className="w-full mt-4 rounded-md"
                {...register("name")}
                error={errors.name?.message}
              />
            </div>
            <div className="w-full">
              <Label className="ml-3" htmlFor="takt">タクトタイム（秒）</Label>
              <Input
                id="takt"
                className="w-full mt-4 rounded-md"
                type="number"
                step="0.1"
                {...register("takt", { valueAsNumber: true })}
                error={errors.takt?.message}
              />
            </div>
            <DialogFooter className="flex items-center justify-center py-4 px-40 bg-[#eee]">
              {props.line ? <Button onClick={deleteItem} className="flex items-center justify-center gap-x-5 rounded-full border-[#c00] border-[1px] bg-white shadow-btn" >
                <div className="img-div flex items-center justify-center w-7">
                  <Image 
                    src={deleteIcon} 
                    alt="delete" 
                    className="w-full h-auto"
                    /> 
                </div>
                <span className="text-3xl">削除</span>
                </Button> : <></>}
              <Button className="custom-btn rounded-full bg-[#c00] hover:bg-[#D35050]" type="submit">
                <div className="img-div flex items-center justify-center w-6">
                  <Image 
                    src={addIcon} 
                    alt="register" 
                    className="w-full h-auto"
                    /> 
                </div>
                <span className="text-3xl">保存</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
