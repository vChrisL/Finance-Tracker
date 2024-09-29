import { useState } from "react"
import { IExpenseData } from "../data/expenseData";


interface IExpenseProps {
    expenseData: IExpenseData
}

export function Expense({expenseData}: IExpenseProps){
    const [isEditingField, setIsEditingField] = useState({
        editingDesc: false,
        editingAmount: false,
        editingDate: false,
        editingCategory: false,
    });

    const [description, setDescription] = useState<string>(expenseData.desc);
    const [amount, setAmount] = useState<number>(expenseData.amount);
    const [date, setDate] = useState<string>(expenseData.date);
    const [category, setCategory] = useState<string>(expenseData.category);

    return(
        <>
        <div className="flex flex-row justify-start content-start items-center gap-2 p-1 px-4 min-h-12 bg-[#f9f9f9] shadow-md shadow-[#b6b6b6] rounded-lg">
            <div className=" w-[2%] font-thin">id</div>
            <div className="w-1/2 font-semibold truncate" onDoubleClick={() => setIsEditingField({...isEditingField, editingDesc: true})} >
                {isEditingField.editingDesc ? <input className="bg-[#dbdbdb]" defaultValue={description} onChange={(e) => setDescription(description === null ? 'empty' : e.target.value)} tabIndex={0} onBlur={() => setIsEditingField({...isEditingField, editingDesc: false})}></input> : <p className="min-w-20 min-h-5 align-middle">{description}</p>}
            </div>
            <div className="min-w-fit w-[15%] font-semibold truncate">
                <p>{isEditingField.editingAmount ? 'Editing' : '$' + amount}</p>
            </div>
            <div className="min-w-fit w-[15%] truncate">
                <p>{isEditingField.editingDate ? 'Editing' : date}</p>
            </div>
            <div className="min-w-fit w-[15%] truncate">
                <p>{isEditingField.editingCategory ? 'Editing' : category}</p>
            </div>
            <button className="min-w-fit w-[3%] truncate">delete</button>
        </div>
        </>
    )
}