import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";

const MathpixLoaderComponent = MathpixLoader as any;
const MathpixMarkdownComponent = MathpixMarkdown as any;

const Mathpix = ({ latexText }: { latexText: string }) => {
  return (
    <MathpixLoaderComponent>
      <MathpixMarkdownComponent text={latexText} />
    </MathpixLoaderComponent>
  );
};

export default Mathpix;
