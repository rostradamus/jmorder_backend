import { Controller, Get, Status } from "@tsed/common";
import { OK } from 'http-status-codes';

@Controller("/health")
export class HealthController {
  @Get("/")
  @Status(OK)
  get(): string {
    return "OK";
  }
}
