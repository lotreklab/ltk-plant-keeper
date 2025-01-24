export default interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
  image_url: string;
  family_common_name: string;
  family: string;
  synonyms: Array<string>;
}
