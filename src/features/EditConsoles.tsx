import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { getToken, request } from "src/utils";

const EditConsoles = (props: any) => {
  const [selectedConsoles, setSelectedConsoles] = useState<string[]>(
    props.user.platforms
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const consoles = [
    "Atari 2600",
    "Atari 5200",
    "Atari 7800",
    "Atari Jaguar",
    "Atari Lynx",
    "ColecoVision",
    "Commodore 64",
    "Game Boy",
    "Game Boy Advance",
    "Game Boy Color",
    "GameCube",
    "Intellivision",
    "Magnavox Odyssey",
    "Microsoft Xbox",
    "Microsoft Xbox 360",
    "Microsoft Xbox One",
    "Neo Geo AES",
    "Neo Geo CD",
    "Neo Geo MVS",
    "Nintendo 3DS",
    "Nintendo 64",
    "Nintendo DS",
    "Nintendo Entertainment System",
    "Nintendo GameCube",
    "Nintendo Switch",
    "Nintendo Wii",
    "Nintendo Wii U",
    "PC",
    "PlayStation",
    "PlayStation 2",
    "PlayStation 3",
    "PlayStation 4",
    "PlayStation 5",
    "PlayStation Portable",
    "PlayStation Vita",
    "Sega Dreamcast",
    "Sega Game Gear",
    "Sega Genesis",
    "Sega Master System",
    "Sega Saturn",
    "Super Nintendo Entertainment System",
    "TurboGrafx-16",
    "Xbox 360",
  ];

  const filteredConsoles = consoles.filter(
    (console: string) =>
      !selectedConsoles.includes(console) &&
      console.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
    if (e.target.value === "") {
      setShowDropdown(false);
    }
  };

  const handleSelect = (console: string) => {
    setSelectedConsoles([...selectedConsoles, console]);
    setInputValue("");
    setShowDropdown(false);
  };

  const handleRemove = (console: string) => {
    setSelectedConsoles(selectedConsoles.filter((c) => c !== console));
  };

  return (
    <div className=" flex h-[70vh] w-full scale-90 flex-col  ">
      <div className="dropdown-container relative top-[-18vh]">
        <div className="selected-container rounded-t-md border-b-0">
          <input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type Console(Ex: PS5) Then Select"
            className="input-field text-2xl"
          />
          {showDropdown && (
            <ul className="dropdown-list top-[9vh] mb-10 h-auto rounded-b-md ">
              {filteredConsoles.map((console: any) => (
                <li key={console} onClick={() => handleSelect(console)}>
                  {console}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="selected-container rounded-b-md border-t-0">
          {selectedConsoles.map((console) => (
            <div key={console} className="selected-item text-xl">
              {console}

              <TrashIcon
                onClick={() => handleRemove(console)}
                className="h-7 w-7 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="login-button mi-auto top-[0] h-auto rounded-md text-xl"
        onClick={async () => {
          const temp: string[] = [];
          selectedConsoles.forEach((value: string) =>
            temp.push(value.replaceAll(" ", "_"))
          );
          props.user.platforms = selectedConsoles;
          props.setUser(props.user);
          getToken();
          await request("/users", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: {
              platforms: temp,
            },
          });
          props.setPopUp(false);
          window.alert("Platforms have been updated");
        }}
      >
        Save
      </button>
    </div>
  );
};

export default EditConsoles;
