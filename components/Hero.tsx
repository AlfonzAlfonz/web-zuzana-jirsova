import { FC } from "react";

export const Hero: FC = () => {
  return (
    <div className="h-[100vh] p-4">
      <h1 className="text-center">
        <div className="font-[300] text-[20px] leading-[57.6px] mb-[-16px]">
          Toto je web portfolio
        </div>
        <div
          className="font-ortica text-zuzany"
          style={{ "-webkit-text-stroke": "2px currentcolor" } as any}
        >
          Zuzany
        </div>
        <div
          className="font-glyph text-jirsove"
          style={{ "-webkit-text-stroke": "1.2px currentcolor" } as any}
        >
          Jirsové
        </div>
      </h1>
    </div>
  );
};
