export type ThreeElement = {
  children: ThreeElement[];
  tagInfo: TagInfo;
  content: string;
};

export type TagInfo = {
  tag: string;
  fullTag: string;
  id: number;
};

export type GroupInfo = {
  tagInfo: TagInfo;
  content: string;
  codeLeft: string;
};
