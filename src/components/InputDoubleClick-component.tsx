import React, { useState } from "react"

interface IDoubleClickInputProps{
    type: React.HTMLInputTypeAttribute,
    step: number,
    pValue: string | number,
    updateStore: any,
}

export function DoubleClickInput({type, step, pValue, updateStore}: IDoubleClickInputProps){
    const [isEditing, setIsEditing] = useState<boolean>(false);
    let newValue: string | number = pValue;

    const input = () => {
        // if editing amount is true, create input element for editing, else create a single paragraph element
        if(isEditing){
            return(
                <div className="w-fit font-semibold truncate" onDoubleClick={() => setIsEditing(true)} >
                    <input className="bg-[#dbdbdb]" 
                    type="number"
                    step="0.01"
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
                <p onDoubleClick={() => setIsEditing(true)}>{pValue}</p>
            )
        }
    }

    return(
        <>
        {input()}
        </>  
    )
}