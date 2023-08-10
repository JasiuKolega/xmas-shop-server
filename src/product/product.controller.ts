import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { SortType } from './sort.type';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAllWithSort(@Query('sortType') type?: SortType) {
    return this.productService.findAll(type);
  }

  @Get('search')
  findAllBySearchTerm(@Query('searchTerm') searchTerm?: string) {
    return this.productService.bySearchTerm(searchTerm.toLowerCase());
  }

  @Get('/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug);
  }

  @Get('/relatives/:id')
  findRelatives(@Param('id') id: string) {
    return this.productService.findRelatives(+id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(+id);
  }
}
