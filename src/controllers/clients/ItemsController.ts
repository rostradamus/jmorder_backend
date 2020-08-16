import { Controller, Post, PathParams, BodyParams, Get, MergeParams, Put, Status, Delete } from "@tsed/common";
import { Authenticate } from "@tsed/passport";
import { ItemGetDto, ItemIndexDto } from "@dto/ItemDto";
import { Item } from "@entity/Item";
import { plainToClass } from "class-transformer";
import { Returns, ReturnsArray } from "@tsed/swagger";
import { NO_CONTENT } from "http-status-codes";

@Controller("/clients/:clientId/items")
@Authenticate("jwt-user")
@MergeParams()
export class ItemsController {
  @Get("/")
  @ReturnsArray(ItemIndexDto)
  async get(@PathParams("clientId") clientId: number): Promise<ItemIndexDto[]> {
    return plainToClass(ItemIndexDto, await Item.find({ where: { client: clientId }, order: { createdAt: "ASC" } }));
  }

  @Get("/:itemId")
  @Returns(ItemGetDto)
  async getById(@PathParams("clientId") clientId: number, @PathParams("itemId") itemId: number): Promise<ItemGetDto> {
    return plainToClass(ItemGetDto, await Item.findOne({ where: { id: itemId, client: clientId } }));
  }

  @Post("/")
  @Returns(ItemGetDto)
  async create(@PathParams("clientId") clientId: number, @BodyParams() item: Item): Promise<ItemGetDto> {
    item.client = clientId;
    return plainToClass(ItemGetDto, await item.save());
  }

  @Put("/:itemId")
  @Returns(ItemGetDto)
  async update(
    @PathParams("clientId") clientId: number,
    @PathParams("itemId") itemId: number,
    @BodyParams() item: Item
  ): Promise<ItemGetDto> {
    const originalItem: Item | undefined = await Item.findOne({ where: { id: itemId, client: clientId } });
    return plainToClass(ItemGetDto, await Object.assign(originalItem, item).save({ reload: true }));
  }

  @Delete("/:itemId")
  @Status(NO_CONTENT)
  async delete(@PathParams("clientId") clientId: number, @PathParams("itemId") itemId: number): Promise<void> {
    await Item.delete({ id: itemId, client: clientId });
  }
}
