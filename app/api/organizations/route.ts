import { NextResponse } from "next/server";
import organizations from "@/lib/data/mock/organizations.json";

export async function GET() {
  return NextResponse.json(organizations);
}
