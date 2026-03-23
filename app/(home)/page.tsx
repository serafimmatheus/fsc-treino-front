import { HomePageGuard } from "@/app/_components/home/home-page-guard";
import { authClient } from "../_lib/auth-client";
import { redirect } from "next/navigation";
import { getHomeData } from "../_lib/api/fetch-generated";
import dayjs from "dayjs";
import { headers } from "next/headers";

export default async function Home() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session) {
    redirect("/auth");
  }

  const data = await getHomeData(dayjs().format("YYYY-MM-DD"));

  if (!data || "error" in data) {
    redirect("/auth");
  }

  console.log({ data });

  return (
    <HomePageGuard>
      <ul>
        <li>oi</li>
      </ul>
    </HomePageGuard>
  );
}
