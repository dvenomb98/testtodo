import React, { useRef } from "react";
import {
  PlusCircleIcon,
  ArrowUpCircleIcon,
  WrenchScrewdriverIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Layout from "../Layout/Layout";
import { bgDark } from "../Styles/CustomStyles";

const iconClassNames = "w-12 h-12 z-40 text-white";

interface Features {
  name: string;
  icon: JSX.Element;
  bgImg: string;
  description: string;
}

const featuresList: Features[] = [
  {
    name: "Create task",
    icon: <PlusCircleIcon className={iconClassNames} />,
    bgImg: "bg-[url('/levelup.jpg')]",
    description: "Create task with choosen difficulty",
  },
  {
    name: "Get experiences",
    icon: <ArrowUpCircleIcon className={iconClassNames} />,
    bgImg: "bg-[url('/getexp.jpg')]",
    description: "When you complete task you receieve experience and coins",
  },
  {
    name: "Upgrade character",
    icon: <WrenchScrewdriverIcon className={iconClassNames} />,
    bgImg: "bg-[url('/up.jpg')]",
    description:
      "You can use your coins and experience to upgrade buy items at market place",
  },
];

const Features = () => {
  const ref = useRef<HTMLDivElement>(document.createElement("div"));

  const scroll = (scrollOffset: number) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div className={bgDark}>
      <Layout>
        <div className="flex flex-col gap-10">
          <h1 className="text-h1 font-bold font-headFamily">Features</h1>
          <p className="text-primary-gray">
            We offer lot of features that transform a boring todo-list to full
            unique experience.
          </p>
          <div
            ref={ref}
            className="flex flex-row gap-10 items-center overflow-scroll scrollbar-hide scroll-smooth"
          >
            {featuresList.map((feat, index) => (
              <div className="w-[400px] h-[400px] min-w-[400px] min-h-[400px] overflow-hidden border-[0.25px] border-slate-800 rounded-md">
                <div
                  key={index}
                  className={`${feat.bgImg} w-full h-full bg-cover hover:scale-105 transition duration-500  rounded-md p-5 flex flex-col items-center justify-center relative group`}
                >
                  <div className={iconClassNames}>{feat.icon}</div>
                  <h2 className="text-white text-h3  underline underline-offset-4 mt-2 z-40 ">
                    {feat.name}
                  </h2>
                  <p className="hidden group-hover:block px-5 text-center transform text-white z-40 mt-5">
                    {feat.description}
                  </p>
                  <div className="bg-slate-900 absolute z-30 inset-0 opacity-80 group-hover:opacity-60 transition duration-1000" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between 2xl:hidden">
            <ChevronLeftIcon
              onClick={() => scroll(-300)}
              className="w-10 h-10 pr-2 cursor-pointer text-primary-gray"
            />
            <ChevronRightIcon
              onClick={() => scroll(300)}
              className="w-10 h-10 pl-2 cursor-pointer text-primary-gray"
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Features;
