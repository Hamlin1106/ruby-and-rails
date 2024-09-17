"use client";

import { useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarContext } from "./SidemenuContext";

const navigation = [
  { name: "作業開始", href: "#" },
  { name: "配置確認", href: "#" },
  { name: "在庫一覧", href: "#" },
];

const adminNavigations = [
  { name: "新しい作業実績（9件）", href: "#", path: "" },
  { name: "新しい異常情報（2件）", href: "#", path: "" },
  { name: "作業履歴", href: "#", path: "" },
  { name: "生産計画", href: "#", path: "" },
  { name: "データ分析", href: "/report", path: "/report" },
  { name: "マスターデータ管理", href: "/master/lines", path: "/master" },
  { name: "ユーザー管理", href: "/users", path: "/users" },
];

const enableMenus = ["/report", "/master/lines", "/users"];

export const Sidebar = ({
  userName = "山口 諒輔",
  userAvatar = "/images/user-default.png",
}: {
  userName?: string;
  userAvatar?: string;
}) => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`sidebar bg-[#ddd] h-screen fixed inset-y-0 z-50 flex flex-col justify-between transition-all duration-300 ${
        !isOpen ? "w-24" : "w-64"
      }`}
    >
      {/* Logo Section */}
      <div
        className={`logo-div flex items-center justify-center flex-shrink-0 border-b-2 border-white ${
          !isOpen ? "py-7 px-4" : "py-7 px-10"
        }`}
      >
        <img
          src={!isOpen ? "/images/toho-logo-icon.png" : "/images/toho-logo.png"}
          className="max-w-full transition-transform duration-300"
          alt="Logo"
        />
      </div>

      {/* Main Menu Section */}
      <div
        className={`menu-main w-full box-border flex flex-col grow justify-start items-center gap-8 p-4 overflow-y-auto ${
          !isOpen ? "hidden" : ""
        }`}
      >
        {/* Worker Menu */}
        <div className="worker-menu w-full">
          <p className="text-white bg-[#333] py-4 px-6 flex flex-grow items-center justify-center mb-4">
            メニュー | 作業者用
          </p>
          <nav className="w-full">
            <ul className="w-full flex flex-col space-y-2">
              {navigation.map((item) => (
                <li className="nav-item" key={item.name}>
                  <Link
                    href={item.href}
                    key={`menu-${item.name}`}
                    className="block w-full box-border py-3 pl-10 pr-0 text-sm text-disabled bg-[#777]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Admin Menu */}
        <div className="admin-menu w-full">
          <p className="text-white w-full box-border bg-[#333] py-4 px-6 flex flex-grow items-center justify-center mb-4">
            メニュー | 管理者用
          </p>
          <nav>
            <ul className="flex flex-col space-y-2 w-full">
              {adminNavigations.map((item) => {
                if (!enableMenus.includes(item.href)) {
                  return (
                    <div
                      className="block w-full box-border py-3 pl-10 pr-0 text-sm text-disabled bg-[#777]"
                      key={`menu-${item.name}`}
                    >
                      {item.name}
                    </div>
                  );
                } else {
                  return (
                    <li className="nav-item" key={item.name}>
                      <Link
                        href={item.href}
                        className={`block w-full box-border py-3 pl-10 pr-0 text-sm font-semibold  text-white ${
                          pathname.includes(item.path)
                            ? "bg-[#D80C18]"
                            : "bg-[#777]"
                        } hover:bg-[#D80C18] transition-colors`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <div className=" w-full h-fit flex flex-grow items-center justify-start">
          <Link
            href="#"
            className="block w-full box-border py-4 px-6 text-white bg-[#333] hover:bg-[#D80C18] transition-colors"
          >
            ログアウト
          </Link>
        </div>
      </div>

      {/* User Info Section */}
      <div
        className={`user-info w-full box-border flex items-center justify-center flex-shrink-0 gap-4 border-t-2 border-white ${
          !isOpen ? "py-5 px-7" : "py-5 px-10"
        }`}
      >
        <div
          className={`user-avatar h-fit bg-gray-400 rounded-full flex items-center justify-center${
            !isOpen ? " w-full" : "w-1/4"
          }`}
        >
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-full h-auto rounded-full"
          />
        </div>
        {isOpen && (
          <div className="user-name text-sm font-semibold w-3/4">
            {userName}
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <div
        className={`toggle-btn absolute top-28 w-6 h-12 bg-gray-500 flex items-center justify-center cursor-pointer transition-all ${
          !isOpen ? "right-0 rotate-180" : "-right-6"
        }`}
        onClick={toggleSidebar}
      >
        <img
          src="/images/toggle-btn.svg"
          className="w-full h-auto object-cover"
          alt="Toggle Sidebar"
        />
      </div>
    </div>
  );
};
