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
import { SearchConditionFormModal } from "./SearchConditionFormModal";
import {
  SearchCondition,
  MasterSearch,
  useSearchConditionsLazyQuery,
} from "@/api";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "../Search";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Image from 'next/image'; 
import addIcon from '@/public/images/add-icon.svg';

export const SearchConditionTable = () => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [searchCondition, setSearchCondition] = useState<SearchCondition>();

  const methods = useForm<MasterSearch>();
  const { replace } = useRouter();

  const [getSearchConditions, { data, refetch }] = useSearchConditionsLazyQuery(
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const handleSearchConditionClick = async (
    searchCondition: SearchCondition
  ) => {
    await setSearchCondition(searchCondition);
    setOpen(true);
  };

  const onSubmit = (data: MasterSearch) => {
    let pathname = `/master/searchConditions`;
    const params = new URLSearchParams();
    const lineIds = data.lineIds;
    if (lineIds && lineIds.length > 0) {
      params.set("lineIds", lineIds.join(","));
    }
    if (data.factoryId) {
      params.set("factoryId", data.factoryId);
    }
    if (data.productId) {
      params.set("productId", data.productId);
    }
    if (data.keyword) {
      params.set("keyword", data.keyword);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = () => {
    const keyword = searchParams.get("keyword");
    getSearchConditions({
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
      <div className="flex w-full m-auto items-center gap-x-4 pt-4 pb-8 bg-[#ddd]">
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
          {data?.searchConditions?.length.toLocaleString()}
          </span>
          件
        </div>
        <Table className="w-full">
          <TableHeader className="w-full bg-[#777] shadow-sm">
            <TableRow className="w-full flex items-center justify-start">
              <TableHead className="w-[300px] text-white">タイトル</TableHead>
              <TableHead className="w-[300px] text-white">対象グラフ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {data?.searchConditions?.map((searchCondition) => (
              <TableRow key={searchCondition.id}>
                <TableCell className="w-[300px]">
                  <Link
                    href={`#`}
                    onClick={() => handleSearchConditionClick(searchCondition)}
                    className="flex items-center gap-x-2"
                  >
                    <Pencil className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    {searchCondition.name}
                  </Link>
                </TableCell>
                <TableCell className="w-[300px]">{searchCondition.reportTypeI18n}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <SearchConditionFormModal
        open={open}
        setOpen={setOpen}
        searchCondition={searchCondition}
        onClose={() => {
          setOpen(false);
          setSearchCondition(undefined);
        }}
        refetch={refetch}
      />
    </div>
  );
};
