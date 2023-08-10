import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewService } from 'src/review/review.service';
import { SortType } from './sort.type';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private reviewService: ReviewService,
  ) {}

  bySearchTerm(searchTerm?: string) {
    return this.prisma.product.findMany(
      searchTerm
        ? {
            where: {
              OR: [
                {
                  name: {
                    contains: searchTerm,
                  },
                },
                {
                  description: {
                    contains: searchTerm,
                  },
                },
              ],
            },
          }
        : undefined,
    );
  }

  async findAll(type?: SortType) {
    const isByPrice = type === 'high-to-low' || type === 'low-to-high';
    const isAsc = type === 'newest' || type === 'low-to-high';

    const orderBy = {
      [isByPrice ? 'price' : 'createdAt']: isAsc ? 'asc' : 'desc',

      // createdAt: type === 'oldest' ? 'asc' : 'desc',
      // price: type === 'high-to-low' ? 'desc' : 'asc',
    } as any;

    return this.prisma.product.findMany({
      orderBy,
    });
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        reviews: true,
      },
    });

    if (!product) throw new NotFoundException('Product not found');
    const avgRating = await this.reviewService.getAvarageValueByProductId(id);
    return { ...product, ...avgRating };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({ where: { slug } });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  findRelatives(currentProductId: number) {
    return this.prisma.product.findMany({
      where: {
        id: {
          not: currentProductId,
        },
      },
    });
  }
}
