import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Copy, BaseCoin, ChevModal, ChevRight } from "../icon";
import * as Haptics from "expo-haptics";
import ModalCloseBar from "../modal/modal-close-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  runOnJS,
} from "react-native-reanimated";
import moment from "moment";

import { useEffect, useState, useContext, useCallback, useMemo } from "react";
import ContractBtn from "../modal/contract-btn";
import DatePicker from "react-native-date-picker";
import SortingPageItem from "./sorting-page-item";
import { SortingState } from "./types";
import { ExploreHistory, ExploreMints, ExploreFeed } from "../icon";
import { ExploreContext } from "@/context/ExploreContext";

interface WalletCardModalProps {
  modalState: boolean;
  viewWidth: number;
  setLargeModalVisible: (value: boolean) => void;
}

const WalletCardModal: React.FC<WalletCardModalProps> = ({
  modalState,
  viewWidth,
  setLargeModalVisible,
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [choiceDate, setChoiceDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const {
    state: { exploreFeedState },
    setExploreFeedState,
    setIsWalletOpen,
  } = useContext(ExploreContext);

  const [sortingState, setSoringState] =
    useState<SortingState>(exploreFeedState);

  const modalHeight = useSharedValue(60);
  const modalWidth = useSharedValue(90);
  const modalBorderRadius = useSharedValue(13);
  const modalRight = useSharedValue(0);
  const modalBottom = useSharedValue(0);
  const modalColor = useSharedValue("rgba(0, 0, 0, 0)");
  const modalOpacity = useSharedValue(0);
  const scrollOpacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: modalColor.value,
      bottom: modalBottom.value,
      right: modalRight.value,
      borderRadius: modalBorderRadius.value,
      width: modalWidth.value,
      height: modalHeight.value,
      transform: [{ translateY: translateY.value }],
      // opacity: modalOpacity.value,
    };
  });

  const useHaptic = async () =>
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);

  const setModalVisible = useCallback(() => {
    setLargeModalVisible(false);
  }, []);

  useEffect(() => {
    if (!modalState) {
      useHaptic();
      modalHeight.value = withTiming(
        60,
        {
          duration: 200,
        },
        () => {
          runOnJS(setModalVisible)();
        }
      );
      modalWidth.value = withTiming(90, {
        duration: 200,
      });
      modalBorderRadius.value = withTiming(13, {
        duration: 200,
      });
      modalRight.value = withTiming(0, {
        duration: 200,
      });
      modalBottom.value = withTiming(0, {
        duration: 200,
      });
      modalColor.value = withTiming("rgba(0, 0, 0, 0)", {
        duration: 200,
      });
      modalOpacity.value = withTiming(0, {
        duration: 50,
      });
      scrollOpacity.value = withTiming(0, {
        duration: 50,
      });
    } else {
      useHaptic();

      modalHeight.value = withTiming(495, {
        duration: 200,
      });
      modalWidth.value = withTiming(viewWidth - 50, {
        duration: 200,
      });
      modalBorderRadius.value = withTiming(25, {
        duration: 200,
      });
      modalRight.value = withTiming(-25, {
        duration: 200,
      });
      modalBottom.value = withTiming(-25, {
        duration: 200,
      });
      modalColor.value = withTiming("rgba(28, 28, 29, 1)", {
        duration: 200,
      });
      modalOpacity.value = withDelay(
        100,
        withTiming(1, {
          duration: 300,
        })
      );
      scrollOpacity.value = withDelay(
        150,
        withTiming(1, {
          duration: 300,
        })
      );
    }
  }, [modalState]);

  const scrollOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollOpacity.value,
    };
  });

  const sortingModalItems = [
    {
      main: "History",
      secondary: "NFTs that you skipped",
      icon: <ExploreHistory />,
      state: SortingState.history,
    },
    {
      main: "Explore",
      secondary: "Our daily recomendations",
      icon: <ExploreFeed isActive />,
      state: SortingState.explore,
    },
    {
      main: "Collection",
      secondary: "Your mints",
      icon: <ExploreMints />,
      state: SortingState.collection,
    },
  ];

  const sortingPageItemCallback = useCallback((value: SortingState) => {
    setExploreFeedState(value);
    setIsWalletOpen(false);
  }, []);

  return (
    <Animated.View style={[animatedStyles, styles.container]}>
      <Animated.View style={[scrollOpacityStyle, { flex: 1 }]}>
        <ModalCloseBar />
        <Text style={styles.headerText}>Sorting</Text>

        <Text style={styles.headerCategory}>Sort by Category</Text>
        {sortingModalItems.map((data, index) => {
          return (
            <SortingPageItem
              callback={() => {
                setSoringState(data.state);
              }}
              key={index}
              isActive={data.state === sortingState}
              main={data.main}
              secondary={data.secondary}
              icon={data.icon}
            />
          );
        })}

        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={styles.dateSortBtn}
        >
          <Text style={styles.dateSortText}>
            {!choiceDate
              ? "Sort by Date"
              : moment(choiceDate).format("MMMM D, YYYY h:mm A")}
          </Text>
          <ChevRight color="#8E8E93" />
        </TouchableOpacity>
        <DatePicker
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
            setChoiceDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          theme="dark"
          open={open}
          modal
          date={date}
          onDateChange={setDate}
        />
        <ContractBtn
          callback={() => sortingPageItemCallback(sortingState)}
          apply
        />
      </Animated.View>
    </Animated.View>
  );
};

export default WalletCardModal;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "absolute",
    borderCurve: "continuous",
    zIndex: 1,
    padding: 25,
    paddingTop: 0,
  },
  headerText: {
    width: "100%",
    textAlign: "center",
    paddingTop: 35,
    paddingBottom: 40,
    fontSize: 17,
    fontFamily: "SFPro-ExpandedSemibold",
    color: "white",
  },
  headerCategory: {
    fontFamily: "SFPro-SemiboldItalic",
    fontSize: 16,
    color: "#8E8E93",
    marginBottom: 15,
  },
  dateSortBtn: {
    borderRadius: 13,
    borderCurve: "continuous",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    flexDirection: "row",
    padding: 10,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  dateSortText: { fontFamily: "SFPro-Medium", fontSize: 13, color: "white" },
});
