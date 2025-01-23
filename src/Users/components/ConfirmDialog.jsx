import Swal from "sweetalert2";

export default function ConfirmDialog({
    title,
    text,
    onConfirm,
    msgConfirm,
    msgUnconfirm,
    action,
    requireReason, // بروميس لتحديد إذا كان السبب مطلوبًا 
    isSuccess
}) {
    const showConfirmDialog = () => {
        Swal.fire({
            title: title || 'Are you sure?',
            text: text || "You won't be able to revert this!",
            icon: 'warning',
            input: requireReason ? 'textarea' : null, // عرض حقل إدخال إذا كان السبب مطلوبًا
            inputPlaceholder: requireReason ? 'Enter the reason for this action...' : null,
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, ' + action + ' it!',
            cancelButtonText: 'No, cancel!',
            preConfirm: (reason) => {
                if (requireReason && !reason) {
                    Swal.showValidationMessage("Reason is required!");
                }
                return reason || null;
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await onConfirm(result.value); // انتظار انتهاء العملية
                    Swal.fire(
                        action || 'Done!',
                        msgConfirm || 'The action was completed successfully.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        error.message || 'An error occurred while processing your request.',
                        'error'
                    );
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    msgUnconfirm || 'Your task was not changed.',
                    'error'
                );
            }
        });
    };


    return { showConfirmDialog };
}