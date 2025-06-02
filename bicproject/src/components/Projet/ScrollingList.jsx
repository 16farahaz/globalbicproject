import React, { useState } from "react";

const ScrollingList = ({ formations, onSelectFormation, selectedFormation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (formation) => {
    onSelectFormation(formation.id); // Send ID to parent
    setIsOpen(false);
  };

  // Trouve le titre de la formation sélectionnée
  const selectedFormationTitle =
    formations.find((f) => String(f.id) === String(selectedFormation))?.title ||
    "Sélectionnez une formation";

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="relative">
        <button
          type="button"  // <-- Important pour éviter submit
          onClick={toggleDropdown}
          className="bg-blue-900 text-white px-4 py-2 rounded-md w-full text-left"
        >
          {selectedFormationTitle}
        </button>

        {isOpen && (
          <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <ul className="max-h-60 overflow-y-auto">
              {formations?.length > 0 ? (
                formations.map((formation) => (
                  <li
                    key={formation.id}
                    onClick={() => handleSelect(formation)}
                    className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-blue-100"
                  >
                    {formation.title}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">
                  Il n'y a pas des formations disponibles pour vous
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollingList;
