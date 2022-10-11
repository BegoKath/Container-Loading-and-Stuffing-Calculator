import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { useResult } from "../../hooks/useResult";
import { IBox } from "../../interfaces/Ibox";

export const ContainerBox = (boxItem: IBox) => {
  const {
    state: { isGold },
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
    result: boxItem.result,
  });
  const { resultUniqueBox } = useResult();
  const handleChange =
    (prop: keyof IBox) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const calcule = () => {
    if (
      values.weigth !== 0 &&
      values.height !== 0 &&
      values.long !== 0 &&
      values.width !== 0 &&
      values.quantity !== 0
    ) {
      
      if (isGold) {
        const update=values.update;
        resultMultiplesBoxes(values,update);
      }else{
        resultUniqueBox(values);
      }
    } else {
      console.log("falta items");
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
        label="Ancho de carga"
        size="small"
        type="number"
        style={{ marginBottom: "10px" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
        }}
      />

      <TextField
        value={values.long}
        onChange={handleChange("long")}
        label="Largo de carga"
        id="outlined-size-small"
        size="small"
        type="number"
        style={{ marginBottom: "10px" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
        }}
      />

      <TextField
        value={values.height}
        onChange={handleChange("height")}
        label="Alto de carga"
        id="outlined-size-small"
        size="small"
        type="number"
        style={{ marginBottom: "10px" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
        }}
      />

      <TextField
        value={values.weigth}
        onChange={handleChange("weigth")}
        label="Peso de la carga"
        id="outlined-size-small"
        size="small"
        type="number"
        style={{ marginBottom: "10px" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">kg.</InputAdornment>,
        }}
      />
      <TextField
        value={values.quantity}
        onChange={handleChange("quantity")}
        label="Cantidad"
        id="outlined-size-small"
        size="small"
        type="number"
        style={{ marginBottom: "10px" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">uni</InputAdornment>,
        }}
      />
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
