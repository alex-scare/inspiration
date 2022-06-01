type BrandKey = 'Goal';

export type Brand<
  Key extends BrandKey,
  Type = string,
  ReservedName extends string = '__type__'
  > = Type & { [K in ReservedName]: Key };