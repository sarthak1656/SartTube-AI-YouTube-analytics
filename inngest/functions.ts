import { db } from "@/configs/db";
import { inngest } from "./client";
import ImageKit from "imagekit";
import OpenAI from "openai";
import Replicate from "replicate";
import { AiThumbnailTable } from "@/configs/schema";
import moment from "moment";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export const GenerateThumbnail = inngest.createFunction(
  { id: "ai/generate-thumbnail" },
  { event: "ai/generate-thumbnail" },
  async ({ event, step }) => {
    const { userInput, refImage, faceImage, userEmail } = await event.data;
    //Upload image to cloud / ImageKit
    const uploadImageUrls = await step.run("UploadImage", async () => {
      if (refImage != null) {
        const refImageUrl = await imageKit.upload({
          file: refImage?.buffer,
          fileName: refImage.name,
          isPublished: true,
          useUniqueFileName: false,
        });
        // const faceImageUrl = await imageKit.upload({
        //   file: faceImage?.buffer,
        //   fileName: faceImage.name,
        //   isPublished: true,
        //   useUniqueFileName: false,
        // });

        // return {
        //   refImageUrl: refImageUrl.url,
        //   faceImageUrl: faceImageUrl.url,
        // };
        return refImageUrl.url;
      } else {
        return null;
      }
    });
    //Generate Ai prompt from Ai model

    const generateThumbnailPrompt = await step.run(
      "generateThumbnailPrompt",
      async () => {
        const response = await openai.chat.completions.create({
          model: "anthropic/claude-3-haiku", // Best free model for prompts
          max_tokens: 300, // Claude can handle more tokens efficiently
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: uploadImageUrls
                    ? `Create a detailed YouTube thumbnail prompt based on this reference image and the user's video description: "${userInput}". The prompt should include specific details about colors, text, layout, and visual elements. Make it detailed and specific to the user's content.`
                    : `Create a detailed YouTube thumbnail prompt for this video description: "${userInput}". Include specific details about colors, text, layout, visual elements, and composition that would make an eye-catching thumbnail.`,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: uploadImageUrls || "",
                  },
                },
              ],
            },
          ],
        });
        console.log(response.choices[0].message.content);
        return response.choices[0].message.content;
      }
    );

    //Generate Ai image

    const generateThumbnailImage = await step.run(
      "Generate Image",
      async () => {
        const input = {
          prompt: generateThumbnailPrompt,
          aspect_ratio: "16:9",
          output_format: "png",
          safety_filter_level: "block_only_high",
        };
        const output = await replicate.run("google/imagen-4-fast", { input });
        //@ts-ignore
        return output.url();
      }
    );

    //save Image to cloud

    const uploadThumbnail = await step.run("Upload Thumbnail", async () => {
      const imageRef = await imageKit.upload({
        file: generateThumbnailImage,
        fileName: Date.now() + ".png",
        isPublished: true,
        useUniqueFileName: false,
      });
      return imageRef.url;
    });

    //save record to database

    const saveToDB = await step.run("Save to DB", async () => {
      const result = await db.insert(AiThumbnailTable).values({
        userInput: userInput,
        thumbnailUrl: uploadThumbnail,
        refImageUrl: uploadImageUrls,
        faceImageUrl: faceImage,
        userEmail: userEmail,
        createdAt: moment().toDate(),
        //@ts-ignore
      }).returning(AiThumbnailTable);
      return result;
    });

    return saveToDB;
  }
);
