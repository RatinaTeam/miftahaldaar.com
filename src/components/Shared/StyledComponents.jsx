import { Button, Select, Input, Option } from "@material-tailwind/react";


import { useContext } from 'react'

export const ActionButtonsContainer = ({ children }) => <div>{children}</div>;
export const ActionButtonsContainer1 = ({ children }) => <div>{children}</div>;
export const ButtonWithCounter = ({ count, children }) => (
    <Button>
        <span className="bg-red-300 p-2 rounded-full mr-3">20</span>
        New Orders
    </Button>
);
export const NewOrderSectionContainer = ({ children }) => <div className="space-y-4 py-10">{children}</div>;

export const NewOrderSection = ({ children }) => <div className="border border-gray-800">{children}</div>;

export const BlackBgTitleBar = ({ children }) => (
    <div className="bg-gray-800 text-white text-center py-2 text-lg ">{children}</div>
);

export const NewOrderSectionFormContainer = ({ children }) => (
    <div className="p-5 grid grid-cols-2 lg:grid-cols-4 gap-4 " style={{ direction: 'rtl' }}>{children}</div>
);

export const NewOrderSectionFormContainerTwoCol = ({ children }) => <div className="flex flex-wrap">{children}</div>;

export const NewOrderFinalActionButtonContainer = ({ children }) => (
    <div className=" flex flex-wrap justify-between">{children}</div>
);

// import { OtherContext } from "../../contexts/OtherContexts";
export const SearchField = ({ onSearch, id, value, options, label }) => {

    if (options) {
        if (!options.includes('الكل'))
            options.unshift('الكل')
        return (
            <select
                dir="rtl"
                label={"بحث بـ " + label}
                id={id}                
                placeholder="بحث"
                style={{ textAlign: "center" }}
                value={value}
                //with not more 100px width
                className="max-w-[150px] text-sm font-normal focus-visible:outline-none px-2 py-1 mt-2 rounded-lg border border-gray-300"
                onChange={(val) => {
                    
                    // console.log(val, 'is selected');
                    // console.log(id, 'is id');
                    onSearch('', id, val.target.value)
                }
                }
            >
                {options.map((option, index) => (
                    <option key={index} value={option}  
                    className="max-w-[100px]">
                        {option}
                    </option>
                ))}
            </select>
        )
    }
    return (
        <input
            type="text"
            id={id}
            className="max-w-[100px] text-sm font-normal focus-visible:outline-none px-2 py-1 mt-2  rounded-lg border border-gray-300"
            // className="max-w-[100px] text-sm font-normal px-2 py-1 mt-2 "
            placeholder="بحث"
            style={{ direction: "rtl", textAlign: "right" }}
            // onChange={(event) => onSearch(event.target)}
            onLoad={() => {
                console.log('is loaded');
            }}
            defaultValue={value}

            onKeyUp={(event) => {
                if (event.key === 'Enter')
                    onSearch(event.target)
                // if backspace is pressed and the input is empty
                if (event.key === 'Backspace' && event.target.value === '') {
                    onSearch(event.target)
                }
            }
            }
            enterKeyHint="done"
        />
    )
};
