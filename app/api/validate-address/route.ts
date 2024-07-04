import { NextResponse } from "next/server";
import { validateAddress } from "@/lib/validateAddress";

export async function POST(request: Request) {
  const { address, region, locality, administrativeArea } =
    await request.json();

  try {
    console.log("Region:", region, address);
    const validationResult = await validateAddress(
      address,
      region,
      locality,
      administrativeArea
    );
    return NextResponse.json(validationResult);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
