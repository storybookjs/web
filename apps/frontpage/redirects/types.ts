export interface RedirectList {
  [key: string]: {
    destination: string;
    permanent: boolean;
  };
}

export type RedirectData = {
  source: string;
  destination: string;
  permanent: boolean;
};
