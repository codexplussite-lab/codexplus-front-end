import { defineType } from "sanity";

export default defineType({
  name: "mediaAsset",
  title: "Media",
  type: "object",
  fields: [
    {
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      description: "Upload an image to use as the background.",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.mediaType === "video",
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "External video URL (e.g. a hosted .mp4).",
      hidden: ({ parent }) => parent?.mediaType === "image",
    },
    {
      name: "videoFile",
      title: "Video File",
      type: "file",
      description: "Upload a video file (MP4 / WebM).",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.mediaType === "image",
    },
  ],
  preview: {
    select: {
      mediaType: "mediaType",
      image: "image",
      videoUrl: "videoUrl",
      videoFile: "videoFile",
    },
    prepare({ mediaType, image, videoUrl, videoFile }) {
      return {
        title: mediaType === "video" ? "Video" : "Image",
        media: image,
        subtitle:
          mediaType === "video"
            ? videoUrl || (videoFile ? "Uploaded video file" : "No video set")
            : image ? "Image uploaded" : "No image set",
      };
    },
  },
});