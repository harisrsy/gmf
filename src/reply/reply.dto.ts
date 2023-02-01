import {
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class FilereplyDto {
  @IsNotEmpty()
  root: string;
  @IsNotEmpty()
  correct: string;
  @IsNotEmpty()
  preventive: string;
  @IsNotEmpty()
  @IsDateString()
  impdate: string;
  @IsNotEmpty()
  auditee: string;
  @IsNotEmpty()
  responsby: string;
  @IsNotEmpty()
  @IsDateString()
  responsdate: string;
}
