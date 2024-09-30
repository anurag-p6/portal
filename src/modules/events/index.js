import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import heroImg from "@/assets/EveHero.png";
import Cards from "../../components/cards";
import Heading from "@/components/ui/heading";
import { AddEvent } from './event/addEvent'
import { fetchAllEvents, participate } from "@/utils/events";
import { useSelector } from "react-redux";
import AuthenticationAlert from "@/components/authentication-alert";

export default function EventHome() {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    if (loading && user?.authenticated) {
      fetchAllEvents(setCardData, setLoading);
    }
  }, [loading, user]);
  return (
    <>
      {
        user?.authenticated ?
          (
            <>
              <section className=" bg-contain pt-5 md:py-10">
                <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
                  <div className="flex flex-col justify-center gap-8">
                    <h1 className="font-bold text-6xl">
                      Host, Connect, Celebrate: Your Events, Our Platform!
                    </h1>
                    <p className="text-lg md:text-xl">
                      Unlock unforgettable moments with our platform, where booking and
                      learning about exclusive events is just a click away.
                    </p>
                    <div className="flex gap-4 items-center justify-between">
                      <AddEvent />
                    </div>
                  </div>

                  <Image
                    src={heroImg}
                    alt="hero"
                    width={1000}
                    height={1000}
                    className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
                  />
                </div>
              </section>

              <section
                id="events"
                className="wrapper my-8 flex flex-col gap-8 md:gap-12">
                <div className="grid items-center justify-center">
                  <Heading heading={"Explore Events"} />
                  <div className="pt-16 center">
                    <Cards
                      cardData={cardData}
                      btnText={"Participate"}
                      type={"events"}
                      loading={loading}
                      functionToBeExecuted={participate}
                    />
                  </div>
                </div>
              </section>
            </>
          )
          :
          (
            <AuthenticationAlert />
          )
      }
    </>
  );
}