import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CategoryType } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const products = await prisma.product.findMany({
      where: category && category !== 'all' ? { type: category.toUpperCase() as CategoryType } : undefined,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, nameVi, nameEn, descVi, descEn, imageUrls } = body;

    if (!type || !nameVi || !nameEn) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        type: type.toUpperCase() as CategoryType,
        nameVi,
        nameEn,
        descVi,
        descEn,
        imageUrls: imageUrls || [],
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
