/* eslint-disable @typescript-eslint/no-explicit-any */
export const getPublicId = (imageurl: string) => {
  const imageSplit = imageurl.split("/");
  const publicId = imageSplit[imageSplit.length - 1].split(".")[0];
  return publicId;
};

// export const getVideoId = (url: any) => {
//   const videoSplit = url.split("/");
//   const videoId = videoSplit[4];

//   return videoId;
// };
