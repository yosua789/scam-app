"use client";

import { robotImageUrl } from "@/app/api/data/constant";
import { useFetchUser } from "@/clients/hooks/user/query";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function ListUsers() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useFetchUser();

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((index) => (
          <Skeleton className="w-full h-[200px] rounded-xl" />
        ))}
      </div>
    );
  }

  if (!data || data.pages.length === 0 || data.pages[0].users.length === 0) {
    return <p className="text-center text-gray-600">No Users Found</p>;
  }
  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        {data.pages.map((page) =>
          page.users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col justify-center items-center border-gray-200 border"
            >
              <Image
                src={`${robotImageUrl(user.id)}`}
                alt={user.name}
                width={180}
                height={180}
                className="block"
              />
              <h3>
                {user.name}
                {user.id}
              </h3>
            </div>
          ))
        )}
      </div>
      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isFetchingNextPage ? "Loading More..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
