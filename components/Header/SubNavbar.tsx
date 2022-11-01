import React from "react";
import Layout from "../Layout/Layout";

import { bgDark, bgLightSecondary} from "../Styles/CustomStyles";

interface SubNavbarProps {
  titles: any;
}

const SubNavbar: React.FC<SubNavbarProps> = ({ titles }) => {
  return (
    <div className={`${bgDark}`}>
      <Layout customStyles="py-5">
        
        
        <div className="flex flex-col gap-5 md:flex-row">
          {titles?.map((item: any, index: number) => (
            <div key={index}  onClick={item.func} className={`flex gap-2 items-center hover:text-primary-amber ${bgLightSecondary} ease-in-out p-4 rounded-md cursor-pointer w-[200px]`}>
              {item.icon}
              <h2>
                {item.title}
              </h2>
            </div>
          ))}
        </div>
        
      </Layout>
    </div>
  );
};

export default SubNavbar;
