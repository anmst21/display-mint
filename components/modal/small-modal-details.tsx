import { View, StyleSheet } from "react-native";
import DetailsItem from "./details-item";
import ContractBtn from "./contract-btn";
import ActionBtn from "./action-btn";
import * as WebBrowser from "expo-web-browser";

interface SmallModalDetailsProps {
  modalItems: any;
  boxOpacity: any;
  smallBtn?: boolean;
}

const handleOpenBrowser = async (link: string) => {
  await WebBrowser.openBrowserAsync(link, {});
};

const SmallModalDetails: React.FC<SmallModalDetailsProps> = ({
  modalItems,
  boxOpacity,
  smallBtn,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        {modalItems.map((item: any, index: number) => {
          return (
            <DetailsItem
              boxOpacity={boxOpacity}
              greyBg={item.greyBg}
              key={index}
              name={item.name}
              value={item.value}
            />
          );
        })}
      </View>
      {smallBtn ? (
        <ActionBtn
          callback={() =>
            handleOpenBrowser(
              `https://basescan.org/token/${modalItems[0].value}?a=${modalItems[1].value}`
            )
          }
          type="contract"
        />
      ) : (
        <ContractBtn
          callback={() =>
            handleOpenBrowser(
              `https://basescan.org/token/${modalItems[0].value}?a=${modalItems[1].value}`
            )
          }
          boxOpacity={boxOpacity}
        />
      )}
    </View>
  );
};

export default SmallModalDetails;

const styles = StyleSheet.create({
  section: { marginBottom: 20 },
  container: { flex: 1 },
});
