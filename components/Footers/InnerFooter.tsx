import { link } from "fs";
import React from "react";
import Layout from "../Layout/Layout";
import { gradientBgUp, gradientText} from "../Styles/CustomStyles";


const linkClasses = "hover:underline underline-offset-2 text-secondary-blue  cursor-pointer"
const InnerFooter = () => {

  return (
    <footer className={`bg-slate-200 dark:bg-slate-800`}>
      <Layout >
        <div className="flex flex-col">
          <h1
            className={`${gradientText} font-headFamily text-h2 font-semibold mb-4`}
          >
            REAL LIFE MMORPG
          </h1>
          <ul className="grid grid-cols-2 items-center gap-2">
            <li className={linkClasses}>Dashboard</li>
            <li className={linkClasses}>Market place</li>
            <li className={linkClasses}>Leaderboard</li>
            <li className={linkClasses}>Report bug</li>
            <a href="https://www.markdownguide.org/basic-syntax/" target="_blank"><li className={linkClasses}>Learn markdown</li></a>
            <li className={linkClasses}>Contact us</li>
            
          </ul>
          <p className="mt-8 text-primary-gray">@ Daniel Bílek 2022</p>
        </div>
      </Layout>
    </footer>
  );
};

export default InnerFooter;
