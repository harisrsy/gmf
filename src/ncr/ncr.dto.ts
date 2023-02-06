import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

const form = ['DGCA', 'EASA'];
const office = [
  'Airworthiness Office',
  'Design Office',
  'Independent Monitoring',
  'Partner',
  'Subcontractor',
  'BRIN',
  'GMF AeroAsia',
  'BIFA Flying School',
  'Elang Lintas Indonesia',
];

const Atype = [
  'Procedure',
  'Product',
  'Surveillance',
];

const Ascope = [
  'Authority',
  'Internal',
  'External',
  'Subcontractor',
];

const uic = [
  'Chief Design Office',
  'Chief Airworthiness Office',
  'Chief Independent Monitoring',
  'Head of DOA',
];

const user = [
  'Edy Noerachman',
  'Happy Hanifah Kusumaningrum',
  'Dian Rachmawati',
  'Imanuddin Yahya',
  'I Gusti Agung Aditya Jaya',
  'Fathiya Ikrimah',
  'Muhammad Rizqi Wicaksono',
  'Mukhamad Aziz',
  'Fordiyanto',
  'Agib Faruq Afanny',
  'Anindya Devi Ramadhani',
  'Syamsurisal',
  'Gelang Gapuro Adi',
  'Abdur Rahim',
  'Glorianta Sananta Sri',
  'Agus Pribadi M',
  'Arif Suganto',
  'Purubojo Soemadi',
];

export class FilencrDto {
  @IsNotEmpty()
  @IsIn(form)
  regbes: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  audit_plan_no: string;

  @IsNotEmpty()
  ncr_no: string;

  @IsNotEmpty()
  @IsDateString()
  issued_date: string;

  @IsNotEmpty()
  @IsIn(office)
  responsibility_office: string;

  @IsNotEmpty()
  @IsIn(Atype)
  audit_type: string;

  @IsNotEmpty()
  @IsIn(Ascope)
  audit_scope: string;

  @IsNotEmpty()
  @IsIn(uic)
  To_UIC: string;

  @IsNotEmpty()
  @IsIn(user)
  attention: string;

  @IsNotEmpty()
  require_condition: string;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([1, 2, 3])
  level_of_finding: number;

  @IsNotEmpty()
  problem_analysis: boolean;

  @IsNotEmpty()
  @IsDateString()
  answer_due_date: string;

  @IsNotEmpty()
  issue_IAN: boolean;

  @IsNotEmpty()
  IAN_nbr: string;

  @IsNotEmpty()
  encountered_condition: string;

  @IsNotEmpty()
  @IsIn(user)
  audited_by: string;

  @IsNotEmpty()
  @IsDateString()
  audit_date: string;

  @IsNotEmpty()
  @IsIn(user)
  acknowledge_by: string;

  @IsNotEmpty()
  @IsDateString()
  acknowledge_date: string;

  @IsNotEmpty()
  remark: string;

  @IsNotEmpty()
  status: string;
}
