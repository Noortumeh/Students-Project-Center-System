import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ErrorHandler = ({ error }) => {
  const handleError = () => {
    if (error.response) {
      toast.error(
        `Error: ${error.response.data?.message || "Failed to update workgroup."}`
      );
    } else if (error.request) {
      toast.error("No response received from server.");
    } else {
      toast.error(`Request error: ${error.message}`);
    }
  };
  handleError();
  return <div>Error occurred. Check notifications for details.</div>;
};
ErrorHandler.propTypes = {
  error: PropTypes.shape({
    response: PropTypes.shape({
      data: PropTypes.shape({
        message: PropTypes.string,
      }),
    }),
    request: PropTypes.object,
    message: PropTypes.string,
  }).isRequired,
};
export default ErrorHandler;
