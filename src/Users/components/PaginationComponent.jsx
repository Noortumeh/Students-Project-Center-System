import TablePagination from "@mui/material/TablePagination";

export default function PaginationComponent({
    totalCount,
    pageNumber,
    pageSize,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [6, 12, 24],
}) {
    return (
        <TablePagination
            component="div"
            count={totalCount} // إجمالي عدد العناصر
            page={pageNumber - 1} // يبدأ من 0 في Material-UI
            onPageChange={(event, newPage) => onPageChange(newPage + 1)} // تحويل الصفحة إلى 1-based
            rowsPerPage={pageSize} // حجم الصفحة الحالي
            onRowsPerPageChange={(event) =>
                onPageSizeChange(parseInt(event.target.value, 10))
            }
            rowsPerPageOptions={pageSizeOptions} // خيارات حجم الصفحة
        />
    );
}