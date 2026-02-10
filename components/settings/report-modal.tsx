import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState, useMemo, useEffect, useContext, useCallback } from "react";
// import { provider, storage } from "../../app/_layout";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { storage } from "@/context/storage";
import Animated from "react-native-reanimated";
import ModalCloseBar from "../modal/modal-close-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Context } from "@/context/FeedContext";
const { height: screenHeight } = Dimensions.get("window");
import OutsidePressHandler from "react-native-outside-press";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import CBWSection from "./cbw-section";
import { ReportType } from "./types";
import ReportTypeItem from "./report-type-item";
import ClipperBox from "./clipper-box";
import MintBtn from "../modal/modal-mint-btn";
import axios from "axios";
import * as Haptics from "expo-haptics";

interface ReportModalProps {
  setIsModalVisible: (value: boolean) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ setIsModalVisible }) => {
  const cachedAddress = useMemo(() => storage.getString("address"), []);

  const {
    state: { isReportOpen, ensName },
    setReportOpen,
  } = useContext(Context);
  const [containerHeight, setContainerHeight] = useState(0);
  const [email, setEmail] = useState("");
  const [problem, setProblem] = useState("");
  const [reportType, setReportType] = useState<ReportType>(ReportType.Bug);
  const [emailValid, setEmailValid] = useState(true);
  const [problemValid, setProblemValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isReportOpen) {
      setEmailValid(true);
      setProblemValid(true);
      setIsSubmitted(false);
    }
  }, [isReportOpen]);

  const [image, setImage] = useState<
    { image: string; fileName: string; mimeType: string }[]
  >([]);

  const insets = useSafeAreaInsets();

  const useHaptics = async () =>
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

  useEffect(() => {
    if (isReportOpen) {
      useHaptics();
    }
  }, [isReportOpen]);

  const onClose = useCallback(async () => {
    setReportOpen(false);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, []);

  const onAnimationEnd = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const { containerAnimatedStyle, containerPan } = useBottomSheet({
    onAnimationEnd,
    onClose,
    isOpen: isReportOpen,
    screenHeight: screenHeight,
    containerHeight,
  });

  const handleLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  const handleEmailChange = (text: any) => {
    setEmail(text);
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailPattern.test(text));
  };

  const escapeMarkdownV2 = (text: string) => {
    return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
  };

  const sendReport = async () => {
    const botToken = process.env.EXPO_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.EXPO_PUBLIC_TELEGRAM_CHAT_ID;

    const reportMessage = `
    🚨 *New Report Submitted* 🚨
    🧑‍💻 *ETH Address:* \`${escapeMarkdownV2(cachedAddress as string)}\`
    📧 *Email:* ${escapeMarkdownV2(email)}
    🔧 *Type:* ${escapeMarkdownV2(reportType)}
    ⚠️ *Problem:* ${escapeMarkdownV2(problem)}
  `;

    setIsSubmitted(true);

    if (email.length === 0 || !emailValid) {
      setEmailValid(false);
      return;
    }
    if (problem.length === 0 || !problemValid) {
      setProblemValid(false);
      return;
    }
    setReportOpen(false);
    try {
      // Check if there are any images
      if (image && image.length > 0) {
        // If images exist, send them as a media group along with the message
        const mediaGroup = image.map((img, index) => ({
          type: "photo",
          media: `attach://${img.fileName}`, // Use attach:// to reference the file
          caption: index === 0 ? reportMessage : "", // Add caption only to the first image
          parse_mode: "MarkdownV2",
        }));

        const formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("media", JSON.stringify(mediaGroup));

        // Attach files for each image
        image.forEach((img) => {
          // @ts-ignore
          formData.append(img.fileName, {
            uri: img.image,
            name: img.fileName,
            type: img.mimeType,
          });
        });

        // Send the media group with the report
        await axios.post(
          `https://api.telegram.org/bot${botToken}/sendMediaGroup`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // If there are no images, send only the text message
        await axios.post(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            chat_id: chatId,
            text: reportMessage,
            parse_mode: "MarkdownV2", // Use MarkdownV2 to format the message
          }
        );
      }
      setProblem("");
      setEmail("");
      setImage([]);
      setReportType(ReportType.Bug);

      alert("Report sent successfully!");
    } catch (error) {
      console.error("Failed to send report:", error);
      alert("Failed to send report");
    }
  };

  const handleChangeProblem = (text: string) => {
    if (!problemValid) {
      setProblemValid(true);
    }
    setProblem(text);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={-210}
        style={styles.onTop}
        behavior="position"
      >
        <OutsidePressHandler
          //  style={{ zIndex: 1000 }}
          disabled={!isReportOpen}
          onOutsidePress={() => setReportOpen(false)}
        >
          <GestureDetector gesture={containerPan}>
            <Animated.View
              onLayout={handleLayout}
              style={[
                containerAnimatedStyle,
                styles.modalContainer,
                { bottom: insets.bottom },
              ]}
            >
              <ModalCloseBar />
              <View style={styles.headerContainer}>
                <Text style={styles.modalHeader}>Report</Text>
              </View>

              <CBWSection ensName={ensName} cachedAddress={cachedAddress} />

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleEmailChange}
                  value={email}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="emailAddress"
                  importantForAutofill="yes"
                  placeholderTextColor={"rgba(142, 142, 147, .5)"}
                />
                {!emailValid && isSubmitted && (
                  <Text style={styles.errorText}>
                    Please enter a valid email address.
                  </Text>
                )}
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.h2}>Select your problem</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.scrollContainer}
                  style={styles.scrollVisible}
                >
                  {Object.values(ReportType).map((type, index) => {
                    console.log(type);
                    return (
                      <ReportTypeItem
                        reportType={type}
                        isActive={reportType === type}
                        setReportType={setReportType}
                        key={index}
                      />
                    );
                  })}
                </ScrollView>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.messageHeader}>Explain your problem</Text>
                <TextInput
                  style={styles.messageInput}
                  multiline={true}
                  placeholder="Type your report here"
                  numberOfLines={4}
                  onChangeText={handleChangeProblem}
                  value={problem}
                  placeholderTextColor={"rgba(142, 142, 147, .5)"}
                />
                {!problemValid && isSubmitted && (
                  <Text style={styles.errorText}>
                    Please enter your report.
                  </Text>
                )}
              </View>
              <View style={styles.clipperBoxContainer}>
                {Array.from({ length: 4 }, (_, index) => {
                  return (
                    <ClipperBox
                      image={image.length > index ? image[index].image : null}
                      setImage={setImage}
                      index={index}
                      key={index}
                    />
                  );
                })}
              </View>
              <Text style={styles.textGrey}>
                We will give you an E-Mail response as soon as possible
              </Text>
              <MintBtn value="Send" callback={() => sendReport()} />
            </Animated.View>
          </GestureDetector>
        </OutsidePressHandler>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ReportModal;

const styles = StyleSheet.create({
  onTop: { zIndex: 100 },
  scrollContainer: {
    flexDirection: "row",
    gap: 10,
  },
  scrollVisible: {
    overflow: "visible",
  },
  modalHeader: {
    fontFamily: "SFPro-ExpandedSemibold",
    fontSize: 22,
    color: "white",
  },
  messageContainer: {
    gap: 10,
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 25,
    borderRadius: 20,
    borderCurve: "continuous",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    width: "100%",
    marginTop: 20,
  },
  messageHeader: {
    fontFamily: "SFPro-SemiboldItalic",
    color: "rgba(142, 142, 147, 1)",
    fontSize: 13,
  },
  messageInput: {
    fontFamily: "SFPro-Medium",
    fontSize: 13,
    color: "white",
    height: 90,
  },
  clipperBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 20,
  },
  textGrey: {
    fontFamily: "SF-Pro",
    fontSize: 13,
    color: "#8E8E93",
    lineHeight: 16,
    marginBottom: 20,
  },
  sectionContainer: {
    gap: 15,
    // backgroundColor: "yellow",
    flexShrink: 1,
  },
  h2: {
    //  marginHorizontal: 25,
    color: "rgba(142, 142, 147, 1)",
    fontSize: 16,
    fontFamily: "SFPro-SemiboldItalic",
  },
  inputContainer: {
    //  marginHorizontal: 25,
    width: "100%",
    height: 50,
    padding: 10,
    //   flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 13,
    borderCurve: "continuous",
    marginVertical: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
    marginBottom: 40,
    marginHorizontal: 25,
  },

  errorText: {
    position: "absolute",
    bottom: -15,
    color: "#DF5555",
    fontSize: 13,
    marginTop: 8,
    fontFamily: "SFPro-Medium",
  },
  input: {
    fontFamily: "SFPro-Medium",
    fontSize: 13,
    color: "white",
    //  backgroundColor: "blue",
    flex: 1,
  },

  modalContainer: {
    position: "absolute",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#1C1C1D",
    borderRadius: 25,
    borderCurve: "continuous",
    zIndex: 100,
    padding: 25,
    paddingTop: 0,
    left: 20,
    right: 20,
  },
});
