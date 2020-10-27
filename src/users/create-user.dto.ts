import { ApiProperty } from '@nestjs/swagger';

export class CreateUserForm {
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
}
