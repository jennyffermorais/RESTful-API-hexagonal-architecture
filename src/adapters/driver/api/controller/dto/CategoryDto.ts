import { CATEGORIES } from "../../../../driven/repository/Category";

export class CreateCategoryDto {
  name: CATEGORIES | undefined;
}

export class UpdateCategoryDto {
  name?: CATEGORIES | undefined;
}
