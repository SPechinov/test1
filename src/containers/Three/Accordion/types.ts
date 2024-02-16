import { ReactNode } from "react";
import { TagInfo } from "../../../types.ts";

export type Props = {
  className?: string;
  tagInfo: TagInfo;
  children: ReactNode;
};
