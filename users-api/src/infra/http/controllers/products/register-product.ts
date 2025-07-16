import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class RegsterProductController{

}