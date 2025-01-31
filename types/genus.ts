
export interface Family {
  id: number;
  name: string;
  common_name: string;
  slug: string;
}


export default interface Genus {
  id: number;
  name: string;
  family: Family;
  image_url: string;
}
