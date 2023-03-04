import { useEffect, useRef, useState } from "react";
import { ClientCard } from "../client-card/ClientCard";
import { Card } from "../../types";

type Props = {
  className: string;
  data: Card[];
  selected: boolean;
  setSelected: CallableFunction;
};

export const ClientManager = ({
  className,
  data,
  selected,
  setSelected,
}: Props) => {
  const [cardSelected, setCardSelected] = useState<Card | null>(null);
  const [hide, setHide] = useState("hide--clients");
  const [changeHeight, setChangeHeight] = useState("");

  const show = "show--clients";

  const handleSelected = async (card: Card, event: any) => {
    setCardSelected({
      ...card,
    });
    setSelected((prev: boolean) => !prev);

    event.currentTarget.className += " selected--client";
    setTimeout(() => {
      setHide("hidden");
      setChangeHeight("height-animation");
    }, 500);
  };

  // const getSelectedCard = (card: Card) => {
  //   return selected ?
  // }

  return (
    <>
      <section className={`${className} h-[600px] bg-red-500 p-2`}>
        {data.map((card) => (
          <ClientCard
            onClick={(e: any) => handleSelected(card, e)}
            className={`${
              selected && JSON.stringify(cardSelected) !== JSON.stringify(card)
                ? hide
                : show
            }`}
            key={card.id}
            card={card}
          />
        ))}
      </section>
      <div className={`${selected ? "" : ""}`}></div>
    </>
  );
};
