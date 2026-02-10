import createDataContext from "./createDataContext";
import api from "./api";
import { SortingState } from "@/components/explore/types";
import { formatFeed } from "./actions";
import { act } from "react-test-renderer";

const exploreReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_HUD_OPEN":
      return { ...state, isHudOpen: action.payload };
    case "SET_MINT_OPEN":
      return { ...state, isMintOpen: action.payload };
    case "SET_ACTIVE_NFT":
      return { ...state, activeNft: action.payload };
    case "SET_SORTING_STATE":
      return { ...state, exploreFeedState: action.payload };
    case "SET_IS_WALLET_OPEN":
      return { ...state, isWalletOpen: action.payload };
    case "SET_LOADING_EXPLORE_FEED":
      return { ...state, isLoadingExplore: action.payload };
    case "SET_LOADING_MORE_EXPLORE_FEED":
      return { ...state, isLoadingMoreExplore: action.payload };
    case "GET_EXPLORE_FEED":
      return {
        ...state,
        exploreFeed: [...state.exploreFeed, ...action.payload],
      };
    case "CLEAR_EXPLORE_FEED":
      return {
        ...state,
        exploreFeed: [],
      };
    default:
      return state;
  }
};

const defaultState = {
  isMintOpen: false,
  isHudOpen: true,
  isWalletOpen: false,
  activeNft: null,
  exploreFeedState: SortingState.explore,
  exploreFeed: [],
  isLoadingExplore: false,
  isLoadingMoreExplore: false,
};

const getExploreFeed = (dispatch: any) => {
  return async (
    limit: number,
    offset: number,
    type: "history" | "mints" | "explore",
    refresh: boolean
  ) => {
    if (refresh) {
      dispatch({ type: "CLEAR_EXPLORE_FEED", payload: null });
    }
    if (offset === 0) {
      dispatch({ type: "SET_LOADING_EXPLORE_FEED", payload: true });
    } else {
      dispatch({ type: "SET_LOADING_MORE_EXPLORE_FEED", payload: true });
    }

    let data;

    if (type === "history") {
      const response = await api.get("/rodeo/feed/history", {
        params: {
          Limit: limit,
          Offset: offset,
        },
      });
      const { count: length, views: history } = response.data;
      data = history;
    } else if (type === "mints") {
      const response = await api.get("/rodeo/feed/mints", {
        params: {
          Limit: limit,
          Offset: offset,
        },
      });
      const { count: length, mints: history } = response.data;
      data = history;
    }

    const keysPosts = await Promise.all(
      data.map((post: any) => formatFeed(post.post))
    );

    dispatch({ type: "GET_EXPLORE_FEED", payload: keysPosts });
    if (offset === 0) {
      dispatch({ type: "SET_LOADING_EXPLORE_FEED", payload: false });
    } else {
      dispatch({ type: "SET_LOADING_MORE_EXPLORE_FEED", payload: false });
    }
  };
};

const setIsWalletOpen = (dispatch: any) => {
  return (newIndex: boolean) => {
    dispatch({ type: "SET_IS_WALLET_OPEN", payload: newIndex });
  };
};
const setExploreFeedState = (dispatch: any) => {
  return (newIndex: SortingState) => {
    dispatch({ type: "CLEAR_EXPLORE_FEED", payload: null });

    dispatch({ type: "SET_SORTING_STATE", payload: newIndex });
  };
};

const setIsMintOpen = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_MINT_OPEN", payload: newIndex });
  };
};
const setIsHudOpen = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_HUD_OPEN", payload: newIndex });
  };
};
const setActiveNft = (dispatch: any) => {
  return (newIndex: any) => {
    dispatch({ type: "SET_ACTIVE_NFT", payload: newIndex });
  };
};

export const { Context: ExploreContext, Provider: ExploreProvider } =
  createDataContext(
    exploreReducer,
    {
      setIsHudOpen,
      setActiveNft,
      setIsMintOpen,
      setExploreFeedState,
      setIsWalletOpen,
      getExploreFeed,
    },
    defaultState
  );
