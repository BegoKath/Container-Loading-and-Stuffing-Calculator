import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/logo.png";
import box from "../../assets/box.png";
import { IContainerState } from "../../store/containers/containerSlice";
import { IBox } from "../../interfaces/Ibox";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  sectionTitle: {
    flexDirection: "column",
    marginHorizontal: 10,
    padding: 10,
    textAlign: "center",
  },
  sectionLogo: {
    height: "60px",
    margin: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sectionContainer: {
    marginHorizontal: 10,
  },
  sectionInfo: {
    backgroundColor: "#465489",
    color: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    fontSize: 12,
    padding: 10,
  },
  sectionBox: {
    backgroundColor: "white",
    color: "#465489",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    fontSize: 12,
    padding: 10,
  },
});
interface Props {
  contenedor: IContainerState;
  boxes: IBox[];
}
// Create Document Component
export const MyDocument = ({ contenedor, boxes }: Props) => {
  const datos = boxes.map((e: IBox) => {
    return (
      <View style={styles.sectionBox}>
        <Text style={{ marginBottom: 5, textAlign: "center" }}>
          {"Caja " + (e.id + 1)}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Image src={box} style={{ height: "80px" }} />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Text style={{ marginBottom: 5 }}>
              {"Ancho: " + e.width + " mm"}
            </Text>
            <Text style={{ marginBottom: 5 }}>
              {"Alto: " + e.height + " mm"}
            </Text>

            <Text style={{ marginBottom: 5 }}>
              {"Largo: " + e.long + " mm"}
            </Text>
            <Text style={{ marginBottom: 5 }}>
              {"Peso Máximo: " + e.weigth + " kg"}
            </Text>
            <Text style={{ marginBottom: 5 }}>{"Unidades: " + e.units}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <Text style={{ marginBottom: 5 }}>
            {"Cantidad de cajas: " + e.result.numboxes}
          </Text>
          <Text style={{ marginBottom: 5 }}>
            {"Unidades: " + e.result.units}
          </Text>
          <Text style={{ marginBottom: 5 }}>
            {"Peso Bruto: " + e.result.weightMax}
          </Text>
        </View>
      </View>
    );
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sectionLogo}>
          <Image src={logo} style={{ height: "50px" }} />
        </View>
        <View style={styles.sectionTitle}>
          <Text style={{ fontSize: 20 }}>Cubicaje de contenedores</Text>
          <Text style={{ margin: "5px", fontSize: 15 }}> Calculadora</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{ fontSize: 15, color: "#465489" }}>Resultados</Text>
          <View style={styles.sectionInfo}>
            <Text style={{ textAlign: "center", marginBottom: 5 }}>
              {"Información sobre el Contenedor"}
            </Text>
            <Text style={{ marginBottom: 5 }}>
              {"Tipo de contenedor: " + contenedor.type + contenedor.measure}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={{ marginBottom: 5 }}>
                  {"Ancho: " + contenedor.width + " mm"}
                </Text>
                <Text style={{ marginBottom: 5 }}>
                  {"Alto: " + contenedor.heigth + " mm"}
                </Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ marginBottom: 5 }}>
                  {"Largo: " + contenedor.long + " mm"}
                </Text>
                <Text style={{ marginBottom: 5 }}>
                  {"Peso Máximo: " + contenedor.weigthMax + " kg"}
                </Text>
              </View>
            </View>
          </View>
          <Text style={{ fontSize: 13, color: "#465489",textAlign:"center" }}>Carga</Text>
          {datos}
        </View>
      </Page>
    </Document>
  );
};
