import { XMarkIcon } from "@heroicons/react/24/outline";
import { title } from "process";
import React, { useEffect } from "react";
import EditGames from "../features/EditGames";
type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element | undefined;
  title: string;
  user: any;
  addGame: any;
  deleteGame: any;
};
export const PopUpTwo = ({
  isOpen,
  onClose,
  addGame,
  deleteGame,
  user,
  children,
  title,
}: PopupProps) => {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        // Call your function here
        onClose();
      }
    }
    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div>
      {isOpen && (
        <div className="dialog-container overflow-hidden ">
          <div className="dialog blur-none">
            <div className="dialog-header">
              <h2>{title}</h2>
              <XMarkIcon className="close-btn" onClick={onClose}></XMarkIcon>
            </div>
            <div className="dialog-body ">
              <EditGames
                key="1"
                addGame={addGame}
                deleteGame={deleteGame}
                userGames={user?.games}
              ></EditGames>
              ,
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpTwo;
