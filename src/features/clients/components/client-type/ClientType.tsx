type Props = {
  type: "client" | "other" | "lead";
};

export const ClientType = ({ type }: Props) => {
  const getColor = (type: "client" | "other" | "lead") => {
    switch (type) {
      case "client":
        return "bg-green-500";
      case "other":
        return "bg-blue-500";
      case "lead":
        return "bg-amber-500";
    }
  };

  return (
    <div className="flex w-20 flex-row items-center justify-center gap-2 rounded-full bg-slate-300 py-1.5 shadow-inner shadow-gray-400">
      <p className="text-xs font-medium italic text-gray-700">{type}</p>
      <div className={`h-5 w-5 rounded-full ${getColor(type)}`} />
    </div>
  );
};
