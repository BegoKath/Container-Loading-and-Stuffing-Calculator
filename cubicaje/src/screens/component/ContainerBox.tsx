import {  TextField } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import box from "../../assets/box.png";

export const ContainerBox = () => {
  return (
    <div className="d-flex align-items-center border rounded-lg px-4 py-2 bg-white shadow-sm">
      <Row>
        <Col md style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={box}
            className="img-fluid img-thumbnail"
            alt="box"
            style={{ border: "0px solid" }}
          />
        </Col>
        <Col
          md
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center"
          }}
        >
          <div className="d-flex align-items-center w-100 justify-content-between mb-2">
            <TextField
              label="Ancho de carga"
              size="small"
              type="number" 
              style={{width:"80%"}}               
            />
            <div className="m-2">cm</div>
          </div>
          <div className="d-flex align-items-center w-100 justify-content-between  mb-2">
            <TextField
              label="Largo de carga"
              id="outlined-size-small"
              size="small"              
              type="number"      
              style={{width:"80%"}}          
            />
            <div className="m-2">cm</div>
          </div>
          <div className="d-flex align-items-center  w-100 justify-content-between  mb-2">
            <TextField
              label="Alto de carga"
              id="outlined-size-small"
              size="small"              
              type="number"  
              style={{width:"80%"}}            
            />
             <div className="m-2">cm</div>
          </div>
          <div className="d-flex align-items-center  w-100 justify-content-between mb-2">
            <TextField
              label="Peso"
              id="outlined-size-small"
              size="small"              
              type="number"
              style={{width:"80%"}}  
            />
             <div className="m-2">kg.</div>
          </div>
          <div className="d-flex align-items-center  w-100 justify-content-start ">
            <TextField
              label="Cantidad"
              id="outlined-size-small"
              size="small"
              type="number"
              style={{width:"80%"}}  
            />             
          </div>
        </Col>
      </Row>
    </div>
  );
};
