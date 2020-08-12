import { Controller, Get } from "@tsed/common";
import { Authenticate } from "@tsed/passport";
import { OrderIndexDto } from "@dto/OrderDto";
import { ReturnsArray } from "@tsed/swagger";
import { Order } from "@entity/Order";
import { plainToClass } from "class-transformer";

@Controller("/orders")
@Authenticate("jwt-user")
export class OrdersController {
  @Get("/")
  @ReturnsArray(OrderIndexDto)
  async getList(): Promise<OrderIndexDto[]> {
    const orders: Order[] = await Order.find();
    return plainToClass(OrderIndexDto, orders);
  }
}
