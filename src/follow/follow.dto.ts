import { IsNotEmpty } from 'class-validator';
export class FilefollowDto {
  @IsNotEmpty()
  corrective: boolean;
  @IsNotEmpty()
  effective: boolean;
  @IsNotEmpty()
  refer: string;
  @IsNotEmpty()
  new_ncr_no: string;
  @IsNotEmpty()
  approved: string;
  @IsNotEmpty()
  approveddate: string;
}
