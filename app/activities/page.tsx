'use client'
import { db } from "../../firebaseClient";
import { collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import PageShell from "@/components/PageShell";
// import { postPlayer } from "@/components/util/makePlayer";

export default function Activities() {
    const [uid, setUid] = useState<string>("");
    return (
        <PageShell uid={uid} setUid={(newUid) => setUid(newUid)}>
            <Home />
        </PageShell>
    )
}

// can also use #C895F8 as color
const Home = () => {
    return (
        <div>
            <div className="bg-emerald-700 flex flex-col items-center justify-center w-full h-[150px] lg:h-[200px]">
                <div className="text-left w-full px-10 lg:px-[150px]">
                    <h1 className="lg:text-6xl text-4xl text-white">Activities</h1>
                </div>
            </div>
            <div className="lg:flex lg:gap-10">
                <div className="px-10 py-10 lg:px-20 lg:py-20 space-y-6 lg:w-1/2 w-full flex flex-col justify-center">
                    <h1 className="transition-all duration-300 lg:text-4xl text-4xl font-bold">CAILAB Activities</h1>
                    <div className="transition-all duration-300 w-full lg:text-2xl text-lg">Check in to this page to see our ongoing activities!</div>
                </div>

                <div className="transition-all duration-300 scale-0 lg:scale-100 transform-scale-y-[-1]">
                    <div className="px-10 py-2"></div>

                    <img src="/assets/wave.png" width={"800px"}
                        height={"800px"} />
                </div>
            </div>
        </div>
    )
}
