import { Col, Container, Row } from "react-bootstrap";
import container1 from "../assets/container1.png";
import container2 from "../assets/container2.png";
import logo from "../assets/logo.png";
import { useContainer } from "../hooks/useContainer";
import { useEffect, useState } from "react";
import { useResult } from "../hooks/useResult";
import { ContainerBoxes } from "./component/ContainerBoxes";
import { IBox } from "../interfaces/Ibox";

export const CalculatorScreen = () => {
  const {
    state: { isGold, boxes },
    showWindowGold,
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeContainer = () => {
    if (typeContainer === "DRY") {
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
  };
  useEffect(() => {
    const url = window.location.href;
    const urlParams = new URLSearchParams(url);
    const gold = urlParams.get("gold");
    if (gold != null) {
      showWindowGold(true);
      return;
    }
    showWindowGold(false);
  }, [showWindowGold]);
  useEffect(() => {
    changeContainer();
    console.log(boxes);
  }, [typeContainer, measureContainer, changeContainer, boxes]);
  const results = boxes.map((e: IBox) => {
    return (
      <div
        className={
          " d-flex flex-column " +
          (isGold ? "col-5 " : "col-12 ") +
          "justify-content-around border rounded-lg px-4 py-2 bg-white shadow-sm mx-1"
        }
        style={{ width: "200px" }}
        key={e.id}
      >
        <p style={{ fontSize: "15px", color: "#6f85d9" }}>
          {"Cajas: " + e.result.numboxes}
        </p>
        <p style={{ fontSize: "15px", color: "#6f85d9" }}>
          {"Unidades: " + e.result.units}
        </p>
        <p style={{ fontSize: "15px", color: "#6f85d9" }}>
          {"Peso Bruto: " + e.result.weightMax.toFixed(2) + " Kg"}
        </p>
      </div>
    );
  });
  return (
    <div className="d-flex align-items-center justify-content-center m-3">
      <Container style={page}>
        <Row>
          <Col md className="col-md-6" style={cont1}>
            <Row
              className="text-center text-white"
              style={{ fontSize: "20px" }}
            >
              Cubicaje de contenedores
            </Row>
            <Row
              className="text-center text-white"
              style={{ fontSize: "50px" }}
            >
              Calculadora
            </Row>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center mt-5">
              <Row
                className="text-center text-white "
                style={{ fontSize: "15px" }}
              >
                Tipos de Contenedor
              </Row>
              <div  className="row" style={contOp}>
                <div className="col-sm-4 text-center">
                  <img
                    src={container1}
                    alt="Container"
                    width={"145px"}
                    className="img-fluid img-thumbnail"
                    style={{backgroundColor:"transparent", border:"0px solid"}}
                  />
                  <input
                    type="radio"
                    name="type"
                    onClick={() => {
                      setTypeContainer("DRY");
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
                <div className="col-sm-4 text-center">
                  <img
                    src={container2}
                    alt="Container"
                    width={"145px"}
                    className="img-fluid img-thumbnail"
                    style={{backgroundColor:"transparent", border:"0px solid"}}
                  />
                  <input
                    type="radio"
                    name="type"
                    onClick={() => {
                      setTypeContainer("REFFER");
                    }}
                  />
                  <p
                    className="text-center text-white "
                    style={{ fontSize: "13px" }}
                  >
                    Contenedor Refrigerado
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
              <div
                style={contOp}
                className="d-flex align-items-center justify-content-around text-white"
              >
                <input
                  type="radio"
                  name="measure"
                  onClick={() => {
                    setMeasureContainer("20FT");
                  }}
                  defaultChecked
                />
                <p className="m-1">20 FT</p>
                <input
                  type="radio"
                  name="measure"
                  onClick={() => {
                    setMeasureContainer("40FT");
                  }}
                />
                <p className="m-1">40 FT</p>
                <input
                  type="radio"
                  name="measure"
                  onClick={() => {
                    setMeasureContainer("40HQ");
                  }}
                />
                <p className="m-1">40 HQ</p>
              </div>
            </div>
          </Col>
          <Col
            md
            className="col-md-6"
            style={{ minHeight: "650px", paddingTop: "10px" }}
          >
            <div className=" d-flex justify-content-center align-items-center">
              <p style={{ fontSize: "20px" }}>Carga</p>
            </div>
            {/* <div className=" d-flex flex-column col-6 justify-content-end align-items-end">
                <img src={logo} alt="logo" height={"60px"} />
                </div>*/}
            <ContainerBoxes />
            <p style={{ fontSize: "20px", marginTop: "10px", height: "20px" }}>
              Resultados
            </p>
            <div
              className="d-flex mb-2"
              style={{
                flexDirection: isGold ? "column" : "row",
                justifyContent: isGold ? "center" : "space-around",
                alignItems: isGold ? "center" : "space-around",
              }}
            >
              <div
                className=" d-flex flex-column col-5 justify-content-center border rounded  px-2 py-2  shadow-sm mb-1"
                style={{
                  backgroundColor: "#6f85d9",
                  width: isGold ? "100%" : "",
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
                    flexDirection: isGold ? "row" : "column",
                    justifyContent: "space-around",
                  }}
                >
                  <div className="d-flex flex-column">
                    <p style={{ fontSize: "15px", color: "white" }}>
                      {"Largo: " + long + " mm"}
                    </p>
                    <p style={{ fontSize: "15px", color: "white" }}>
                      {"Ancho: " + width + " mm"}
                    </p>
                  </div>
                  <div className="d-flex flex-column">
                    <p style={{ fontSize: "15px", color: "white" }}>
                      {"Alto: " + heigth + " mm"}
                    </p>
                    <p style={{ fontSize: "15px", color: "white" }}>
                      {"Peso Max: " + weigthMax + " Kg"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row flex-nowrap justify-content-center" style={scrollh}>
                  {results}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const page: React.CSSProperties = {
  width: "90%",
  minHeight: "90%",
  border: "2px solid black",
  fontFamily: "'Roboto Flex', 'sans-serif'",
};
const cont1: React.CSSProperties = {
  backgroundColor: "#465489",
  minHeight: "650px",
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
  justifyContent:"center"
};
const scrollh: React.CSSProperties = {
  overflow: "auto",
};
