// import UserForm from "@/components/user-form";
// import ListUsers from "@/components/list-user";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/utils/hydrate-client";
import { createSSRHelper } from "@/app/api/trpc/trpc-router";
import ListUser from "./components/list-users";
// import { createSSRHelper } from "./api/trpc/trpc-router";

export default async function Home() {
  const helpers = createSSRHelper();
  await helpers.getUsers.prefetch({ limit: 10, page: 1 });

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
        <div className="w-full flex justify-center mb-8">
          <ListUser />
        </div>
      </main>
    </Hydrate>
  );
}
