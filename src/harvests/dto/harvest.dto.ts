export class CreateHarvestDto {
  name: string;
  farmId: string;
}

export class UpdateHarvestDto {
  name?: string;
  farmId?: string;
}
