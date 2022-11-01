import { ChartBarIcon, CheckIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Layout from '../Layout/Layout'
import { bgDark, bgLightSecondary } from '../Styles/CustomStyles'

const Pricing = () => {

    const pricingList = ["Unlimited access", "Task managment", "Email support", "Custom character"]


  return (
    <div className={bgDark}>
        <Layout>
            <div className="flex flex-col gap-10">
                <h2 className="text-h1 font-bold font-headFamily">Our pricing plans</h2>
                <p className="text-primary-gray">We are currently in beta version, fixing all bugs and developing new features. All features are 100% free and you can use our application without any charges.</p>
                <div className={`${bgLightSecondary}  shadow-xl dark:shadow-slate-800/50 flex flex-col gap-5 p-10 rounded-md border-[0.25px] dark:border-slate-700 max-w-[600px] `}>
                    <div className="flex gap-2">
                    <ChartBarIcon className="w-5 h-5 text-primary-amber" />
                    <p>Beta version</p>
                    </div>
                    <p className="text-primary-gray">All features are available without any charges.</p>
                    <h2 className="font-bold text-h1">Free</h2>

                    {pricingList.map(item => (
                        <div key={item} className="flex gap-2 items-center">
                        <CheckIcon className="w-5 h-5 text-blue-500" />
                        <p>{item}</p>

                        </div>
                    ))}


                </div>


            </div>
        </Layout>
    </div>
  )
}

export default Pricing