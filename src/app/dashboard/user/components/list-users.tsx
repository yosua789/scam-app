"use client";

import { robotImageUrl } from "@/app/api/data/constant";
import { useFetchUser } from "@/clients/hooks/user/query";
import { trpc } from "@/utils/trpc";
import Image from "next/image";

export default function ListUsers() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useFetchUser();

  if (
    !data ||
    data.pages.length === 0 ||
    data.pages[0]?.users.length === 0 ||
    isLoading
  ) {
    return <p className="text-center">No Users Found</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 20,
      }}
    >
      {data.pages.map((page: any) =>
        page.users.map((user: any) => (
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
      {/* Load More Button */}
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
    </div>
  );
}
