/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Container, Row } from "react-bootstrap";
import container1 from "../assets/container1.png";
import container2 from "../assets/container2.png";
import transport from "../assets/transport.png";
import logo from "../assets/logo.png";
import { useContainer } from "../hooks/useContainer";
import { useEffect, useState } from "react";
import { useResult } from "../hooks/useResult";
import { ContainerBoxes } from "./component/ContainerBoxes";
import { IBox } from "../interfaces/Ibox";
import { ContainerTransport } from "./component/ContainerTransport";
import Progressbar from "./component/ProgressBar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MyDocument } from "./PDF/resultsPDF";
import { useLocation } from "react-router-dom";
import { Keys } from "../constants/Keys";
import { getCodeVerifierFromStorage } from "../utils/getCodeVerifierfromStorage";
import { Alert } from "../utils/Alert";
import { FaStar } from "react-icons/fa";
import { Switch } from "@mui/material";

export const CalculatorScreen = () => {
  const location = useLocation();
  const {
    state: {
      isGold,
      boxes,
      isTransport,
      percentVolumen,
      percentWeigth,
      clientID,
      response_type,
      code_challenge_method,
    },
    showWindowGold,
    showTransportContainer,
    getAuthorization,
    getCodes,
    resetStateBoxes,
  } = useResult();
  const {
    state: { type, measure, width, heigth, long, weigthMax },
    changeContainerDry20FT,
    changeContainerDry40FT,
    changeContainerDry40HQ,
    changeContainerReffer20FT,
    changeContainerReffer40FT,
    changeContainerReffer40HQ,
  } = useContainer();
  const [typeContainer, setTypeContainer] = useState("DRY");
  const [measureContainer, setMeasureContainer] = useState("20FT");
  const [mode, setMode] = useState("FREE");
  const [checked, setChecked] = useState(false);
  const [transportI, setTransport] = useState(false);
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeContainer = () => {
    if (typeContainer === "DRY") {
      showTransportContainer(false);
      if (measureContainer === "20FT") {
        changeContainerDry20FT();
      }
      if (measureContainer === "40FT") {
        changeContainerDry40FT();
      }
      if (measureContainer === "40HQ") {
        changeContainerDry40HQ();
      }
    }
    if (typeContainer === "REFFER") {
      showTransportContainer(false);
      if (measureContainer === "20FT") {
        changeContainerReffer20FT();
      }
      if (measureContainer === "40FT") {
        changeContainerReffer40FT();
      }
      if (measureContainer === "40HQ") {
        changeContainerReffer40HQ();
      }
    }
    if (typeContainer === "TRANSPORT") {
      showTransportContainer(true);
    }
  };
  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      if (mode === "FREE") {
        Alert.advertising();
        setChecked(false);
      } else {
        resetStateBoxes();
        showWindowGold(true);
      }
    } else {
      showWindowGold(false);
    }
  };
  //identifica si la pagina es Gold
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const authorization = async () => {
    const pathname = location.pathname;
    if (pathname === "/gold") {
      const url = location.search;
      const urlParams = new URLSearchParams(url);
      const gold = urlParams.get("gold");
      const code = urlParams.get("code");
      if (gold != null) {
        showWindowGold(true);
        setMode("GOLD");
        await Alert.showSuccess({
          title: "Bienvenido",
          message: "Simulador Gold",
        });
        setChecked(true);
        return;
      } else {
        showWindowGold(false);
        var i = 0;
        if (code != null) {
          const cov = getCodeVerifierFromStorage() ?? "";
          if (i === 0) {
            getAuthorization(clientID, code, cov);
          }
          i++;
        } else {
          const res = await getCodes();
          localStorage.setItem(Keys.CV, res.verifier);
          window.location.href = `${process.env.REACT_APP_AUTH_URL}/o/authorize/?client_id=${clientID}&response_type=${response_type}&code_challenge=${res.challege}&code_challenge_method=${code_challenge_method}`;
        }
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    authorization();
  }, []);
  //cambia la información del contenedor
  useEffect(() => {
    if (typeContainer === "TRANSPORT") {
      if (!transportI) {
        Alert.showWarning("Debe ingresar todos los datos del contenedor.");
        setTransport(true);
      }
    }
    changeContainer();
  }, [typeContainer, measureContainer]);
  //desplega los resultados de las cajas
  const results = boxes.map((e: IBox) => {
    return (
      <div
        className={
          " d-flex flex-column " +
          (isGold ? "col-5 " : "col-12 ") +
          "justify-content-around border rounded-lg bg-white shadow-sm mx-1"
        }
        style={{ width: isGold ? "200px" : "100%", padding: "10px" }}
        key={e.id}
      >
        <p style={{ fontSize: "13px", color: "#6f85d9", textAlign: "center" }}>
          {"Caja " + (e.id + 1)}
        </p>
        <p style={{ fontSize: "13px", color: "#6f85d9" }}>
          {"Cajas: " + e.result.numboxes}
        </p>
        <p style={{ fontSize: "13px", color: "#6f85d9" }}>
          {"Unidades: " + e.result.units}
        </p>
        <p style={{ fontSize: "13px", color: "#6f85d9" }}>
          {"Peso Bruto: " + e.result.weightMax.toFixed(2) + " Kg"}
        </p>
      </div>
    );
  });
  const changeType = (type: string, value: string) => {
    if (type === "tipo") {
      if (boxes.length > 1) {
        Alert.mySwal
          .fire({
            title: "¿Seguro que quieres perder información de la carga?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText:"Cancelar",
          })
          .then((result) => {
            if (result.isConfirmed) {
              resetStateBoxes();
              setTypeContainer(value);
            }
          });
      } else {
        setTypeContainer(value);
      }
    } else if (type === "medidas") {
      if (boxes.length > 1) {
        Alert.mySwal
          .fire({
            title: "¿Seguro que quieres perder información de la carga?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText:"Cancelar",
          })
          .then((result) => {
            if (result.isConfirmed) {
              resetStateBoxes();
              setMeasureContainer(value);
            }
          });
      } else {
        setMeasureContainer(value);
      }
    }
  };
  //desplega la información de los contenedores
  function InfoContainers() {
    return (
      <>
        <div
          className=" d-flex flex-column col-md-5 justify-content-center  px-2 py-2  shadow-sm mb-1 mt-5"
          style={{
            backgroundColor: "#6f85d9",
            width: "90%",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontSize: "15px",
              color: "white",
              textAlign: "center",
            }}
          >
            {type + measure}
          </p>
          <div
            className="d-flex "
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div className="d-flex flex-column">
              <p style={{ fontSize: "15px", color: "white" }}>
                {"Largo: " + long + " cm"}
              </p>
              <p style={{ fontSize: "15px", color: "white" }}>
                {"Ancho: " + width + " cm"}
              </p>
            </div>
            <div className="d-flex flex-column">
              <p style={{ fontSize: "15px", color: "white" }}>
                {"Alto: " + heigth + " cm"}
              </p>
              <p style={{ fontSize: "15px", color: "white" }}>
                {"Peso Max: " + weigthMax + " Kg"}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <Container style={page}>
      <Row className="w-100" style={{ border: "2px solid black" }}>
        <Col md className="col-md-6" style={cont1}>
          <Row className="text-center text-white" style={{ fontSize: "20px" }}>
            Cubicaje de contenedores
          </Row>
          <Row className="text-center text-white" style={{ fontSize: "50px" }}>
            Cubicador Aduanero
          </Row>
          {mode === "FREE" ? (
            <></>
          ) : (
            <div
              className=" d-flex align-items-center text-center text-white"
              style={{ fontSize: "15px" }}
            >
              PLAN GOLD <FaStar className="m-1" />
            </div>
          )}

          <div className="w-100 d-flex flex-column align-items-center justify-content-center mt-5">
            <Row
              className="text-center text-white "
              style={{ fontSize: "15px" }}
            >
              Tipos de Contenedor
            </Row>
            <div className="row" style={contOp}>
              {/*Contenedor Dry */}
              <div className="col-sm-4 text-center">
                <img
                  src={container1}
                  alt="Container"
                  width={"145px"}
                  className="img-fluid img-thumbnail"
                  style={{
                    backgroundColor: "transparent",
                    border: "0px solid",
                    height: "80px",
                  }}
                />
                <input
                  type="radio"
                  name="type"
                  onClick={() => {
                    changeType("tipo", "DRY");
                  }}
                  defaultChecked
                />
                <p
                  className="text-center text-white "
                  style={{ fontSize: "13px" }}
                >
                  Contenedor Seco o Dry
                </p>
              </div>
              {/*Contenedor Refrigerado */}
              <div className="col-sm-4 text-center">
                <img
                  src={container2}
                  alt="Container"
                  width={"145px"}
                  className="img-fluid img-thumbnail"
                  style={{
                    backgroundColor: "transparent",
                    border: "0px solid",
                    height: "80px",
                  }}
                />
                <input
                  type="radio"
                  name="type"
                  onClick={() => {
                    changeType("tipo", "REFFER");
                  }}
                />
                <p
                  className="text-center text-white "
                  style={{ fontSize: "13px" }}
                >
                  Contenedor Refrigerado
                </p>
              </div>
              {/*Transporte Terrestre */}
              <div className="col-sm-4 text-center">
                <img
                  src={transport}
                  alt="Container"
                  width={"145px"}
                  className="img-fluid img-thumbnail"
                  style={{
                    backgroundColor: "transparent",
                    border: "0px solid",
                    height: "80px",
                  }}
                />
                <input
                  type="radio"
                  name="type"
                  onClick={() => {
                    changeType("tipo", "TRANSPORT");
                  }}
                />
                <p
                  className="text-center text-white "
                  style={{ fontSize: "13px" }}
                >
                  Transporte Terrestre
                </p>
              </div>
            </div>
          </div>
          <div className="w-100 d-flex flex-column align-items-center justify-content-center mt-5">
            <Row
              className="text-center text-white "
              style={{ fontSize: "15px" }}
            >
              Medidas
            </Row>
            {isTransport ? (
              <span
                className=" d-flex justify-content-start align-items-start text-left text-white m-2"
                style={{ fontSize: "10px", textAlign: "left" }}
              >
                Por favor ingrese todos los datos.
              </span>
            ) : (
              <></>
            )}
            <div
              style={contOp}
              className={
                "d-flex align-items-center justify-content-around text-white mb-3"
              }
            >
              {isTransport ? (
                <ContainerTransport />
              ) : (
                <>
                  <input
                    type="radio"
                    name="measure"
                    onClick={() => {
                      changeType("medidas", "20FT");
                    }}
                    defaultChecked
                  />
                  <p className="m-1">20 FT</p>
                  <input
                    type="radio"
                    name="measure"
                    onClick={() => {
                      changeType("medidas", "40FT");
                    }}
                  />
                  <p className="m-1">40 FT</p>
                  <input
                    type="radio"
                    name="measure"
                    onClick={() => {
                      changeType("medidas", "40HQ");
                    }}
                  />
                  <p className="m-1">40 HC</p>
                </>
              )}
            </div>
            <InfoContainers />
          </div>
        </Col>
        <Col
          md
          className="col-md-6"
          style={{
            minHeight: "90vh",
            paddingTop: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Row>
            <div className=" d-flex flex-column col-8 justify-content-around align-items-start">
              <p style={{ fontSize: "20px" }}>Carga</p>
              <label>
                <span>{checked ? "Multiples Cajas" : "Unica Caja"}</span>
                <Switch onChange={handleChangeChecked} checked={checked} />
              </label>
            </div>
            <div className=" d-flex flex-column col-4  justify-content-center align-items-center">
              <img src={logo} alt="logo" height={"60px"} />
            </div>
          </Row>

          <ContainerBoxes />
          <div className="d-flex justify-content-between">
            <p style={{ fontSize: "20px", marginTop: "10px", height: "20px" }}>
              Resultados
            </p>
           
              <Button
                onClick={() => {
                  Alert.mySwal
                    .fire({
                      title:
                        "¿Seguro que quieres perder información de la carga?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Eliminar",
                      cancelButtonText:"Cancelar",
                    })
                    .then((result) => {
                      if (result.isConfirmed) {
                        resetStateBoxes();                      
                      }
                    });
                }}
                className="m-2"
                style={{
                  backgroundColor: "#465489",
                  border: "1px solid white",
                }}
              >
                Nuevo Cálculo
              </Button>
            
            {mode === "GOLD" ? (
              <PDFDownloadLink
                document={
                  <MyDocument
                    contenedor={{
                      type: type,
                      measure: measure,
                      width: width,
                      heigth: heigth,
                      long: long,
                      weigthMax: weigthMax,
                    }}
                    boxes={boxes}
                    percentVolumen={percentVolumen}
                    percentWeigth={percentWeigth}
                  />
                }
                fileName={hoy.toLocaleDateString()}
              >
                {({ loading }) =>
                  loading ? (
                    <Button className="m-2" variant="info">
                      Cargando
                    </Button>
                  ) : (
                    <Button className="m-2" variant="danger">
                      PDF
                    </Button>
                  )
                }
              </PDFDownloadLink>
            ) : (
              <></>
            )}
          </div>

          <div
            className="d-flex mb-2"
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "space-around",
            }}
          >
            <div>
              <span style={{ fontSize: "13px" }}>Volumen</span>
              <Progressbar
                bgcolor="#2E9AFE"
                progress={percentVolumen.toString()}
                height={20}
              />
              <span style={{ fontSize: "13px" }}>Peso</span>
              <Progressbar
                bgcolor="greenyellow"
                progress={percentWeigth.toString()}
                height={20}
              />
            </div>
            <div
              className=" d-flex flex-column col-md-5 justify-content-center  mb-1"
              style={{ width: "100%" }}
            >
              <div className="container-fluid w-100 h-100">
                <div
                  className={"row  flex-nowrap h-100"}
                  style={{ overflow: isGold ? "auto" : "hidden" }}
                >
                  {results}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
const page: React.CSSProperties = {
  width: "100%",
  minHeight: "100vh",
  fontFamily: "'Roboto Flex', 'sans-serif'",
  display: "flex",
  justifyContent: "center",
  alignItems: "center ",
};
const cont1: React.CSSProperties = {
  minHeight: "90vh",
  backgroundColor: "#465489",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const contOp: React.CSSProperties = {
  backgroundColor: "#6f85d9",
  padding: "10px",
  borderRadius: "10px",
  width: "90%",
  justifyContent: "center",
};
