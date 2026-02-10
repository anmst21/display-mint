import createDataContext from "./createDataContext";
import api from "./api";
import { Image } from "expo-image";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { getColors } from "react-native-image-colors";
import { formatFeed } from "./actions";

const blogReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_MINTING_NAME":
      return {
        ...state,
        mintingStatus: {
          ...state.mintingStatus,
          name: action.payload,
        },
      };
    case "SET_MINTING_STATUS":
      return {
        ...state,
        mintingStatus: {
          ...state.mintingStatus,
          status: action.payload,
        },
      };

    case "GET_MORE_FEED":
      return { ...state, nftFeed: [...state.nftFeed, ...action.payload] };
    case "SET_ERROR_FEED":
      return { ...state, isErrorFeed: action.payload };
    case "SET_LOADING_FEED":
      return { ...state, isLoadingFeed: action.payload };
    case "GET_MINT_FEED":
      return { ...state, nftFeed: action.payload };
    case "SET_NFT":
      return { ...state, activeNft: action.payload };
    case "SET_MINT_OPEN":
      return { ...state, isMintOpen: action.payload };
    case "SET_WALLET_BALANCE":
      return { ...state, embeddedWalletBalance: action.payload };
    case "SET_CONNECTED_BALANCE":
      return { ...state, connectedWalletBalance: action.payload };
    case "SET_ENS_NAME":
      return { ...state, ensName: action.payload };
    case "SET_ENS_AVATAR":
      return { ...state, ensAvatar: action.payload };
    case "SET_DISCONNECT_OPEN":
      return { ...state, isDisconnectOpen: action.payload };
    case "SET_WALLET_OPEN":
      return { ...state, isWalletOpen: action.payload };
    case "SET_REPORT_OPEN":
      return { ...state, isReportOpen: action.payload };
    case "SET_LOADING_MORE_FEED":
      return { ...state, isLoadingMore: action.payload };
    case "SET_IMAGE_CONTEXT":
      return {
        ...state,
        activeNft: {
          ...state.activeNft,
          imageHeight: action.payload.height,
          imageWidth: action.payload.width,
          cacheUri: action.payload.cacheUri,
        },
      };
    default:
      return state;
  }
};

const defaultState = {
  isErrorFeed: false,
  isLoadingFeed: false,
  isLoadingMore: false,
  isReportOpen: false,
  isWalletOpen: false,
  isDisconnectOpen: false,
  ensName: null,
  ensAvatar: null,
  isMintOpen: false,
  isMinted: false,
  mintingStatus: {
    status: null,
    name: null,
  },
  connectedWalletBalance: null,
  embeddedWalletBalance: null,
  activeNft: 0,
  nftFeed: [],
};

const setReportOpen = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_REPORT_OPEN", payload: newIndex });
  };
};
const setImageContext = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_IMAGE_CONTEXT", payload: newIndex });
  };
};
const setIsWalletOpen = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_WALLET_OPEN", payload: newIndex });
  };
};
const setDisconnectOpen = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_DISCONNECT_OPEN", payload: newIndex });
  };
};
const setEnsName = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_ENS_NAME", payload: newIndex });
  };
};
const setEnsAvatar = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_ENS_AVATAR", payload: newIndex });
  };
};
const setMintingName = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_MINTING_NAME", payload: newIndex });
  };
};
const setMintingStatus = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_MINTING_STATUS", payload: newIndex });
  };
};

const setMintOpen = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_MINT_OPEN", payload: newIndex });
  };
};

const setActiveNft = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_NFT", payload: newIndex });
  };
};

const setEmbeddedWalletBalance = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_WALLET_BALANCE", payload: newIndex });
  };
};
const setConnectedWalletBalance = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_CONNECTED_BALANCE", payload: newIndex });
  };
};

const getNtfFeed = (dispatch: any) => {
  return async () => {
    try {
      dispatch({ type: "SET_LOADING_FEED", payload: true });
      dispatch({ type: "SET_ERROR_FEED", payload: false });
      const response = await api.get("/rodeo/feed/latest?limit=15");
      const posts = response.data.posts;
      const keysPosts = await Promise.all(
        posts.map((post: any) => formatFeed(post))
      );
      console.log("response", posts, keysPosts);

      dispatch({ type: "GET_MINT_FEED", payload: keysPosts });
      dispatch({ type: "SET_LOADING_FEED", payload: false });
    } catch (err: any) {
      dispatch({ type: "SET_LOADING_FEED", payload: false });
      dispatch({ type: "SET_ERROR_FEED", payload: err.response.status });
    }
  };
};
const getMoreFeed = (dispatch: any) => {
  return async (cursor: string) => {
    try {
      dispatch({ type: "SET_LOADING_MORE_FEED", payload: true });
      dispatch({ type: "SET_ERROR_FEED", payload: false });

      const response = await api.get(
        `/rodeo/feed/latest?limit=15&cursor=${cursor}`
      );
      const posts = response.data.posts;

      const keysPosts = await Promise.all(
        posts.map((post: any) => formatFeed(post))
      );
      dispatch({ type: "GET_MORE_FEED", payload: keysPosts });
      dispatch({ type: "SET_LOADING_MORE_FEED", payload: false });
    } catch (err: any) {
      console.error("EEEEEEEEEE", err.response.status);

      dispatch({ type: "SET_LOADING_MORE_FEED", payload: false });
      dispatch({ type: "SET_ERROR_FEED", payload: err.response.status });
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  {
    setActiveNft,
    setMintOpen,
    getNtfFeed,
    getMoreFeed,
    setEmbeddedWalletBalance,
    setConnectedWalletBalance,
    setMintingName,
    setMintingStatus,
    setEnsName,
    setEnsAvatar,
    setDisconnectOpen,
    setIsWalletOpen,
    setImageContext,
    setReportOpen,
  },
  defaultState
);
