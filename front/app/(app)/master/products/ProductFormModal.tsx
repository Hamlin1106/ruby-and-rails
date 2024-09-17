import {
  Product,
  useCreateProductMutation,
  useFactoriesQuery,
  useRemoveProductMutation,
  useUpdateProductMutation,
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
import { useEffect, useState } from "react";
import Image from 'next/image'; 
import deleteIcon from "@/public/images/delete-icon.svg";
import addIcon from "@/public/images/add-icon.svg";

const formDataSchema = z.object({
  name: z.string().trim().min(1, "必須項目です"),
  factoryId: z.string().trim().min(1, "必須項目です"),
});

type Props = {
  open: boolean;
  product?: Product;
  setOpen: (open: boolean) => void;
  onClose: () => void;
  refetch: () => void;
};

export const ProductFormModal = (props: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { data: { factories = [] } = {} } = useFactoriesQuery({
    variables: { search: {} },
  });

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(formDataSchema),
    mode: "onBlur",
    defaultValues: {
      name: props.product?.name || "",
      factoryId: props.product?.factoryId || "",
    },
  });

  const [createProduct] = useCreateProductMutation({
    onCompleted: (data) => {
      if (!data.createProduct.error) {
        reset();
        props.onClose();
        props.refetch();
      }
    },
  });
  const [updateProduct] = useUpdateProductMutation({
    onCompleted: (data) => {
      if (!data.updateProduct.error) {
        reset();
        props.onClose();
        props.refetch();
      }
    },
  });
  const [removeProduct] = useRemoveProductMutation({
    onCompleted: (data) => {
      if (!data.removeProduct.error) {
        reset();
        props.onClose();
        props.refetch();
      } else {
        setErrorMessage(data.removeProduct.error);
      }
    },
  });

  const onSubmit = (data: Product) => {
    if (props.product) {
      updateProduct({
        variables: { id: props.product?.id, attributes: data },
      });
    } else {
      createProduct({ variables: { attributes: data } });
    }
    reset();
  };

  const handleRemove = () => {
    if (props.product?.id && confirm("削除してよろしいですか？")) {
      removeProduct({ variables: { id: props.product?.id } });
    }
  };

  const handleClose = (isOpen: boolean) => {
    reset();
    setErrorMessage("");
    props.onClose();
  };

  useEffect(() => {
    if (props.product) {
      setValue("name", props.product.name);
      setValue("factoryId", props.product.factoryId);
    }
  }, [props.product]);

  return (
    <div>
      <Dialog open={props.open} onOpenChange={handleClose}>
         <DialogContent className="sm:max-w-[600px] bg-white flex flex-col items-center justify-center gap-y-16">
          <DialogHeader className="bg-[#eee] py-7 ">
            <DialogTitle className="text-center text-4xl leading-none">
              {props.product ? '登録情報更新' : "新規登録"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-full gap-y-9 text-center">
            {errorMessage && <p className="text-error">{errorMessage}</p>}
            <div className="w-full">
              <label className="ml-3">工場</label>
              <Select {...register("factoryId")} className="block w-full custom-select rounded-md mt-4">
                <option value="" />
                {factories?.map((factory) => (
                  <option key={factory.id} value={factory.id}>
                    {factory.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-full">
              <Label className="ml-3" htmlFor="name">製品名</Label>
              <Input
                id="name"
                className="w-full mt-4 rounded-md"
                {...register("name")}
                error={errors.name?.message}
              />
            </div>
            <DialogFooter className="flex items-center justify-center py-4 px-40 bg-[#eee]">
              {props.product ? <Button onClick={deleteItem} className="flex items-center justify-center gap-x-5 rounded-full border-[#c00] border-[1px] bg-white shadow-btn" >
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
