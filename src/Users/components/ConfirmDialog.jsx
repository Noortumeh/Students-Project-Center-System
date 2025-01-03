import Swal from "sweetalert2";

export default function ConfirmDialog({ title, text, onConfirm }) {
    const showConfirmDialog = () => {
        Swal.fire({
            title: title || 'Are you sure?',
            text: text || "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                onConfirm(); // استدعاء الإجراء في حالة التأكيد
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your task is safe :)',
                    'error'
                );
            }
        });
    };

    return { showConfirmDialog };
}
