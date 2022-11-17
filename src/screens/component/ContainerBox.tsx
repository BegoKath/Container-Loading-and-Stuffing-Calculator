import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { useResult } from "../../hooks/useResult";
import { IBox } from "../../interfaces/Ibox";
import { Alert } from "../../utils/Alert";

export const ContainerBox = (boxItem: IBox) => {
  const {
    state: { isGold,optBox},
    resultMultiplesBoxes,
  } = useResult();
  const [values, setValues] = useState<IBox>({
    id: boxItem.id,
    width: boxItem.width,
    height: boxItem.height,
    long: boxItem.long,
    quantity: boxItem.quantity,
    weigth: boxItem.weigth,
    update: boxItem.update,
    units:boxItem.units,
    result: boxItem.result,
  });
  
  const { resultUniqueBox } = useResult();
  const handleChange =
    (prop: keyof IBox) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: Number(event.target.value) });
    };
  const calcule = () => {
    if (
      values.weigth !== 0 &&
      values.height !== 0 &&
      values.long !== 0 &&
      values.width !== 0 &&
      values.units !== 0
    ) {      
      if (isGold) {
        if(values.quantity !==0){
          const update=values.update;
          resultMultiplesBoxes(values,update);
        }else{
         Alert.showError("Debe ingresar todos los campos de la caja.")        
        }        
      }else{
        resultUniqueBox(values,optBox);
      }
    } else {
      Alert.showError("Debe ingresar todos los campos de la caja.")  
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "10px",
      }}
    >
      <TextField
        value={values.width}
        onChange={handleChange("width")}
        label="Ancho de caja"
        size="small"
        type="number"
        style={{ marginBottom: "10px" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
        }}
      />

      <TextField
        value={values.long}
        onChange={handleChange("long")}
        label="Largo de caja"
        id="outlined-size-small"
        size="small"
        type="number"
        style={{ marginBottom: "10px" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
        }}
      />

      <TextField
        value={values.height}
        onChange={handleChange("height")}
        label="Alto de caja"
        id="outlined-size-small"
        size="small"
        type="number"
        style={{ marginBottom: "10px" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
        }}
      />

      <TextField
        value={values.weigth}
        onChange={handleChange("weigth")}
        label="Peso de la caja"
        id="outlined-size-small"
        size="small"
        type="number"
        style={{ marginBottom: "10px" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">kg.</InputAdornment>,
        }}
      />
      <TextField
        value={values.units}
        onChange={handleChange("units")}
        label="Unidades por caja"
        id="outlined-size-small"
        size="small"
        type="number"
        style={{ marginBottom: "10px" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">uni</InputAdornment>,
        }}
      />
      {isGold&&<TextField
        value={values.quantity}
        onChange={handleChange("quantity")}
        label="Cantidad de cajas"
        id="outlined-size-small"
        size="small"
        type="number"
        style={{ marginBottom: "10px" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">uni</InputAdornment>,
        }}
      />}
      
      <Button onClick={calcule} style={{ marginBottom: "20px ",background: "#6f85d9" }}>
        {isGold
          ? values.update
            ? "Cambiar Carga"
            : "Agregar Carga"
          : "Calcular"}
      </Button>
    </div>
  );
};
