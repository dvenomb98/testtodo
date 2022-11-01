import React from "react";
import Layout from "../Layout/Layout";
import {
  bgDark,
  bgLight,
  bgLightSecondary,
  bgLightSecondary2,
} from "../Styles/CustomStyles";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Faq = () => {
  const faqValues = [
    {
      question: "Is it free?",
      answer:
        "Yes! Our product is currently in beta version and is absolutely free to use!",
    },
    {
      question: "How does it work?",
      answer:
        "You can create tasks, with different difficulty. After task completion you will get reward (experiences and coins), which amount is based on current difficulty of tasks. After you get enough experiences, your character will level up and possibly get a new rank. With coins you can buy items at market place and upgrade your character.",
    },
    {
      question: "Are my data safe?",
      answer:
        "Yes. For storing data we are using Firebase by Google. Nobody can access your data and we dont store your passwords.",
    },
    {
      question: "Is there mobile application available?",
      answer:
        "No. If you want to use it like mobile application, you can simply save it to your desktop from browser.",
    },
  ];

  return (
    <div className={bgDark}>
      <Layout>
        <div className="flex flex-col gap-10 lg:w-2/3">
          <h2 className="text-h1 font-bold font-headFamily">
            Frequently asked questions
          </h2>
          <p className="text-primary-gray">
            Do you have some questions about our product?
          </p>
          <div className="flex flex-col gap-2">
            {faqValues?.map(({ answer, question }) => (
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`${bgLightSecondary} p-4 rounded-md text-left flex items-center justify-between `}
                    >
                      <span>{question}</span>
                      <ChevronDownIcon
                        className={`${open && "rotate-180 transform"} h-5 w-5`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className={`text-primary-gray p-2`}>
                      {answer}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Faq;
