import { Button } from "@/components/ui/Button";
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
import { FactoryFormModal } from "./FactoryFormModal";
import { MasterSearch, Factory, useFactoriesLazyQuery } from "@/api";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "../Search";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Image from 'next/image'; 
import addIcon from '@/public/images/add-icon.svg';

export const FactoryTable = () => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [factory, setFactory] = useState<Factory>();

  const methods = useForm<MasterSearch>();
  const { replace } = useRouter();

  const [getFactories, { data, refetch }] = useFactoriesLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  const handleClick = async (factory: Factory) => {
    await setFactory(factory);
    setOpen(true);
  };

  const onSubmit = (data: MasterSearch) => {
    let pathname = `/master/factories`;
    const params = new URLSearchParams();
    if (data.keyword) {
      params.set("keyword", data.keyword);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = () => {
    const keyword = searchParams.get("keyword");

    getFactories({
      variables: { search: { keyword } },
      fetchPolicy: "cache-and-network",
    });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    handleSearch();
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
          {data?.factories?.length.toLocaleString()}
          </span>
          件
        </div>

        <Table className="w-full">
          <TableHeader className="w-full bg-[#777] shadow-sm">
            <TableRow className="w-full flex items-center justify-start">
              <TableHead className="w-[300px] text-white">工場</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {data?.factories?.map((factory) => (
              <TableRow key={factory.id} className="custom-row">
                <TableCell className="w-[300px]">
                  <Link
                    href={`#`}
                    onClick={() => handleClick(factory)}
                    className="flex items-center gap-x-2"
                  >
                    <Pencil className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    {factory.name}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <FactoryFormModal
        open={open}
        setOpen={setOpen}
        factory={factory}
        onClose={() => {
          setOpen(false);
          setFactory(undefined);
        }}
        refetch={refetch}
      />
    </div>
  );
};
