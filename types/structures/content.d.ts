export interface ContentChild {
  marks: string[];
  text: string;
  type: string | null;
}

export interface MarkDef {
  id: string;
  type: string;
  href?: string;
}
