import { TableCell, TableRow } from "@/shadcn/components/ui/table";

export const EmptyDataTable = ({ columnSpan }: { columnSpan: number }) => {
  return (
    <TableRow>
      <TableCell
        colSpan={columnSpan}
        className="border-2 border-gray-300 p-2 text-center"
      >
        Tidak ada data
      </TableCell>
    </TableRow>
  );
};
