import { Body, Controller, HttpCode, Post, UseGuards, UsePipes } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/jwt-auth.guard";
import type { RegisterProductUseCase } from "@/domain/application/use-cases/products/register-product";
import z from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { isLeft } from "@/core/either/either";


const registerProductBodySchema = z.object({
    userId : z.string().uuid(),
    name : z.string(),
    price : z.coerce.number(),
    quantity : z.coerce.number()
})

type RegisterProductBodySchema = z.infer<typeof registerProductBodySchema>

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class RegisterProductController{

  constructor(
    private registerProduct : RegisterProductUseCase
  ) {}

  @Post('')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerProductBodySchema))
  async handle(@Body() body : RegisterProductBodySchema) {

    const {userId, name, price, quantity} = body;

    const result = await this.registerProduct.execute({
      userId,
      name,
      price,
      quantity
    })

    if(isLeft(result))
    {
      return new 
    }

  }
}