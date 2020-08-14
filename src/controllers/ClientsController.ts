import { Controller, Get, PathParams, BodyParams, Post, Delete, Status } from "@tsed/common";
import { ReturnsArray, Returns } from "@tsed/swagger";
import { ClientIndexDto, ClientGetDto } from "@dto/ClientDto";
import { Client } from "@entity/Client";
import { plainToClass } from "class-transformer";
import { Authenticate } from "@tsed/passport";
import { NOT_FOUND, OK, NO_CONTENT } from "http-status-codes";
import { NotFound } from "@tsed/exceptions";

@Controller("/clients")
@Authenticate("jwt-user")
export class ClientsController {
  @Get("/")
  @ReturnsArray(ClientIndexDto)
  async getList(): Promise<ClientIndexDto[]> {
    const clients: Client[] = await Client.find({
      where: {
        archived: false
      }
    });
    return plainToClass(ClientIndexDto, clients);
  }

  @Get("/:id")
  @Returns(NOT_FOUND, { description: "Not found" })
  @Returns(OK, { description: "OK", type: ClientGetDto })
  async get(@PathParams("id") id: string): Promise<ClientGetDto | undefined> {
    const client: Client | undefined = await Client.findOne(id);
    if (!client) throw new NotFound("Not found");
    return plainToClass(ClientGetDto, client);
  }

  @Post("/")
  @Returns(ClientGetDto)
  async create(@BodyParams() client: Client): Promise<ClientGetDto | null> {
    return plainToClass(ClientGetDto, await client.save());
  }

  @Delete("/:id")
  @Status(NO_CONTENT)
  async delete(@PathParams("id") id: string): Promise<void> {
    await Client.delete(id);
  }

  // @Delete("/:id")
  // @Status(204)
  // async delete(@PathParams("id") id: string): Promise<void> {
  //   const client = await Client.findOne(id);
  //   if (client === undefined) throw new NotFound("Not found");
  //   client.archive();
  //   await client.save();
  // }
}
