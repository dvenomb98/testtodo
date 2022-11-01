import React from "react";
import Layout from "../Layout/Layout";

import { useModalContext } from "../Modal/ModalContext";
import { gradientBgDown, pinkGradientButton } from "../Styles/CustomStyles";
import Login from "../User/Login";

const Header = () => {
  const { showLoginModal } = useModalContext();

  return (
    <div className={` ${gradientBgDown}`}>
      <Layout>
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-headline font-headFamily w-[20rem] md:text-7xl md:w-[35rem]">
                Yours <span className="font-bold">TODO</span> app with{" "}
                <span className="font-bold">MMORPG</span> experience
              </h1>

              <button
                onClick={showLoginModal}
                className={` ${pinkGradientButton} mt-10`}
              >
                Start now
              </button>
            </div>
            <img src={"/mac.png"} className="w-1/2 h-full hidden lg:block overflow-hidden" />
          </div>
        </>
      </Layout>

      <Login />
    </div>
  );
};

export default Header;
