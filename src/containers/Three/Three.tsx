import { FC } from "react";
import { Accordion } from "./Accordion";
import { Props } from "./types.ts";
import { ThreeElement } from "../../types.ts";

export const Three: FC<Props> = ({ three: threeProps }) => {
  console.log(threeProps);
  const render = (three: ThreeElement[]) => {
    return (
      <>
        {three.map((threeItem, index) => {
          if (threeItem.tagInfo.tag) {
            return (
              <Accordion key={index} tagInfo={threeItem.tagInfo}>
                {render(threeItem.children)}
              </Accordion>
            );
          }

          return (
            <p className="px-2" key={index}>
              {threeItem.content}
            </p>
          );
        })}
      </>
    );
  };

  return <>{render(threeProps)}</>;
};
