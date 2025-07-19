export type TableColumn<T> = {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T, idx: number) => string | number;
  className?: string;
};
