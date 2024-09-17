import {
  LineError,
  useCreateLineErrorMutation,
  useLinesQuery,
  useUpdateLineErrorMutation,
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
  lineId: z.string().trim().min(1, "必須項目です"),
});

type Props = {
  open: boolean;
  lineError?: LineError;
  setOpen: (open: boolean) => void;
  onClose: () => void;
};

export const LineErrorFormModal = (props: Props) => {
  const { data: { lines = [] } = {} } = useLinesQuery({
    variables: { search: {} },
  });

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LineError>({
    resolver: zodResolver(formDataSchema),
    mode: "onBlur",
    defaultValues: {
      name: props.lineError?.name || "",
      lineId: props.lineError?.lineId || "",
    },
  });

  const [createLineError] = useCreateLineErrorMutation({
    onCompleted: props.onClose,
  });
  const [updateLineError] = useUpdateLineErrorMutation({
    onCompleted: props.onClose,
  });

  const onSubmit = (data: LineError) => {
    if (props.lineError) {
      updateLineError({
        variables: { id: props.lineError?.id, attributes: data },
      });
    } else {
      createLineError({ variables: { attributes: data } });
    }
    reset();
  };

  const handleClose = (isOpen: boolean) => {
    reset();
    props.onClose();
  };

  useEffect(() => {
    if (props.lineError) {
      setValue("name", props.lineError.name);
      setValue("lineId", props.lineError.lineId);
    }
  }, [props.lineError]);

  return (
    <div>
      <Dialog open={props.open} onOpenChange={handleClose}>
       <DialogContent className="sm:max-w-[600px] bg-white flex flex-col items-center justify-center gap-y-16">
          <DialogHeader className="bg-[#eee] py-7 ">
            <DialogTitle className="text-center text-4xl leading-none">
              {props.lineError ? "登録情報更新" : "新規登録"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-full gap-y-9 text-center">
            <div className="w-full text-2xl">
              <label className="ml-3">ライン</label>
              <Select {...register("lineId")} className="block w-full custom-select rounded-md mt-4">
                <option value="" />
                {lines?.map((line) => (
                  <option key={line.id} value={line.id}>
                    {line.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-full">
              <Label className="ml-3" htmlFor="name">頻発停止</Label>
              <Input
                id="name"
                className="w-full mt-4 rounded-md"
                {...register("name")}
                error={errors.name?.message}
              />
            </div>
            <DialogFooter className="flex items-center justify-center py-4 px-40 bg-[#eee]">
              {props.lineError ? <Button onClick={deleteItem} className="flex items-center justify-center gap-x-5 rounded-full border-[#c00] border-[1px] bg-white shadow-btn" >
                <div className="img-div flex items-center justify-center w-7">
                  <Image 
                    src={deleteIcon} 
                    alt="delete" 
                    className="w-full h-auto"
                    /> 
                </div>
                <span className="text-3xl">削除</span>
                </Button> : <></>}
              <Button className="custom-btn bg-[#c00] hover:bg-[#D35050]" type="submit">
                <div className="img-div flex items-center justify-center w-7">
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
