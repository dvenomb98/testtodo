import { Switch } from "@headlessui/react";
import {
	CheckCircleIcon,
	ChevronLeftIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";
import { doc, runTransaction } from "firebase/firestore";
import { NextPage } from "next";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InnerFooter from "../components/Footers/InnerFooter";
import Navbar from "../components/Header/Navbar";
import SubNavbar from "../components/Header/SubNavbar";
import Layout from "../components/Layout/Layout";
import Item from "../components/Market/Item";
import Modal from "../components/Modal/Modal";
import { useModalContext } from "../components/Modal/ModalContext";
import { bgDark, iconClassesSubNav } from "../components/Styles/CustomStyles";
import { ModalType } from "../components/Utils/enums";
import { Boosters, Items } from "../components/Utils/types";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";

export const itemsContainer = "flex flex-col gap-10 lg:grid lg:grid-cols-2";
export const headerClass = "text-h2 pb-5 border-b border-primary-gray";
export const boxClasses = "flex flex-col gap-5";

const Marketplace: NextPage = () => {
	const { userData, market, user, getUserData } = UserAuth();
	const [showInventory, setShowInventory] = useState<boolean>(false);
	const [newError, setNewError] = useState("");
	const { openMarketModal, showMarketModal, hideAllModals } = useModalContext();
	const router = useRouter();
	const { theme } = useTheme();
	const [loading, setLoading] = useState<boolean>(false);

	const { items, boosters } = market;

	const pushToDashboard = () => {
		router.push("/main");
	};

	const titles = [
		{
			title: "Dashboard",
			func: pushToDashboard,
			icon: <ChevronLeftIcon className={iconClassesSubNav} />,
		},
	];

	// TODO: REWORK ITEM COMPONENT AND DO ONE FUNCTION FOR BOTH BUYITEM X BUYBOOSTER

	const buySingleItem = async (item: Items | Boosters) => {
		try {
			setNewError("");
			setLoading(true);
			await runTransaction(db, async (transaction) => {
				const ref = doc(db, "users", user.uid);
				const sfDoc = await transaction.get(ref);

				if (!sfDoc.exists()) {
					setNewError(
						"There was problem during transaction, please try it again."
					);
					setLoading(false);
					showMarketModal();
					return;
				} else if (userData.coins < item.price) {
					setNewError("You do not have enough coins to complete transaction.");
					setLoading(false);
					showMarketModal();
					return;
				} else if (item.isBooster) {
					const newCoins = sfDoc.data().coins - item.price;
					const newBooster = [item, ...sfDoc.data().boosters];
					transaction.update(ref, { boosters: newBooster, coins: newCoins });
				} else if (!item.isBooster) {
					const newCoins = sfDoc.data().coins - item.price;
					const newItem = [item, ...sfDoc.data().items];
					transaction.update(ref, { items: newItem, coins: newCoins });
				}
			});
			await getUserData();
			setLoading(false);
			showMarketModal();
			return;
		} catch (e) {
			setNewError(
				"There was problem during transaction. Please, try it again later"
			);
			setLoading(false);
			showMarketModal();
		}
	};

	return (
		userData && (
			<>
				<Navbar userData={userData} />
				<SubNavbar titles={titles} />

				<div className={`${bgDark}`}>
					<Layout>
						<div className="flex flex-col gap-10 min-h-screen">
							<div className="flex flex-col gap-5 md:flex-row md:justify-between">
								<h2 className="text-h1 uppercase font-headFamily">
									Market place
								</h2>
								<div className="flex gap-5 items-center justify-between md:justify-start ">
									<p
										onClick={() => setShowInventory(!showInventory)}
										className="cursor-pointer text-h3 text-black dark:text-primary-gray"
									>
										Show inventory
									</p>
									<Switch
										checked={showInventory}
										onChange={() => setShowInventory(!showInventory)}
										className={`${
											theme === "dark" ? "bg-slate-700" : "bg-gray-200"
										} relative inline-flex h-10 w-20 items-center rounded-full`}
									>
										<span className="sr-only">Show inventory</span>
										<span
											className={`${
												showInventory
													? "translate-x-11 bg-secondary-blue"
													: "translate-x-1"
											} inline-block h-8 w-8 transform rounded-full bg-white transition`}
										/>
									</Switch>
								</div>
							</div>
							{showInventory ? (
								<>
									{userData.boosters?.length ? (
										<div className={boxClasses}>
											<p className={headerClass}>Boosters</p>
											<div className={itemsContainer}>
												{userData.boosters?.map(
													(item: Boosters, index: number) => (
														<Item booster={item} key={index} hideButton />
													)
												)}
											</div>
										</div>
									) : null}
									{userData.items?.length ? (
										<div className={boxClasses}>
											<p className={headerClass}>Items</p>
											<div className={itemsContainer}>
												{userData.items?.map((item: Items, index: number) => (
													<Item item={item} key={index} hideButton />
												))}
											</div>
										</div>
									) : null}
									{!userData?.boosters?.length && !userData?.items?.length && (
										<p>
											You dont have any items avaible. You can buy them at
											market place.
										</p>
									)}
								</>
							) : (
								<>
									{boosters?.length ? (
										<div className={boxClasses}>
											<p className={headerClass}>Boosters</p>
											<div className={itemsContainer}>
												{boosters?.map((item: Boosters, index: number) => (
													<Item
														booster={item}
														key={index}
														buySingleItem={buySingleItem}
														loading={loading}
													/>
												))}
											</div>
										</div>
									) : null}
									{items?.length ? (
										<div className={boxClasses}>
											<p className={headerClass}>Items</p>
											<div className={itemsContainer}>
												{items?.map((item: Items, index: number) => (
													<Item
														item={item}
														key={index}
														buySingleItem={buySingleItem}
														loading={loading}
													/>
												))}
											</div>
										</div>
									) : null}
								</>
							)}
						</div>
					</Layout>
				</div>
				<InnerFooter />
				<Modal
					openModal={openMarketModal}
					onModalEnter={() => undefined}
					modalType={newError ? ModalType.Error : ModalType.Success}
				>
					<div className="p-5">
						{newError ? (
							<div className="text-white flex gap-3 items-center">
								<XCircleIcon className="w-8 h-8" />
								<p>
									{newError}{" "}
									<span
										onClick={hideAllModals}
										className="cursor-pointer font-bold underline underline-offset-2"
									>
										Close the modal.
									</span>
								</p>
							</div>
						) : (
							<div className="text-white flex gap-3 items-center">
								<CheckCircleIcon className="w-8 h-8" />
								<p>
									Transaction was completed!{" "}
									<span
										onClick={hideAllModals}
										className="cursor-pointer font-bold underline underline-offset-2"
									>
										Close the modal.
									</span>
								</p>
							</div>
						)}
					</div>
				</Modal>
			</>
		)
	);
};

export default Marketplace;
