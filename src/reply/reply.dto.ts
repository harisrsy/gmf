import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

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

export class FilereplyDto {
  @IsNotEmpty()
  RCA_problem: string;
  @IsNotEmpty()
  Corrective_Action: string;
  @IsNotEmpty()
  Preventive_Action: string;
  @IsNotEmpty()
  @IsIn(user)
  Identified_by_Auditee: string;
  @IsNotEmpty()
  @IsDateString()
  Identified_Date: string;
  @IsNotEmpty()
  @IsIn(user)
  Accept_by_Auditor: string;
  @IsNotEmpty()
  @IsDateString()
  Auditor_Accept_date: string;
  @IsNotEmpty()
  @IsNumber()
  ncrId: number;
}
