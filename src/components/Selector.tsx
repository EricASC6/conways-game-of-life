import React from "react";
import SelectorBtn from "./SelectorBtn";

interface Props {
  activeValue: number | string;
  selections: [string, any][];
  onSelect?: (value: any) => void;
}

const Selector = ({ activeValue, selections, onSelect = () => {} }: Props) => {
  return (
    <div className="flex flex-wrap justify-start align-center spacing">
      {selections.map((selection) => {
        const [display, value] = selection;
        return (
          <Selector.SelectorBtn
            key={value}
            active={value === activeValue}
            onClick={() => onSelect(value)}
          >
            {display}
          </Selector.SelectorBtn>
        );
      })}
    </div>
  );
};

Selector.SelectorBtn = SelectorBtn;

export default Selector;
