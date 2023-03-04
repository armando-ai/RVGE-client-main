import { ArrowLeftIcon, UserCircleIcon } from "../../../../components/";
import { type Card } from "../../types";
import Image from "next/image";
import { ClientType } from "../client-type/ClientType";

type Props = {
  key: string;
  card: Card;
  className?: string;
  onClick?: CallableFunction;
};

export const ClientCard = ({ card, className, onClick }: Props) => {
  return (
    <div
      key={card.id}
      onClick={onClick ? (e) => onClick(e) : undefined}
      className={`relative rounded bg-slate-300 ${className ? className : ""}`}
    >
      <ArrowLeftIcon className={`absolute top-1 left-0.5 h-5 w-5 `} />
      <div className="mx-6 flex flex-row items-center justify-between py-4">
        <div className="flex space-x-2">
          {card.image ? (
            <Image width={48} height={48} src={card.image} alt={""} />
          ) : (
            <UserCircleIcon className="h-12 w-12" />
          )}
          <p className="flex flex-col">
            <span className="pl-1">{card.name}</span>
            <span className="pl-1 text-sm font-medium italic tracking-wide text-gray-600">
              {card.email.toLowerCase()}
            </span>
          </p>
        </div>
        <ClientType type={card.type} />
      </div>
    </div>
  );
};
