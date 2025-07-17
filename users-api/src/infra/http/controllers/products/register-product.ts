import { Controller, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/jwt-auth.guard";


@Controller('products')
@UseGuards(JwtAuthGuard)
export class RegsterProductController{

}