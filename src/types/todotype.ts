import { ChangeEvent } from "react";

export type TableBodyType = {
  date: string;
  content: string;
  checked: boolean;
};

export type CheckTabeleType = {
  val: ChangeEvent<HTMLInputElement>;
  key: number;
};
