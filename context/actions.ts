import api from "./api";
import { getColors } from "react-native-image-colors";

export enum ActionType {
  Skip = 13,
  MintModalOpen = 14,
  MintModalClose = 15,
  MintSuccess = 16,
  OpenPostDetails = 20,
  ClosePostDetails = 21,
}

export const recordAction = async ({
  postId,
  actionType,
}: {
  postId: string;
  actionType: ActionType;
}) => {
  try {
    //console.log("Action type", actionType);
    const { data } = await api.post("/action/declare", {
      actionTypeId: actionType,
      data: JSON.stringify({
        postId,
      }),
    });
    // console.log("data output", data);

    return data;
    //  console.warn(`Action ${actionType} on post ${postId}`, data);
  } catch (err: any) {
    console.log("Error", err.message);
  }
};

export const actionComment = async ({
  postId,
  message,
}: {
  postId: string;
  message: string;
}) => {
  try {
    const { data } = await api.post("/action/comment", {
      postId,
      message,
    });
    //    console.log("comment output", data);
  } catch (err: any) {
    console.log("error leaving a comment", err.message);
  }
};

export const actionView = async ({ postId }: { postId: string }) => {
  try {
    const { data } = await api.post("/action/view", {
      postId,
    });
    //  console.log("post view reorded", data);
  } catch (err: any) {
    console.log("error viewing post", err.message);
  }
};
export const getPostComments = async ({ postId }: { postId: string }) => {
  try {
    const { data } = await api.get("/comments/post", {
      params: {
        postId,
      },
    });
    //    console.log("fetched post comments", data.comments);
    return data.comments;
  } catch (err: any) {
    console.log("error gettings post comments", err.message);
  }
};

export const getIpfsUri = (uri: string) => {
  const hash = uri.split("ipfs://")[1];
  const gateway = "https://hellcat.nyc3.cdn.digitaloceanspaces.com";
  // const hash = uri.split("ipfs://")[1];
  const fullUriLg = `${gateway}/${hash}_Lg.webp`;
  const fullUriMd = `${gateway}/${hash}_Md.webp`;
  const fullUriSm = `${gateway}/${hash}_Sm.webp`;
  const fullUriXs = `${gateway}/${hash}_Xs.webp`;
  return {
    fullUriLg,
    fullUriMd,
    fullUriSm,
    fullUriXs,
  };
};

export const formatFeed = async (post: any) => {
  const uris = getIpfsUri(post.image.ipfsCid);

  let colorObject: any;
  try {
    colorObject = await getColors(uris.fullUriSm, {
      fallback: "#3D3743",
    });
  } catch (err) {
    colorObject = {
      background: "#121621",
      primary: "#1E222C",
    };
  }
  const backgroundColor = colorObject?.background;
  const primaryColor = colorObject?.primary;
  if (!backgroundColor || !primaryColor) {
    return;
  }
  return {
    backgroundColor,
    primaryColor,
    id: post.id,
    collectionId: post.collection.id,
    uri: uris.fullUriLg,
    ...uris,
    blurhash: post.image.blurhash,
    creator: post.collection.creatorAddress || null,
    mintEndDatetime: post.mintEndDatetime,
    name: post.image.name,
    category: post.image.category,
    contractAddress: post.collection.contractAddress,
    tokenId: post.collection.tokenId,
    chain: "Base",
    collection: post.collection.contractAddress || "Num",
    tokenStandard: "ERC-1155",
    commentsCount: 0,
    mintsCount: post.mints.total,
    comments: [],
    cursor: post.id,
    //  imageHeight: height,
    width: post.image.width,
    height: post.image.height,
    imageAspectRatio: post.image.width / post.image.height,
    isSeen: post.viewed || post.viewedAt,
    farcasterIdentity: post.collection.farcasterIdentity,
    mimeType: post.image.mimeType,
  };
};
