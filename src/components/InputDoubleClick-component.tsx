import React, { useState } from "react"

interface IDoubleClickInputProps{
    type: React.HTMLInputTypeAttribute,
    step: number,
    pValue: number,
    updateStore: any,
}

export function DoubleClickInput({type, step, pValue, updateStore}: IDoubleClickInputProps){
    // is editing state
    const [isEditing, setIsEditing] = useState<boolean>(false);
    // temp new value
    let newValue: string | number = pValue;
    // number format
    const numberFormat = Intl.NumberFormat("en-CA", {style: "currency", currency: 'CAD'});

    // Input component
    const input = () => {
        // if editing amount is true, create input element for editing, else create a single paragraph element
        if(isEditing){
            return(
                <div className="w-fit font-semibold truncate" onDoubleClick={() => setIsEditing(true)} >
                    <input className="bg-[#dbdbdb]" 
                    type={type}
                    step={step}
                    defaultValue={pValue} 
                    onChange={(e) => newValue = e.target.value} // set budget here 
                    tabIndex={0} 
                    onBlur={() => (
                        setIsEditing(false),
                        updateStore(newValue) 
                    )}/>
                </div>
            )
        }
        else {
            return(
                <p className="pl-1" onDoubleClick={() => setIsEditing(true)}>{numberFormat.format(pValue)}</p>
            )
        }
    }

    return(
        <>
        {input()}
        </>  
    )
}