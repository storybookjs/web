import { FC, ReactNode } from "react";
import { H1 } from ".";
import { Tabs } from "../tabs";

interface Props {
  title?: string;
  isIndex: boolean;
  isApi: boolean;
  pathIndex: string;
  pathApi: string;
  content: ReactNode;
}

export const Article: FC<Props> = ({
  title,
  isIndex,
  isApi,
  pathIndex,
  pathApi,
  content,
}) => {
  return (
    <>
      <H1>{title || "Title is missing"}</H1>
      {(isIndex || isApi) && (
        <Tabs
          pathIndex={pathIndex}
          pathApi={pathApi}
          isIndex={isIndex}
          isApi={isApi}
        />
      )}
      <article>{content}</article>
    </>
  );
};
