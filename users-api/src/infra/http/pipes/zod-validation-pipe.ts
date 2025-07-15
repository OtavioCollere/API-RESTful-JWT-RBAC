import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value)

    if (!result.success) {
      throw new BadRequestException(result.error.format())
    }

    return result.data
  }
}
