import {
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
export class FilencrDto {
  @IsNotEmpty()
  audit_plan_no: string;
  @IsNotEmpty()
  ncr_no: string;
  @IsNotEmpty()
  @IsDateString()
  issued_date: string;
  @IsNotEmpty()
  responsibility_office: string;
  @IsNotEmpty()
  audit_type: string;
  @IsNotEmpty()
  level_of_finding: number;
  @IsNotEmpty()
  require_condition: string;
  @IsNotEmpty()
  problem_analysis: boolean;
  @IsNotEmpty()
  @IsDateString()
  answer_due_date: string;
  @IsNotEmpty()
  encountered_condition: string;
  @IsNotEmpty()
  originator: string;
  @IsNotEmpty()
  @IsDateString()
  data_send: string;
  @IsNotEmpty()
  accepted_by: string;
  @IsNotEmpty()
  @IsDateString()
  accepted_date: string;
}
