import {
  IsDateString,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsIn,
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

export class FilefollowDto {
  @IsNotEmpty() 
  @IsNumber()
  ncrId :number;
  Close_Corrective_Actions  :string;
  @IsNotEmpty()
  @IsIn(user)
  Proposed_Close_Auditee    :string;
  @IsNotEmpty()
  @IsDateString()
  Proposed_Close_Date       :string;
  @IsNotEmpty()
  @IsDateString()
  Implemented_close_date    :string;
  Is_close                  :boolean;
  effectiveness             :boolean;
  Refer_to_Verify_Sheet     :string;
  Sheet_No                  :string;
  New_NCR_Issue_nbr         :string;
  @IsNotEmpty()
  Close_approved_by         :string;
  @IsNotEmpty()
  @IsDateString()
  Close_approved_date       :string;
  @IsNotEmpty()
  Verified_Chief_IM         :string;
  @IsNotEmpty()
  @IsDateString()
  Verified_Date             :string;
}