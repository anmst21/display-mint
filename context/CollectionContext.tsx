import createDataContext from "./createDataContext";
import api from "./api";
import { SortingState } from "@/components/explore/types";
import { formatFeed } from "./actions";

const collectionReducer = (state: any, action: any) => {
  switch (action.type) {
    case "IS_LOADING_ITEM":
      return { ...state, isLoadingItem: action.payload };
    case "IS_ERROR":
      return { ...state, isError: action.payload };
    case "GET_NFT_ITEM":
      return { ...state, nftItem: action.payload };
    case "CLEAR_NFT_ITEM":
      return { ...state, nftItem: action.payload };
    case "COLLECTION_MINT_OPEN":
      return { ...state, isCollectionMintOpen: action.payload };
    case "SET_IS_COLLECTION_HUD_OPEN":
      return { ...state, isCollectionHudOpen: action.payload };

    default:
      return state;
  }
};

const defaultState = {
  isCollectionHudOpen: true,
  isError: false,
  isLoadingItem: false,
  nftItem: null,
  isCollectionMintOpen: false,
};

const getNftItem = (dispatch: any) => {
  return async (postId: string, collectionAddress: string) => {
    try {
      dispatch({ type: "IS_LOADING_ITEM", payload: true });
      dispatch({ type: "IS_ERROR", payload: false });
      const { data } = await api.get("/rodeo/post", {
        params: {
          collectionAddress,
          tokenId: postId,
        },
      });
      const post = data.post;
      console.log("pppppp", post);
      const formatPost = await formatFeed(post);

      dispatch({ type: "GET_NFT_ITEM", payload: formatPost });
      dispatch({ type: "IS_LOADING_ITEM", payload: false });
    } catch (err: any) {
      dispatch({ type: "IS_ERROR", payload: true });
    }
  };
};

const setIsCollectionHudOpen = (dispatch: any) => {
  return (isOpen: boolean) => {
    dispatch({ type: "SET_IS_COLLECTION_HUD_OPEN", payload: isOpen });
  };
};
const clearNftItem = (dispatch: any) => {
  return () => {
    dispatch({ type: "CLEAR_NFT_ITEM", payload: null });
  };
};
const setIsCollectionMintOpen = (dispatch: any) => {
  return (isOpen: boolean) => {
    dispatch({ type: "COLLECTION_MINT_OPEN", payload: isOpen });
  };
};

export const { Context: CollectionContext, Provider: CollectionProvider } =
  createDataContext(
    collectionReducer,
    {
      setIsCollectionHudOpen,
      getNftItem,
      clearNftItem,
      setIsCollectionMintOpen,
    },
    defaultState
  );
