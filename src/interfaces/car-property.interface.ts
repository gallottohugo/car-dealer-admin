export class ICarProperty {
  property: string;
  value: string;
  carId: number;

  constructor(property: string, value: string, carId: number){
    this.property= property;
    this.value = value;
    this.carId = carId;
  }
}
