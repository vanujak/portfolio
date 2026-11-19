import { NextResponse } from "next/server";
import { getLeetcodeStats } from "@/lib/leetcode";

export const revalidate = 3600;

export async function GET() {
  const data = await getLeetcodeStats();

  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
