import { NextResponse } from 'next/server';
import { fetchAllAddons } from '../../../lib/fetch-all-addons';

export async function GET() {
  try {
    const { addons } = await fetchAllAddons();

    return NextResponse.json({ count: addons.length, addons });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
