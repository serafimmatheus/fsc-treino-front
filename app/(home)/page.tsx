import { HomePageGuard } from "@/app/_components/home/home-page-guard";
import { authClient } from "../_lib/auth-client";
import { getHeaders } from "better-auth/react";
import { redirect } from "next/navigation";
import { getHomeData } from "../_lib/api/fetch-generated";
import dayjs from "dayjs";

export default async function Home() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await getHeaders(),
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
