import { Col, Container, Row } from "react-bootstrap";
import container1 from "../assets/container1.png";
import container2 from "../assets/container2.png";
import { ContainerBox } from "./component/ContainerBox";
import logo from "../assets/logo.png";
import { useContainer } from "../hooks/useContainer";
import { useEffect, useState } from "react";
import { useResult } from "../hooks/useResult";

export const CalculatorScreen = () => {

  const {state:{boxes}} = useResult();  
  const {state:{type,measure,width,heigth,long,weigthMax},changeContainerDry20FT,changeContainerDry40FT,changeContainerDry40HQ,changeContainerReffer20FT,changeContainerReffer40FT,changeContainerReffer40HQ}=useContainer();
  const [typeContainer,setTypeContainer]= useState("DRY");
  const[measureContainer, setMeasureContainer]= useState("20FT");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeContainer=()=>{
    if(typeContainer=== "DRY"){
      if(measureContainer==="20FT"){
        changeContainerDry20FT();
      }
      if(measureContainer==="40FT"){
        changeContainerDry40FT();
      }
      if(measureContainer==="40HQ"){
        changeContainerDry40HQ();
      }
    }
    if(typeContainer=== "REFFER"){
      if(measureContainer==="20FT"){
        changeContainerReffer20FT();
      }
      if(measureContainer==="40FT"){
        changeContainerReffer40FT();
      }
      if(measureContainer==="40HQ"){
       changeContainerReffer40HQ();
      }
    }
  }
  useEffect(()=>{
    changeContainer();
  },[typeContainer, measureContainer, changeContainer]);
  return (
    <div className="d-flex align-items-center justify-content-center m-4">
      <Container style={page}>
        <Row>
          <Col md style={cont1}>
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
              <div style={contOp}>
                <div className="d-flex flex-column">
                  <img
                    src={container1}
                    alt="Container"
                    width={"145px"}
                    height={"80px"}
                  />
                  <input type="radio" name="type" onClick={()=>{setTypeContainer("DRY");}} defaultChecked/>
                  <p
                    className="text-center text-white "
                    style={{ fontSize: "13px" }}
                  >
                    Contenedor Seco o Dry
                  </p>
                </div>
                <div className="d-flex flex-column">
                  <img
                    src={container2}
                    alt="Container"
                    width={"145px"}
                    height={"80px"}
                  />
                  <input type="radio" name="type" onClick={()=>{setTypeContainer("REFFER");}}/>
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
                <input type="radio" name="measure" onClick={()=>{setMeasureContainer("20FT")}} defaultChecked/>
                <p className="m-1" >20 FT</p>
                <input type="radio" name="measure" onClick={()=>{setMeasureContainer("40FT")}}/>
                <p className="m-1">40 FT</p>
                <input type="radio" name="measure" onClick={()=>{setMeasureContainer("40HQ")}}/>
                <p className="m-1">40 HQ</p>
              </div>
            </div>
          </Col>
          <Col md style={{ minHeight: "650px", paddingTop: "20px" }}>
            <div className="d-flex mb-2">
              <div className=" d-flex flex-column col-6 justify-content-end align-items-end">
                <p style={{ fontSize: "25px" }}>Carga</p>
              </div>
              <div className=" d-flex flex-column col-6 justify-content-end align-items-end">
                <img src={logo} alt="logo" height={"80px"} />
              </div>
            </div>
            <ContainerBox />
            <p style={{ fontSize: "25px", marginTop: "10px" }}> Resultados</p>
            <div className="d-flex justify-content-around mb-2">
              <div
                className=" d-flex flex-column col-5 justify-content-center border rounded px-4 py-2 shadow-sm"
                style={{ backgroundColor: "#6f85d9" }}
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
                <p style={{ fontSize: "15px", color: "white" }}>{"Largo: "+long}</p>
                <p style={{ fontSize: "15px", color: "white" }}>{"Ancho: "+width}</p>
                <p style={{ fontSize: "15px", color: "white" }}>{"Alto: "+heigth}</p>
                <p style={{ fontSize: "15px", color: "white" }}>{"Peso Max: "+weigthMax}</p>
              </div>
              <div className=" d-flex flex-column col-5 justify-content-around border rounded-lg px-4 py-2 bg-white shadow-sm">
                <p style={{ fontSize: "15px", color: "#6f85d9" }}>{"Cajas: "+boxes.toFixed(2)}</p>
                <p style={{ fontSize: "15px", color: "#6f85d9" }}>Unidades:</p>
                <p style={{ fontSize: "15px", color: "#6f85d9" }}>
                  Peso Bruto:
                </p>
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
  fontFamily: "'Raleway', sans-serif",
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
  display: "flex",
  justifyContent: "space-around",
  width: "90%",
};
