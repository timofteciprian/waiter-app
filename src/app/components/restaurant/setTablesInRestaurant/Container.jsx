import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import DraggableBox from "./DraggableBox";
import doSnapToGrid from "./snapToGrid";
import update from "immutability-helper";
//import table from "../../../../static/Group.svg";

const styles = {
  width: 600,
  height: 600,
  border: "1px solid black",
  position: "relative"
};
function renderBox(item, key) {
  return <DraggableBox key={key} id={key} {...item} />;
}
const Container = ({ snapToGrid }) => {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 80, title: "Table 1" },
    b: { top: 180, left: 20, title: "Table 2" },
    c: { top: 250, left: 160, title: "Table 3" },
    d: { top: 400, left: 200, title: "Table 4" }
  });

  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top }
          }
        })
      );
    },
    [boxes]
  );
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      let left = Math.round(item.left + delta.x);
      let top = Math.round(item.top + delta.y);
      if (snapToGrid) {
        [left, top] = doSnapToGrid(left, top);
      }
      moveBox(item.id, left, top);
      return undefined;
    }
  });
  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map(key => renderBox(boxes[key], key))}
    </div>
  );
};
export default Container;
