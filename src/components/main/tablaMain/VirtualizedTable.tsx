import React from "react";
import { Virtuoso } from "react-virtuoso";

interface TableProps<T> {
  data: T[];
  renderHeader: () => React.ReactNode;
  renderRow: (item: T, index: number) => React.ReactNode;
  className?: string;
}

const VirtualizedTable = <T,>({
  data,
  renderHeader,
  renderRow,
  className = "",
}: TableProps<T>) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Virtuoso
        style={{ height: "100%", width: "100%" }}
        className="custom-scrollbar overflow-x-hidden"
        data={data}
        components={{
          Header: () => (
            <div className="sticky top-0 z-10 w-full">{renderHeader()}</div>
          ),
        }}
        itemContent={(index: number) => (
          <div className="border-b border-gray-600 w-full">
            {renderRow(data[index], index)}
          </div>
        )}
      />
    </div>
  );
};

export default VirtualizedTable;
