import { useState } from "react"
import { expenseCategories, IExpenseData } from "../data/expenseData";
import { removeExpenseFromMasterList } from "../data/expenseData";
import { useMonthlyExpense } from "../data/expenseData";

interface IExpenseProps {
    id: number,
    expenseData: IExpenseData
}

export function Expense({id, expenseData}: IExpenseProps){
    // Is editing field useState object
    const [isEditingField, setIsEditingField] = useState({
        editingDesc: false,
        editingAmount: false,
        editingDate: false,
        editingCategory: false,
    });

    // useStates for each expense field
    const [description, setDescription] = useState<string>(expenseData.desc);
    const [amount, setAmount] = useState<number>(expenseData.amount);
    const [date, setDate] = useState<string>(expenseData.date);
    const [category, setCategory] = useState<string>(expenseData.category);

    // updateMasterList store function
    const updateMasterList = useMonthlyExpense((state: any) => state.updateMasterList)
    // number format for CAD currency
    const numberFormat = Intl.NumberFormat("en-CA", {style: "currency", currency: 'CAD'})

    // description component
    const descComponent = () => {
        // if editing desc is true, create input element for editing, else create a single paragraph element
        if(isEditingField.editingDesc){
            return(
                <div className="w-1/2 font-semibold truncate" onDoubleClick={() => setIsEditingField({...isEditingField, editingDesc: true})} >
                    <input className="bg-[#dbdbdb]" 
                    type="text"
                    defaultValue={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    tabIndex={0} 
                    onBlur={() => (
                        setIsEditingField({...isEditingField, editingDesc: false}), 
                        expenseData.desc = description, 
                        updateMasterList()
                    )}/>
                </div>
            )
        }
        else {
            return(
                <div className="w-1/2 font-semibold truncate" onDoubleClick={() => setIsEditingField({...isEditingField, editingDesc: true})}>
                    <p className="min-w-20 min-h-5 align-middle">{description}</p>
                </div>
            )
        }
    }
    // amount component
    const amountComponent = () => {
        // if editing amount is true, create input element for editing, else create a single paragraph element
        if(isEditingField.editingAmount){
            return(
                <div className="w-1/2 font-semibold truncate" onDoubleClick={() => setIsEditingField({...isEditingField, editingAmount: true})} >
                    <input className="bg-[#dbdbdb]" 
                    type="number"
                    step="0.01"
                    defaultValue={amount} 
                    onChange={(e) => setAmount(parseFloat(e.target.value))} 
                    tabIndex={0} 
                    onBlur={() => (
                        setIsEditingField({...isEditingField, editingAmount: false}), 
                        expenseData.amount = amount, 
                        updateMasterList()
                    )}/>
                </div>
            )
        }
        else {
            return(
                <div className="w-1/2 font-semibold truncate" onDoubleClick={() => setIsEditingField({...isEditingField, editingAmount: true})}>
                    <p className="min-w-20 min-h-5 align-middle">{numberFormat.format(amount)}</p>
                </div>
            )
        }
    }
    // date component
    const dateComponent = () => {
        // if editing amount is true, create input element for editing, else create a single paragraph element
        const splitDate: string[] = date.split('-');
        const finalDay: number = new Date(parseInt(splitDate[0]), parseInt(splitDate[1]), 0).getDate();

        if(isEditingField.editingDate){
            return(
                <div className="w-1/2 font-semibold truncate" onDoubleClick={() => setIsEditingField({...isEditingField, editingDate: true})} >
                    <input className="bg-[#dbdbdb]" 
                    type="date"
                    min={`${splitDate[0]}-${splitDate[1]}-01`}
                    max={`${splitDate[0]}-${splitDate[1]}-${finalDay}`}
                    defaultValue={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    tabIndex={0} 
                    onBlur={() => (
                        setIsEditingField({...isEditingField, editingDate: false}), 
                        expenseData.date = date, 
                        updateMasterList()
                    )}/>
                </div>
            )
        }
        else {
            return(
                <div className="w-1/2 font-semibold truncate" onDoubleClick={() => setIsEditingField({...isEditingField, editingDate: true})}>
                    <p className="min-w-20 min-h-5 align-middle">{date}</p>
                </div>
            )
        }
    }
    // category component
    function categoryComponent(){
        if(isEditingField.editingCategory){
            return(
                <div className="min-w-fit w-[15%] truncate" onDoubleClick={() => setIsEditingField({...isEditingField, editingCategory: true})}>
                    <select className="bg-[#dbdbdb]" 
                    defaultValue={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    tabIndex={0} 
                    onBlur={() => (
                        setIsEditingField({...isEditingField, editingCategory: false}), 
                        expenseData.category = category, 
                        updateMasterList()
                    )}>
                        {expenseCategories.map((category) => 
                            <option value={category}>{category}</option>
                        )}
                    </select>
                </div>
            )
        }
        else{
            return(
                <div className="min-w-fit w-[15%] truncate" onDoubleClick={() => setIsEditingField({...isEditingField, editingCategory: true})}>
                    <p>{category}</p>
                </div>
            )
        }
    }
    {expenseCategories.map((category) => 
        <option value={category}>{category}</option>
    )}

    // Handles deleting expense on delete button click
    function onDelete(){
        removeExpenseFromMasterList(id);
        updateMasterList();
    }

    return(
        <>
        <div className="flex flex-row justify-start content-start items-center gap-2 p-1 px-4 min-h-12 bg-[#f9f9f9] shadow-md shadow-[#b6b6b6] rounded-lg">
            <div className=" w-[2%] font-thin">{id}</div>
            {descComponent()}
            {amountComponent()}
            {dateComponent()}
            {categoryComponent()}
            <button className="min-w-fit w-[3%] truncate" onClick={onDelete}>delete</button>
        </div>
        </>
    )
}