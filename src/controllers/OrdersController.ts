import { Controller, Get, Delete, PathParams, Status, BodyParams, Post } from "@tsed/common";
import { Authenticate } from "@tsed/passport";
import { OrderIndexDto, OrderGetDto } from "@dto/OrderDto";
import { ReturnsArray, Returns } from "@tsed/swagger";
import { Order } from "@entity/Order";
import { plainToClass } from "class-transformer";
import { NO_CONTENT } from "http-status-codes";

@Controller("/orders")
@Authenticate("jwt-user")
export class OrdersController {
  @Get("/")
  @ReturnsArray(OrderIndexDto)
  async getList(): Promise<OrderIndexDto[]> {
    const orders: Order[] = await Order.find({
      order: { createdAt: "DESC" }
    });
    return plainToClass(OrderIndexDto, orders);
  }

  @Post("/")
  @Returns(OrderGetDto)
  async create(@BodyParams() order: Order): Promise<OrderGetDto | null> {
    return plainToClass(OrderGetDto, await order.save());
  }

  @Delete("/:id")
  @Status(NO_CONTENT)
  async delete(@PathParams("id") id: number): Promise<void> {
    await Order.delete(id);
  }
}
