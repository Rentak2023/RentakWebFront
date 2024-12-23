"use client";

import { useSearchParams } from "next/navigation";
import { createSerializer, parseAsInteger, useQueryState } from "nuqs";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname } from "@/i18n/routing";
import { propertiesQueryParsers } from "@/services/properties";

const serialize = createSerializer(propertiesQueryParsers);

function usePagination(totalPages: number) {
  const [currentPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (page: number) => {
    return `${pathname}${serialize(searchParams, {
      page,
    })}`;
  };

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  return {
    currentPage,
    createPageURL,
    hasPreviousPage,
    hasNextPage,
    startPage,
    endPage,
  };
}

function UnitsPagination({ totalPages }: { totalPages: number }) {
  const {
    currentPage,
    createPageURL,
    startPage,
    endPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination(totalPages);

  if (totalPages < 1) {
    return null;
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            replace
            aria-disabled={!hasPreviousPage}
            className="aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          />
        </PaginationItem>

        {startPage > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        ).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={createPageURL(page)}
              replace
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {endPage < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            replace
            aria-disabled={!hasNextPage}
            className="aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default UnitsPagination;
