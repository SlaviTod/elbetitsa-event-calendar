import { Timestamps } from "../shared";

export interface Language extends Timestamps {
  id: number;
  label: string;
  code: string;
  imgUrl: string;
}