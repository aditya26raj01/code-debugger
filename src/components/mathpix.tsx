/* eslint-disable @typescript-eslint/no-explicit-any */
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import React from "react";

const MathpixLoaderComponent = MathpixLoader;
const MathpixMarkdownComponent = MathpixMarkdown;

const Mathpix = ({ latexText }: { latexText: string }) => {
  return (
    <MathpixLoaderComponent>
      <MathpixMarkdownComponent text={latexText} />
    </MathpixLoaderComponent>
  );
};

export default Mathpix;
