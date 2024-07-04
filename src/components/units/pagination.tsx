"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Link, usePathname } from "@/navigation";

function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const ellipsis = <li key="ellipsis">...</li>;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <li key={i}>
            <Link
              href={createPageURL(i)}
              className={`mx-1 inline-flex size-10 items-center justify-center rounded-full ${i === currentPage ? "bg-primary-900 text-white" : "bg-white text-slate-400"} shadow-sm hover:border-primary-900 hover:bg-primary-900 hover:text-white dark:bg-slate-900 dark:shadow-slate-700 dark:hover:border-green-600 dark:hover:bg-green-600`}
            >
              {i}
            </Link>
          </li>,
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(ellipsis);
      }
    }

    return pages;
  };

  if (totalPages < 1) {
    return null;
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-12">
      <div className="text-center md:col-span-12">
        <nav>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <Link
                href={createPageURL(currentPage - 1)}
                className={`mx-1 inline-flex size-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:border-primary-900 hover:bg-primary-900 hover:text-white"}`}
              >
                <ArrowLeft className="text-xl" />
              </Link>
            </li>
            {renderPageNumbers()}
            <li>
              <Link
                href={createPageURL(currentPage + 1)}
                className={`mx-1 inline-flex size-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:border-primary-900 hover:bg-primary-900 hover:text-white"} `}
              >
                <ArrowRight className="text-xl" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
