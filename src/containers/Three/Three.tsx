import { FC } from "react";
import { Accordion } from "./Accordion";
import { Props } from "./types.ts";
import { ThreeElement } from "../../types.ts";

export const Three: FC<Props> = ({ three: threeProps }) => {
  console.log(threeProps);
  const render = (three: ThreeElement[]) => {
    return (
      <>
        {three.map((threeItem) => {
          if (threeItem.tagInfo.tag) {
            return (
              <Accordion key={threeItem.tagInfo.id} tagInfo={threeItem.tagInfo}>
                {render(threeItem.children)}
              </Accordion>
            );
          }

          return (
            <p className="px-2" key={threeItem.tagInfo.id}>
              {threeItem.content}
            </p>
          );
        })}
      </>
    );
  };

  return <>{render(threeProps)}</>;
};
