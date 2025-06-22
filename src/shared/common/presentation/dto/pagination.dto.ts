import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationCommonDTO {
   @ApiProperty({ required: false })
   @IsOptional()
   @IsInt({ message: 'O campo pageIndex deve ser um inteiro' })
   @Min(1, { message: 'O campo pageIndex deve ser maior que 0' })
   @Transform(({ value }) => parseInt(value))
   pageIndex?: number;

   @ApiProperty({ required: false })
   @IsOptional()
   @IsInt({ message: 'O campo pageSize deve ser um inteiro' })
   @Min(1, { message: 'O campo pageSize deve ser maior que 0' })
   @Max(100, { message: 'O campo pageSize deve ser menor que 100' })
   @Transform(({ value }) => parseInt(value))
   pageSize?: number;

}
