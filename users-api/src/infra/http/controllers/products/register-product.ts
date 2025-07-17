import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "../../../auth/jwt-auth.guard";


@Controller('products')
@UseGuards(JwtAuthGuard)
export class RegsterProductController{

}