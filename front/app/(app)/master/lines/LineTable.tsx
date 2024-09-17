import { Button } from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { Separator } from "@radix-ui/react-separator";
import { FormProvider, useForm } from "react-hook-form";
import { LineFormModal } from "./LineFormModal";
import { Line, MasterSearch, useLinesLazyQuery } from "@/api";
import { useState, useEffect } from "react";
import { Search } from "../Search";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Image from 'next/image'; 
import addIcon from '@/public/images/add-icon.svg';

export const LineTable = () => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [line, setLine] = useState<Line>();
  const { replace } = useRouter();

  const methods = useForm<MasterSearch>();

  const [getLines, { data }] = useLinesLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  const handleLineClick = async (line: Line) => {
    await setLine(line);
    setOpen(true);
  };

  const onSubmit = (data: MasterSearch) => {
    let pathname = `/master/lines`;
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
    getLines({ variables: { search: {} } });
  }, []);

  useEffect(() => {
    const lineIds = searchParams.get("lineIds")?.split(",") || [];
    const factoryId = searchParams.get("factoryId");
    const keyword = searchParams.get("keyword");
    getLines({
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
          {data?.lines?.length.toLocaleString()}
          </span>
          件
        </div>
        <Table className="w-full">
          <TableHeader className="w-full bg-[#777] shadow-sm">
            <TableRow className="w-full flex items-center justify-start">
              <TableHead className="w-[214px] text-white">名称</TableHead>
              <TableHead className="w-[214px] text-white">工場</TableHead>
              <TableHead className="w-[214px] text-white">タクトタイム（秒）</TableHead>
              <TableHead className="w-[214px] text-white">人員配置</TableHead>
              <TableHead className="w-[214px] text-white">品番</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {data?.lines?.map((line) => (
              <TableRow key={line.id} className="custom-row">
                <TableCell className="w-[214px]">
                  <Link
                    href={`#`}
                    onClick={() => handleLineClick(line)}
                    className="flex items-center gap-x-2"
                  >
                    <Pencil className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    {line.name}
                  </Link>
                </TableCell>
                <TableCell className="w-[214px]">{line.factory.name}</TableCell>
                <TableCell className="w-[214px]">{line.takt}</TableCell>
                <TableCell className="w-[214px] text-blue">
                  <Link href={`/master/line-users?lineIds=${line.id}`}>
                    {line.userCount}
                  </Link>
                </TableCell>
                <TableCell className="w-[214px] text-blue">
                  <Link href={`/master/codes?lineIds=${line.id}`}>
                    {line.codeCount}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <LineFormModal
        open={open}
        setOpen={setOpen}
        line={line}
        onClose={() => {
          setOpen(false);
          setLine(undefined);
        }}
      />
    </div>
  );
};
