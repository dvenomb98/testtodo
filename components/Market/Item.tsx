import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { bgLight, pinkGradientButtonSecondary } from "../Styles/CustomStyles";
import { Boosters, Items } from "../Utils/types";

interface ItemProps {
  item?: Items;
  booster?: Boosters;
  buySingleItem?: (item: Items | Boosters) => void
  loading?: boolean
  hideButton?: boolean
}

const Item: React.FC<ItemProps> = ({ item, booster, buySingleItem, loading , hideButton}) => {

  const { userData } = UserAuth()

  if (item && !booster) {

    const alreadyBought = userData?.items?.some((it: Items) => it.name === item.name)

    return (
      <div
        className={`${bgLight} flex flex-col items-center rounded-md shadow-md md:flex-row md:max-w-xl`}
      >
        <img
          className="object-cover w-full h-full rounded-t-lg md:w-1/2 md:rounded-none md:rounded-l-md"
          src={item.img}
          alt={item.name}
        />
        <div className="flex flex-col justify-between gap-3 p-4 leading-normal">
          <h5 className="text-2xl font-bold tracking-tight ">{item.name}</h5>
          <p className="font-normal">{item.description}</p>
          {!hideButton && 
          <button disabled={alreadyBought || loading} onClick={() => buySingleItem && buySingleItem(item)} className={`${pinkGradientButtonSecondary}`}>
            {alreadyBought ? "Owned" : `${item.price} Coins` }
          </button>
          }
        </div>
      </div>
    );
  }
  if (booster && !item) {

    const alreadyBought = userData?.boosters?.some((boost: Boosters) => boost.name === booster.name)

    return (
      <div
        className={`${bgLight} flex flex-col items-center rounded-md shadow-md md:flex-row md:max-w-xl `}
      >
        <img
          className="object-cover w-full h-full rounded-t-lg md:w-1/2 md:rounded-none md:rounded-l-md"
          src={booster.img}
          alt={booster.name}
        />
        <div className="flex flex-col justify-between gap-3 p-4 leading-normal">
          <h5 className="text-2xl font-bold tracking-tight ">{booster.name}</h5>
          <p className="font-normal">{booster.description}</p>
          {!hideButton && 
          <button disabled={alreadyBought || loading} onClick={() => buySingleItem && buySingleItem(booster)} className={`${pinkGradientButtonSecondary}`}>
          {alreadyBought ? "Owned" :`${booster.price} Coins`}
          </button>
          }
        </div>
      </div>
    );
  } else {
    return null
  }
};

export default Item;
