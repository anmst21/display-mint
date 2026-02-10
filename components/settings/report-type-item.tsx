import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ReportType } from "./types";

interface ReportTypeItemProps {
  reportType: ReportType;
  isActive: boolean;
  setReportType: (value: ReportType) => void;
}

const ReportTypeItem: React.FC<ReportTypeItemProps> = ({
  reportType,
  isActive,
  setReportType,
}) => {
  return (
    <TouchableOpacity
      onPress={() => setReportType(reportType)}
      style={[
        styles.container,
        {
          backgroundColor: isActive
            ? "rgba(223, 85, 85, 0.1)"
            : "rgba(242, 242, 247, 0.1)",
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: isActive ? "rgba(223, 85, 85, 1)" : "white",
          },
        ]}
      >
        {reportType}
      </Text>
    </TouchableOpacity>
  );
};

export default ReportTypeItem;

const styles = StyleSheet.create({
  text: { fontSize: 17, fontFamily: "SFPro-ExpandedSemibold" },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    height: 50,
    borderCurve: "continuous",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
