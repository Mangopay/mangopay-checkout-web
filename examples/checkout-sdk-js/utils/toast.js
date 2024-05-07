import Swal from "sweetalert2";

export const Toast= Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
