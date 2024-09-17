import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { FormProps } from "./Search";
import { useForm } from "react-hook-form";
import {
  useCreateSearchConditionMutation,
  useUpdateSearchConditionMutation,
  SearchCondition,
} from "@/api";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formDataSchema = z.object({
  name: z.string().trim().min(1, "必須項目です"),
});

type SearchConditionFormProps = {
  name: string;
};

type Props = {
  searchCondition?: SearchCondition;
  name?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  refetch: () => void;
} & FormProps;

export const SearchConditionModal = (props: Props) => {
  const title = props.searchCondition ? "検索条件の更新" : "検索条件の新規登録";
  const buttonTitle = props.searchCondition
    ? "検索条件の更新"
    : "検索条件の新規登録";

  const {
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SearchConditionFormProps>({
    resolver: zodResolver(formDataSchema),
    mode: "onBlur",
    defaultValues: {
      name: props.searchCondition?.name || "",
    },
  });

  const [createSearchCondition] = useCreateSearchConditionMutation({
    onCompleted: (data) => {
      if (!data.createSearchCondition.error) {
        props.refetch();
        props.onClose();
        reset();
      }
    },
  });

  const [updateSearchCondition] = useUpdateSearchConditionMutation({
    onCompleted: (data) => {
      if (!data.updateSearchCondition.error) {
        props.onClose();
      }
    },
  });

  const handleClick = () => {
    const name = watch("name");

    if (props.searchCondition) {
      updateSearchCondition({
        variables: {
          id: props.searchCondition.id,
          attributes: {
            name,
            reportType: props.reportType,
            lineIds: props.lineIds,
            codeIds: props.codeIds,
            dateFrom: props.dateFrom,
            dateTo: props.dateTo,
            monthFrom: props.monthFrom,
            monthTo: props.monthTo,
            month: props.month,
            isStandard: props.isStandard,
            isAvarage: props.isAvarage,
            standard: props.standard,
            exceptZero: props.exceptZero,
            fontSize: props.fontSize,
          },
        },
      });
    } else {
      createSearchCondition({
        variables: {
          attributes: {
            name,
            reportType: props.reportType,
            lineIds: props.lineIds,
            codeIds: props.codeIds,
            dateFrom: props.dateFrom,
            dateTo: props.dateTo,
            monthFrom: props.monthFrom,
            monthTo: props.monthTo,
            month: props.month,
            isStandard: props.isStandard,
            isAvarage: props.isAvarage,
            standard: props.standard,
            exceptZero: props.exceptZero,
            fontSize: props.fontSize,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (props.searchCondition) {
      setValue("name", props.searchCondition.name);
    } else {
      setValue("name", "");
    }
  }, [props.searchCondition]);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger asChild>
        <div
          className="ml-auto text-link underline cursor-pointer"
          onClick={props.onOpen}
        >
          現在の検索条件を保存
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            検索条件の名前をつけて保存します.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="py-4">
            <Label htmlFor="name">名称</Label>
            <Input
              id="name"
              className="my-4"
              {...register("name")}
              error={errors.name?.message}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              asChild
              intent="outline2"
              onClick={props.onClose}
            >
              <DialogClose>閉じる</DialogClose>
            </Button>
            <Button type="button" onClick={handleClick}>
              {buttonTitle}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
