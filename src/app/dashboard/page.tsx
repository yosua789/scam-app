import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/utils/hydrate-client";
import { createSSRHelper } from "@/app/api/trpc/trpc-router";
import CardNews from "./_components/card-news";

export default async function Home() {
  const helpers = createSSRHelper();
  await helpers.getUsers.prefetch({ limit: 10, page: 1 });

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
        <div className="w-full flex-col justify-center mb-8">
          <CardNews />
        </div>
      </main>
    </Hydrate>
  );
}
