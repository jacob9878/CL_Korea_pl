export type AnnouncementItem = {
  ancmId: string;
  ancmNo: string;
  title: string;
  gov: string;
  dept: string;
  agency: string;
  ancmDe: string;
  start: string;
  end: string;
  type: string;
  status?: string;
  irisUrl: string;
  manager?: string;
  files: { name: string; size: string }[];
  body: string[];
};

export type LocalFile = { name: string; size?: string; url?: string };

export type LocalItem = {
  title: string;
  start: string;
  end: string;
  status: string;
  statusKey: "open" | "closing" | "closed";
  agency: string;
  ancmNo: string;
  posted: string;
  link: string;
  bodyType: "text" | "image" | "pdf" | "external";
  body: string[];
  images: string[];
  files: LocalFile[];
};

export type LocalCity = {
  name: string;
  source: string;
  url: string;
  icon: string;
  items: LocalItem[];
};

export type Dept = {
  key: string;
  icon: string;
  desc: string;
};
