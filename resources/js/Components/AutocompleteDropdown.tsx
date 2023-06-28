import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

const options: string[] = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
];

const AutocompleteDropdown: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setShowDropdown(false);
    };

    const filteredOptions: string[] = options.filter((option) =>
        option.toLowerCase().includes(selectedOption.toLowerCase())
    );

    return (
        <div className="autocomplete-dropdown">
            <input
                type="text"
                placeholder="Select options"
                value={selectedOption}
                onChange={handleInputChange}
                onClick={toggleDropdown}
            />
            {showDropdown && (
                <ul className="dropdown-list">
                    {filteredOptions.map((option) => (
                        <li key={option}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedOption === option}
                                    onChange={() => handleOptionClick(option)}
                                />
                                {option}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
            <AiOutlineDown className="dropdown-icon" onClick={toggleDropdown} />
        </div>
    );
};

export default AutocompleteDropdown;
