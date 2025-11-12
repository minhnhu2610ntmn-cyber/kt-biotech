import { NextResponse } from 'next/server';
import { StrapiApi } from '../../../config/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim();

  if (!q) {
    return NextResponse.json([]);
  }

  try {
    const api = new StrapiApi();
    const results = await api.searchMaterials(q);
    return NextResponse.json(results ?? []);
  } catch (error) {
    console.error('Search materials error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
