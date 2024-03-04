"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicId = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const getPublicId = (imageurl) => {
    const imageSplit = imageurl.split("/");
    const publicId = imageSplit[imageSplit.length - 1].split(".")[0];
    return publicId;
};
exports.getPublicId = getPublicId;
// export const getVideoId = (url: any) => {
//   const videoSplit = url.split("/");
//   const videoId = videoSplit[4];
//   return videoId;
// };
