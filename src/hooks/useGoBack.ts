import useGlobalStore from "@store/useStore";
import { useNavigate } from "react-router";

const useGoBack = () => {
  const navigate = useNavigate();
  const role = useGlobalStore((state) => state.role);

  const redirectToOnDashboard = () => {
    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "company":
        navigate("/company/dashboard");
        break;
      case "user":
        navigate("/user/dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // Go back to the previous page
    } else {
      // navigate("/"); // Redirect to home if no history exists
      redirectToOnDashboard();
    }
  };

  return goBack;
};

export default useGoBack;
