import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useContainer } from "../../hooks/useContainer";
import { IContainerState } from "../../store/containers/containerSlice";

export const ContainerTransport = () => {
const {changeTransport}= useContainer();
  const [values, setValues] = useState<IContainerState>({
    type: "Transporte Terrestre ",
    measure: "",
    width: 0,
    heigth: 0,
    long: 0,
    weigthMax: 0,
  });
  useEffect(()=>{
    if(values.width!== 0&& values.heigth !== 0 && values.long !== 0 && values.weigthMax !==0){
        changeTransport(values);
    }
  },[changeTransport, values]);
  const handleChange =
    (prop: keyof IContainerState) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  return (
    <>
      <div className="d-flex flex-column col-6 p-1">
        <TextField
          value={values.width}
          onChange={handleChange("width")}
          label="Ancho"
          size="small"
          type="number"
          style={{ marginBottom: "10px" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
        <TextField
          value={values.heigth}
          onChange={handleChange("heigth")}
          label="Altura"
          size="small"
          type="number"
        
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
      </div>
      <div className="d-flex flex-column col-6 p-1">
        <TextField
          value={values.long}
          onChange={handleChange("long")}
          label="Largo"
          size="small"
          type="number"
          style={{ marginBottom: "10px" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
        <TextField
          value={values.weigthMax}
          onChange={handleChange("weigthMax")}
          label="Peso Max"
          size="small"
          type="number"        
          InputProps={{
            endAdornment: <InputAdornment position="end">kg.</InputAdornment>,
          }}
        />
      </div>
    </>
  );
};
