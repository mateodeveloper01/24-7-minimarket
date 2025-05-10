import prisma from "@/utils/db"
// "/api/products?page=1&take=10"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')
  const take = searchParams.get('take')

  const products = await prisma.products.findMany({
    skip: (Number(page) - 1) * Number(take),
    take: Number(take),
  })

  const total = await prisma.products.count()

  return new Response(JSON.stringify({ products, total, page: Number(page), take: Number(take) }), {
    status: 200,
  })

}