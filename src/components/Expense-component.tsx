export function Expense(){
    return(
        <>
        <div className="flex flex-row justify-between content-start items-center gap-1 p-1 px-4 bg-[#f9f9f9] shadow-md shadow-[#b6b6b6] rounded-lg">
            <div>id</div>
            <div>desc</div>
            <div>amount</div>
            <div>date</div>
            <div>category</div>
            <button>delete</button>
        </div>
        </>
    )
}