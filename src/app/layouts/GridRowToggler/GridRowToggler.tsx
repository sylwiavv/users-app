import { ReactNode, useState, useEffect } from "react";
import { GridIcon, TableListIcon } from "../../../assets/icons/icons";

export const GridRowToggler = ({
  children,
  onLayoutChange,
}: {
  children?: ReactNode;
  onLayoutChange?: (isGrid: string) => void;
}) => {
  const [isGrid, setIsGrid] = useState(() => {
    return localStorage.getItem("layoutToggler") === "_row" ? "_row" : "_grid";
  });

  useEffect(() => {
    if (onLayoutChange) {
        const isGridRow = isGrid === "_grid" ? "_grid" : "_row"
      onLayoutChange(isGridRow);
    }
  }, [isGrid, onLayoutChange]);

  const toggleToGridView = () => {
    setIsGrid("_grid");
    localStorage.setItem("layoutToggler", "_grid");
  };

  const toggleToRowView = () => {
    setIsGrid("_row");
    localStorage.setItem("layoutToggler", "_row");
  };

  return (
    <div className="grid-row-toggler__wrapper">
      {children && children}

      <div className="grid-row-toggler__wrapper-icons">
        <div
          className={`_grid ${isGrid === "_grid" ? "active" : ""}`}
          onClick={toggleToGridView}
        >
          <GridIcon />
        </div>
        <div
          className={`_row ${isGrid !== "_grid" ? "active" : ""}`}
          onClick={toggleToRowView}
        >
          <TableListIcon />
        </div>
      </div>
    </div>
  );
};
