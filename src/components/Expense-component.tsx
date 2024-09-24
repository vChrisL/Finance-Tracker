export function Expense(){
    return(
        <>
        <div className="flex flex-row justify-start content-start items-center gap-2 p-1 px-4 min-h-12 bg-[#f9f9f9] shadow-md shadow-[#b6b6b6] rounded-lg">
            <div className="min-w-fit w-[2%]">id</div>
            <div className="min-w-fit w-1/2 font-semibold">desc</div>
            <div className="min-w-fitw-[15%] font-semibold">amount</div>
            <div className="min-w-fit w-[15%]">date</div>
            <div className="min-w-fit w-[15%]">category</div>
            <button className="min-w-fit w-[3%]">delete</button>
        </div>
        </>
    )
}