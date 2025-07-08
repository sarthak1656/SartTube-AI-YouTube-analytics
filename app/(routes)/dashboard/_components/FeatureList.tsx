import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeatureList = () => {
  const Features = [
    {
      id: 1,
      title: "AI Thumbnail Generator",
      image: "/feature1.png",
      path: "/ai-thumbnail-generator",
    },
    {
      id: 2,
      title: "AI Thumbnail Search",
      image: "/feature2.png",
      path: "#",
    },
    {
      id: 3,
      title: "Content Generator",
      image: "/feature4.png",
      path: "#",
    },
    {
      id: 4,
      title: "Outlier",
      image: "/feature3.png",
      path: "#",
    },
    {
      id: 5,
      title: "Content Generator",
      image: "/feature5.png",
      path: "#",
    },
    {
      id: 6,
      title: "Optimize video",
      image: "/feature6.png",
      path: "#",
    },
  ];

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl ">AI Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Features.map((feature, index) => (
          <Link href={feature.path} key={index}>
            <Image
              src={feature.image}
              alt={feature.title}
              width={200}
              height={200}
              className="w-full  object-cover aspect-video rounded-lg hover:scale-105 transition-all cursor-pointer"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeatureList;
