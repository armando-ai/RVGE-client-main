import React, { useState } from "react";
import { Navigation } from "src/components";
import TradeCard from "src/features/TradeCard";
import { getToken, request } from "src/utils";

const rtrades = () => {
  const [offers, setOffers] = useState<any>();
  function deleteTrade(game: any) {
    document.getElementById(game)?.remove();
    //send del request for this game here
  }
  const getOffers = async () => {
    await getToken();

    const response: any = await request("/offers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);

    setOffers(response.data);
  };
  const [id, setid] = useState("");
  if (offers === undefined) {
    getOffers();
  }
  return (
    <>
      {offers !== undefined && (
        <div className="bg-white ">
          <Navigation></Navigation>
          <div className="content h-full overflow-hidden bg-white">
            <h1 className="fixed top-7 w-[70%] border-b-2 border-slate-300 pb-3  text-center text-2xl">
              Received Trades
            </h1>
            <div className="relative top-[15%] h-[90%] w-full bg-white">
              {offers.map((offer: any) => (
                <div key={offer.offerId}>
                  {offer.trades.map((trade: any) => (
                    <TradeCard
                      deleteTrade={deleteTrade}
                      offer={offer.games}
                      out={false}
                      
                      user={trade.user}
                      offerId={offer.id}
                      tradeId={trade.id}
                      trade={trade.games}
                    ></TradeCard>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default rtrades;
