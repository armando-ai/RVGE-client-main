import React, { useState } from "react";
import GameCard from "./GameCard";
import { getToken, request } from "src/utils";

const SendTrade = (props: any) => {
  const [selectedConsoles, setSelectedConsoles] = useState<any>([]);

  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const consoles = props.session.games;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
    if (e.target.value === "") {
      setShowDropdown(false);
    }
  };

  const handleSelect = (console: any) => {
    setSelectedConsoles([console, ...selectedConsoles]);
    setInputValue("");
    setShowDropdown(false);
  };

  const filteredConsoles = consoles.filter(
    (console: any) =>
      !selectedConsoles.some(
        (selectedConsole: any) => selectedConsole.id === console.id
      ) && console.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleRemove = (console: any) => {
    setSelectedConsoles(
      selectedConsoles.filter((c: any) => c.id !== console.id)
    );
  };

  return (
    <div className="flex h-full w-full flex-col  items-center ">
      <div className="dropdown-container relative top-[5%] mt-0 ">
        <div className="selected-container  rounded-md  ">
          <input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search Your Game Collection"
            className="input-field "
          />
          {showDropdown && (
            <ul className="dropdown-list top-[14%] rounded-b-md ">
              {filteredConsoles.map((console: any) => (
                <li
                  className="smooth"
                  key={console}
                  onClick={() => handleSelect(console)}
                >
                  {console.name} - {console.platform.replaceAll("_", " ")} -{" "}
                  {console.year}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative  left-[-45%] flex h-[45vh] w-[80vw] flex-row items-start justify-items-start   ">
          {selectedConsoles.map((console: any) => (
            <GameCard
              className="mt-3  mr-3 ml-0 h-[40vh] w-[18vw] overflow-hidden border-none "
              profile={false}
              offer={true}
              handleRemove={handleRemove}
              game={console}
            ></GameCard>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="login-button mi-auto mt-auto h-auto rounded-md  "
        onClick={async () => {
          await getToken();
          await request("/trades/" + props.offerId, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: {
              games: selectedConsoles.map((obj: { id: any }) => obj.id),
            },
          });
          props.setPopUp(false);
          window.alert("Trade Sent");
        }}
      >
        Send Offer
      </button>
    </div>
  );
};

export default SendTrade;
