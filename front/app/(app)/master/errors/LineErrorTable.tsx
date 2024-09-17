import { Button } from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { FormProvider, useForm } from "react-hook-form";
import { LineErrorFormModal } from "./LineErrorFormModal";
import { LineError, MasterSearch, useLineErrorsLazyQuery } from "@/api";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "../Search";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Image from 'next/image'; 
import addIcon from '@/public/images/add-icon.svg';

export const LineErrorTable = () => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [lineError, setLineError] = useState<LineError>();

  const methods = useForm<MasterSearch>();
  const { replace } = useRouter();

  const [getLineErrors, { data }] = useLineErrorsLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  const handleLineErrorClick = async (lineError: LineError) => {
    await setLineError(lineError);
    setOpen(true);
  };

  const onSubmit = (data: MasterSearch) => {
    let pathname = `/master/errors`;
    const params = new URLSearchParams();
    const lineIds = data.lineIds;
    if (lineIds && lineIds.length > 0) {
      params.set("lineIds", lineIds.join(","));
    }
    if (data.factoryId) {
      params.set("factoryId", data.factoryId);
    }
    if (data.keyword) {
      params.set("keyword", data.keyword);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    getLineErrors({ variables: { search: {} } });
  }, []);

  useEffect(() => {
    const lineIds = searchParams.get("lineIds")?.split(",") || [];
    const factoryId = searchParams.get("factoryId");
    const keyword = searchParams.get("keyword");
    getLineErrors({
      variables: { search: { lineIds, factoryId, keyword } },
      fetchPolicy: "cache-and-network",
    });
  }, [searchParams]);

  return (
    <div className="w-full px-20 box-border flex flex-col items-center justify-center gap-y-6">
      <div className="flex items-center gap-x-4 pt-4 pb-8 bg-[#ddd]">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Search />
          </form>
        </FormProvider>

        <Button className="custom-btn bg-[#c00] hover:bg-[#D35050]" type="submit">
          <div className="img-div flex items-center justify-center w-7">
            <Image 
              src={addIcon} 
              alt="register" 
              className="w-full h-auto"
              /> 
          </div>
          <span className="text-3xl">新規登録</span>
        </Button>
      </div>

      <div className="w-[1670px] m-auto">
        <div className="w-fit m-auto rounded-full border-[#c00] flex items-end justify-end mr-4 gap-x-2">
          ALL
          <span className="text-red">
          {data?.lineErrors?.length.toLocaleString()}
          </span>
          件
        </div>
        <Table className="w-full">
          <TableHeader className="w-full bg-[#777] shadow-sm">
            <TableRow className="w-full flex items-center justify-start">
              <TableHead className="w-[300px] text-white">品番</TableHead>
              <TableHead className="w-[300px] text-white">ライン</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {data?.lineErrors?.map((lineError) => (
              <TableRow key={lineError.id} className="custom-row">
                <TableCell className="w-[300px]">
                  <Link
                    href={`#`}
                    onClick={() => handleLineErrorClick(lineError)}
                    className="flex items-center gap-x-2"
                  >
                    <Pencil className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    {lineError.name}
                  </Link>
                </TableCell>
                <TableCell className="w-[300px]">{lineError.line.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <LineErrorFormModal
        open={open}
        setOpen={setOpen}
        lineError={lineError}
        onClose={() => {
          setOpen(false);
          setLineError(undefined);
        }}
      />
    </div>
  );
};
