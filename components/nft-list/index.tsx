import { View, Dimensions, StyleSheet, FlatList } from "react-native";
import { LoadingMain } from "../icon";
import ExploreImage from "../explore/explore-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / 3;

interface NftListProps {
  users: any[];
  isLoading: boolean;
  isLoadingMore: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  createLink: (tokenId: any, index: number) => string;
}

const NftList: React.FC<NftListProps> = ({
  users,
  isLoading,
  isLoadingMore,
  onRefresh,
  onEndReached,
  createLink,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      {isLoading ? (
        <View style={[StyleSheet.absoluteFill, styles.loadingPage]}>
          <LoadingMain />
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ExploreImage
              blurhash={item?.blurhash}
              link={createLink(item.tokenId, index)}
              uri={item?.fullUriSm || undefined}
              key={index}
              index={index}
              imageSize={imageSize - 8}
            />
          )}
          refreshing={isLoading}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          numColumns={3}
          columnWrapperStyle={styles.wrapperStyle}
          contentContainerStyle={[
            styles.contentStyle,
            {
              paddingTop: insets.top,
            },
          ]}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          onEndReachedThreshold={0.7}
          ListFooterComponent={
            <>
              {isLoadingMore && (
                <View style={styles.loader}>
                  <LoadingMain />
                </View>
              )}
            </>
          }
        />
      )}
    </>
  );
};

export default NftList;

const styles = StyleSheet.create({
  loadingPage: { alignItems: "center", justifyContent: "center" },
  wrapperStyle: {
    justifyContent: "space-between",
    marginBottom: 4,
    gap: 4,
  },
  contentStyle: {
    alignItems: "flex-start",

    paddingBottom: 125,
    paddingHorizontal: 8,
  },
  centerText: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  centerLoader: { alignItems: "center", justifyContent: "center" },
  loader: {
    width: screenWidth,
    height: 70,
    borderStartColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
