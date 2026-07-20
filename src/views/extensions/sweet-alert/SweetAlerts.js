import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const handleSuccess = (title="عملیات با موفقیت انجام شد!") => {
  return MySwal.fire({
    title: title,
    confirmButtonText: "متوجه شدم",
    icon: "success",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
};

export const handleError = (title="عملیات با مشکل روبرو شد!") => {
  return MySwal.fire({
    title: title,
    confirmButtonText: "متوجه شدم",
    icon: "error",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
};

export const handleWarning = (title="مشکلی پیش آمده!") => {
  return MySwal.fire({
    title: title,
    confirmButtonText: "متوجه شدم",
    icon: "warning",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
};
