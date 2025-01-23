export const validateInputs = (formData) => {
    const errors = {};

    if (!formData.firstName.trim()) {
        errors.firstName = 'First Name is required';
    }

    if (!formData.lastName.trim()) {
        errors.lastName = 'Last Name is required';
    }

    if (formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) {
        errors.phoneNumber = 'Phone Number must be a valid number';
    }

    return errors;
};
