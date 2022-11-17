import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import img from "../assets/pubBusiness.png";

export class Alert {
  static mySwal = withReactContent(Swal);

  static showError = async (
    message: string,
    opts?: { title?: string; timer?: number }
  ) => {
    await this.mySwal.fire({
      icon: "error",
      title: opts?.title ?? "Ups!",
      text: message,
      timer: opts?.timer ? opts?.timer * 1000 : undefined,
    });
  };
  static showWarning = async (
    message: string,
    opts?: { title?: string; timer?: number }
  ) => {
    await this.mySwal.fire({
      icon: "warning",
      title: opts?.title ?? "",
      text: message,
      timer: opts?.timer ? opts?.timer * 1000 : undefined,
    });
  };

  static showSuccess = async (params: {
    message: string;
    title?: string;
    timer?: number;
    showConfirmButton?: boolean;
  }) => {
    const { title, message, timer, showConfirmButton } = params;
    await this.mySwal.fire({
      icon: "success",
      title: title ?? "Genial",
      text: message,
      timer: timer,
      showConfirmButton: showConfirmButton ?? true,
    });
  };
  static showLoading = async (params: { message?: string; timer?: number }) => {
    const { message, timer } = params;
    return await this.mySwal.fire({
      icon: "info",
      text: message ?? "Cargando",
      showConfirmButton: true,
      confirmButtonText: "Cancelar",
      timer: timer ? timer * 1000 : undefined,
      didOpen: () => {
        this.mySwal.showLoading();
      },
    });
  };
  static advertising = async () => {
    return await Alert.mySwal.fire({
     imageUrl:img,
     showCloseButton: true,
    showConfirmButton:false
    });
  };
  static fileName = async () => {
    return await Alert.mySwal.fire({
      text: "Ingrese los datos",
      html:
        ' <div class="form-group">' +
        ' <label for="import">Nº Importación</label>' +
        '<input type="text" class="form-control" id="import" placeholder="Nº Importación">' +
        "</div>" +
        ' <div class="form-group">' +
        ' <label for="fecha">Fecha de importación</label>' +
        '<input type="date" class="form-control" id="fecha" >' +
        "</div>",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const imports = (document.getElementById("import") as HTMLInputElement)
          .value;
        const fecha = (document.getElementById("fecha") as HTMLInputElement)
          .value;
        if (imports! && fecha!) {
          return new Promise(function (resolve) {
            resolve({ imports, fecha });
          });
        }
      },
    });
  };
}
