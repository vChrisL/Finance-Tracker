export function Expense(){
    return(
        <>
        <div className="flex flex-row justify-start content-start items-center gap-2 p-1 px-4 min-h-12 bg-[#f9f9f9] shadow-md shadow-[#b6b6b6] rounded-lg">
            <div className=" w-[2%] font-thin">id</div>
            <div className="w-1/2 font-semibold truncate">desc</div>
            <div className="min-w-fit w-[15%] font-semibold truncate">amount</div>
            <div className="min-w-fit w-[15%] truncate">date</div>
            <div className="min-w-fit w-[15%] truncate">category</div>
            <button className="min-w-fit w-[3%] truncate">delete</button>
        </div>
        </>
    )
}