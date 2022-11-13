import {
  Button,
  MobileStepper,
  useTheme,
  Box,
  Typography,
  Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useResult } from "../../hooks/useResult";
import { IBox } from "../../interfaces/Ibox";
import { ContainerBox } from "./ContainerBox";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import box from "../../assets/box.png";
import { Col } from "react-bootstrap";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography  component={'div'} variant={"body1"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const ContainerBoxes = () => {
  const theme = useTheme();
  const {
    state: { isGold, boxes,numStep,optBox },setOptBox
  } = useResult();
  const [activeStep, setActiveStep] = useState(numStep);
  const [maxSteps,setMaxSteps]= useState(boxes.length)
  
  useEffect(()=>{
     setMaxSteps(boxes.length);
     if(boxes.length===1){
      setActiveStep(0);
     }
  },[boxes]);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderItems = (item: IBox) => {
    return (
      <TabPanel index={item.id} value={activeStep} key={item.id}>
        <ContainerBox {...item} />
      </TabPanel>
    );
  };
  const handleChangeChecked=(event: React.ChangeEvent<HTMLInputElement>)=>{
    setOptBox(event.target.checked);}
  useEffect(()=>{
    setActiveStep(numStep)
  },[numStep])
  return (
    <div className="d-flex  align-items-center border rounded-lg  bg-white shadow-sm">
      <Col
        md
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={box}
          alt="box"
          className="img-fluid img-thumbnail"
          style={{ border: "0px solid" }}
        />
        <span style={{color:"#465489"}}>{"Caja " + (activeStep + 1)}</span>
        {isGold?
        <MobileStepper
          steps={maxSteps}
          position="static"
          color="#465489"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              style={{color:"#465489"}}
              disabled={activeStep === maxSteps - 1}
            >              
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              style={{color:"#465489"}}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              
            </Button>
          }
        />:(<label>
          <span>Optimizar el espacio</span>
          <Switch
            onChange={handleChangeChecked}
            checked={optBox}
          />
        </label>)}
        
      </Col>
      <Col
        md
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {boxes.map((item) => renderItems(item))}
      </Col>
    </div>
  );
};
