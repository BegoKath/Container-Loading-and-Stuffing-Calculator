import {  TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import box from "../../assets/box.png";
import { useResult } from "../../hooks/useResult";
import { IBox } from "../../interfaces/Ibox";

export const ContainerBox = () => {
  const [values, setValues] = useState<IBox>({
    width:0,
    height:0,
    long:0,
    quantity:0,
    weigth:0
  });
  const {resultUniqueBox}= useResult();
  const handleChange = (prop: keyof IBox)=> (event: ChangeEvent<HTMLInputElement>)=>{
    setValues({...values,[prop]: event.target.value});
  }
 
  useEffect(()=>{
    if(values.weigth!==0&&values.height!==0&&values.long!==0&&values.width!==0&&values.quantity!==0){
      resultUniqueBox(values);
    }
  },[resultUniqueBox, values])

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
              
              value={values.width}
              onChange={handleChange('width')}
              label="Ancho de carga"
              size="small"
              type="number" 
              style={{width:"80%"}}               
            />
            <div className="m-2">mm</div>
          </div>
          <div className="d-flex align-items-center w-100 justify-content-between  mb-2">
            <TextField
             value={values.long}
             onChange={handleChange('long')}
              label="Largo de carga"
              id="outlined-size-small"
              size="small"              
              type="number"      
              style={{width:"80%"}}          
            />
            <div className="m-2">mm</div>
          </div>
          <div className="d-flex align-items-center  w-100 justify-content-between  mb-2">
            <TextField
             value={values.height}
             onChange={handleChange('height')}
              label="Alto de carga"
              id="outlined-size-small"
              size="small"              
              type="number"  
              style={{width:"80%"}}            
            />
             <div className="m-2">mm</div>
          </div>
          <div className="d-flex align-items-center  w-100 justify-content-between mb-2">
            <TextField
             value={values.weigth}
             onChange={handleChange('weigth')}
              label="Peso de la carga"
              id="outlined-size-small"
              size="small"              
              type="number"
              style={{width:"80%"}}  
            />
             <div className="m-2">kg.</div>
          </div>
          <div className="d-flex align-items-center  w-100 justify-content-start ">
            <TextField
             value={values.quantity}
             onChange={handleChange('quantity')}
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
