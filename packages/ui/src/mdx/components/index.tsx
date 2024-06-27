import { A } from './a';
import { Code } from './code';
import { Figcaption } from './figcaption';
import { Figure } from './figure';
import { H1, H2, H3, H4 } from './headings';
import { Hr } from './hr';
import { P } from './p';
import { Pre } from './pre';
import { Table } from './table';
import { Td } from './td';
import { Th } from './th';
import { Tr } from './tr';
import { UnorderedList, ListItem, OrderedList } from './lists';
// Non-HTML components
import { Callout } from './callout';

export const mdxComponents = {
  a: A,
  A,
  code: Code,
  figcaption: Figcaption,
  figure: Figure,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  hr: Hr,
  p: P,
  pre: Pre,
  table: Table,
  Table,
  td: Td,
  Td,
  th: Th,
  Th,
  tr: Tr,
  Tr,
  ul: UnorderedList,
  li: ListItem,
  ol: OrderedList,
  Callout,
};
