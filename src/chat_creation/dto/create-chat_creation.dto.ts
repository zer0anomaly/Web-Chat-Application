import { IsString, IsNotEmpty, IsEmail } from 'class-validator'

export class CreateChatCreationDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	data_one: string;


	@IsString()
	@IsNotEmpty()
	@IsEmail()
	data_two: string;
}
