import React, { useState } from "react";
import { Navigation } from "src/components";
import TradeCard from "src/features/TradeCard";
import { getToken, request } from "src/utils";

const otrades = () => {
  const [offers, setOffers] = useState<any>();
  function deleteTrade(game: any) {
    document.getElementById(game)?.remove();
    //send del request for this game here
  }
  const getOffers = async () => {
    await getToken();

    const response: any = await request("/trades", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);

    setOffers(response.data);
  };
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
              Outgoing Trades
            </h1>
            <div className="relative top-[15%] h-full w-full bg-white">
              {offers.map(
                (offer: {
                  offerId: React.Key | null | undefined;
                  trades: any[];
                  games: any;
                  user: any;
                }) => (
                  <div key={offer.offerId}>
                    {offer.trades.map(
                      (trade: { id: any; games: any; user: any }) => (
                        <TradeCard
                          deleteTrade={deleteTrade}
                          offer={offer.games}
                          tradeId={trade.id}
                          trade={trade.games}
                          
                          user={offer.user}
                        ></TradeCard>
                      )
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default otrades;
