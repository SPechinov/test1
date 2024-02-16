import { FC, useState } from "react";
import { Props } from "./types.ts";

export const Accordion: FC<Props> = ({ children, className, tagInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const title = (() => {
    if (isOpen) return tagInfo.fullTag;
    return `${tagInfo.fullTag}...</${tagInfo.tag}>`;
  })();

  return (
    <div className={`w-full ${className ?? ""}`}>
      <div className="overflow-hidden">
        <button
          className="w-full px-2 text-left hover:bg-white peer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="font-semibold">{title}</h2>
        </button>
        {isOpen && (
          <div className="px-2 text-left peer-hover:bg-white">
            {children}
            {isOpen && (
              <p className="font-semibold text-left">{`</${tagInfo.tag}>`}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
