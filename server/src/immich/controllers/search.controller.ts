import {
  AuthUserDto,
  PersonResponseDto,
  SearchDto,
  SearchExploreResponseDto,
  SearchPeopleDto,
  SearchResponseDto,
  SearchService,
} from '@app/domain';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser, Authenticated } from '../app.guard';
import { UseValidation } from '../app.utils';

@ApiTags('Search')
@Controller('search')
@Authenticated()
@UseValidation()
export class SearchController {
  constructor(private service: SearchService) {}

  @Get()
  search(@AuthUser() authUser: AuthUserDto, @Query() dto: SearchDto): Promise<SearchResponseDto> {
    return this.service.search(authUser, dto);
  }

  @Get('explore')
  getExploreData(@AuthUser() authUser: AuthUserDto): Promise<SearchExploreResponseDto[]> {
    return this.service.getExploreData(authUser) as Promise<SearchExploreResponseDto[]>;
  }

  @Get('person')
  searchPerson(@AuthUser() authUser: AuthUserDto, @Query() dto: SearchPeopleDto): Promise<PersonResponseDto[]> {
    return this.service.searchPerson(authUser, dto);
  }
}
