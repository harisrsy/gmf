import { IsNotEmpty } from 'class-validator';

export class FilereplyDto {
  @IsNotEmpty()
  root: string;
  @IsNotEmpty()
  correct: string;
  @IsNotEmpty()
  preventive: string;
  @IsNotEmpty()
  impdate: string;
  @IsNotEmpty()
  auditee: string;
  @IsNotEmpty()
  responsby: string;
  @IsNotEmpty()
  responsdate: string;
}
