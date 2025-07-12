"use client";

import axios from "axios";
import { ArrowUp, ImagePlus, User, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const AiThumbnailGenerator = () => {
  const [userInput, setUserInput] = useState<string>();
  const [referenceImage, setReferenceImage] = useState<any>();
  const [faceImage, setFaceImage] = useState<any>();
  const [referenceImagePreview, setReferenceImagePreview] = useState<any>();
  const [faceImagePreview, setFaceImagePreview] = useState<any>();

  const HandleFileChange = (field: string, e: any) => {
    const SelectedFile = e.target.files[0];
    if (field === "referenceImage") {
      setReferenceImage(SelectedFile);
      setReferenceImagePreview(URL.createObjectURL(SelectedFile));
    } else if (field === "faceImage") {
      setFaceImage(SelectedFile);
      setFaceImagePreview(URL.createObjectURL(SelectedFile));
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();
    userInput && formData.append("userInput", userInput);
    referenceImage && formData.append("refImage", referenceImage);
    faceImage && formData.append("faceImage", faceImage);

    //Post Api Call
    const result = await axios.post("/api/generate-thumbnail", formData);
    console.log(result.data);
  };

  return (
    <div>
      <div className="px-10 md:px-20 lg:px-40">
        <div className="flex items-center justify-center mt-20 flex-col gap-2">
          <h2 className="text-3xl font-bold">AI Thumbnail Generator</h2>
          <p className="text-gray-600 mt-2 text-center ">
            Create stunning thumbnails for your videos using artificial
            intelligence. Upload your video or image and let our AI generate
            eye-catching thumbnails that will boost your click-through rates.
          </p>
        </div>

        <div className="flex gap-5 items-center p-3 border rounded-xl mt-10 bg-secondary">
          <textarea
            name=""
            id=""
            placeholder="Enter your video description here..."
            className="w-full outline-0 bg-transparent"
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
          <div
            className="p-3 bg-gradient-to-t from-red-600 to-orange-500 rounded-full cursor-pointer "
            onClick={onSubmit}
          >
            <ArrowUp />
          </div>
        </div>

        <div className="flex gap-5 mt-3">
          {/* Reference Image Upload and Preview */}
          <div className="w-full md:w-1/2">
            <label htmlFor="referenceImageUpload" className="w-full block">
              <div className="p-4 w-full border rounded-xl bg-secondary flex gap-3 justify-center hover:scale-105 transition-all duration-300 cursor-pointer">
                <ImagePlus />
                <h2 className="">Reference Image</h2>
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              id="referenceImageUpload"
              onChange={(e) => HandleFileChange("referenceImage", e)}
            />
            {referenceImagePreview && (
              <div className="relative w-full mt-4 rounded-xl overflow-hidden">
                <Image
                  src={referenceImagePreview}
                  alt="referenceImage"
                  width={400}
                  height={250}
                  className="w-full h-auto object-contain rounded-xl"
                />
                <X
                  className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 z-10"
                  size={28}
                  onClick={() => setReferenceImagePreview(null)}
                />
              </div>
            )}
          </div>

          {/* Face Image Upload and Preview */}
          <div className="w-full md:w-1/2">
            <label htmlFor="IncludeFace" className="w-full block">
              <div className="p-4 w-full border rounded-xl bg-secondary flex gap-3 justify-center hover:scale-105 transition-all duration-300 cursor-pointer">
                <User />
                <h2 className="">Include Face</h2>
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              id="IncludeFace"
              onChange={(e) => HandleFileChange("faceImage", e)}
            />
            {faceImagePreview && (
              <div className="relative w-full mt-4 rounded-xl overflow-hidden">
                <Image
                  src={faceImagePreview}
                  alt="faceImage"
                  width={400}
                  height={250}
                  className="w-full h-auto object-contain rounded-xl"
                />
                <X
                  className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 z-10"
                  size={28}
                  onClick={() => setFaceImagePreview(null)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiThumbnailGenerator;
