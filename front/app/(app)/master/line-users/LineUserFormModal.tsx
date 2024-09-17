import {
  LineUser,
  useCreateLineUserMutation,
  useLinesQuery,
  useRemoveLineUserMutation,
  useUpdateLineUserMutation,
  useUsersQuery,
} from "@/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useEffect } from "react";
import Image from 'next/image'; 
import deleteIcon from "@/public/images/delete-icon.svg";
import addIcon from "@/public/images/add-icon.svg";

type Props = {
  open: boolean;
  lineUser?: LineUser;
  setOpen: (open: boolean) => void;
  onClose: () => void;
  refetch: () => void;
};

export const LineUserFormModal = (props: Props) => {
  const { data: { users = [] } = {} } = useUsersQuery();
  const { data: { lines = [] } = {} } = useLinesQuery({
    variables: { search: {} },
  });
  const { register, setValue, reset, handleSubmit } = useForm<LineUser>({
    mode: "onBlur",
    defaultValues: {
      userId: props.lineUser?.userId || "",
      lineId: props.lineUser?.lineId || "",
    },
  });
  const [createLineUser, { data }] = useCreateLineUserMutation({
    onCompleted: (data) => {
      if (!data.createLineUser.error) {
        reset();
        props.onClose();
        props.refetch();
      }
    },
  });

  const [updateLineUser, { data: updateData }] = useUpdateLineUserMutation({
    onCompleted: (data) => {
      if (!data.updateLineUser.error) {
        reset();
        props.onClose();
        props.refetch();
      }
    },
  });

  const [removeLineUser] = useRemoveLineUserMutation({
    onCompleted: () => {
      reset();
      props.onClose();
      props.refetch();
    },
  });

  const onSubmit = (data: LineUser) => {
    if (props.lineUser) {
      updateLineUser({
        variables: { id: props.lineUser?.id, attributes: data },
      });
    } else {
      createLineUser({ variables: { attributes: data } });
    }
  };

  const handleRemove = () => {
    if (props.lineUser?.id && confirm("削除してよろしいですか？")) {
      removeLineUser({ variables: { id: props.lineUser?.id } });
    }
  };

  const handleClose = () => {
    reset();
    props.onClose();
  };

  const errorMessage = () => {
    const error =
      data?.createLineUser.error || updateData?.updateLineUser.error;
    if (error) {
      return <p className="text-red">{error}</p>;
    }
  };

  useEffect(() => {
    if (props.lineUser) {
      setValue("userId", props.lineUser.userId);
      setValue("lineId", props.lineUser.lineId);
    }
  }, [props.lineUser]);

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
          <DialogHeader className="bg-[#eee] py-7 ">
            <DialogTitle className="text-center text-4xl leading-none">
              {props.lineError ? "登録情報更新" : "新規登録"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col items-center justify-center w-full gap-y-9 text-center">
            {errorMessage()}
            <div className="w-full text-2xl">
              <label className="ml-3">氏名</label>
              <Select {...register("userId")} className="block w-full custom-select rounded-md mt-4">
                <option />
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.lastName} {user.firstName}
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-full">
              <Label className="ml-3" htmlFor="name">ライン</Label>
              <Select {...register("lineId")} className="block w-full custom-select rounded-md mt-4">
                <option />
                {lines?.map((line) => (
                  <option key={line.id} value={line.id}>
                    {line.name}
                  </option>
                ))}
              </Select>
            </div>
            <DialogFooter className="flex items-center justify-center py-4 px-40 bg-[#eee]">
              {props.lineUser ? <Button onClick={deleteItem} className="flex items-center justify-center gap-x-5 rounded-full border-[#c00] border-[1px] bg-white shadow-btn" >
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
