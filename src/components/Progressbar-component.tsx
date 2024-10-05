import { CSSProperties } from "react";

interface IProgressBarProps {
    value: number,
    // low mid and high threshold values
    low: number,
    mid: number,
    high: number,
}

export function ProgressBar({value, low, mid, high}: IProgressBarProps){

    // colors for low mid and high values
    const lowColor: string = '#22c55e';
    const midColor: string = '#eab308';
    const highColor: string = '#f87171';

    function calcColorRange(){
        if(value <= low){
            return lowColor;
        }
        else if(value > low && value <= high){
            return midColor;
        }
        else{
            return highColor;
        }
    }

    const progressBarStyle: CSSProperties = {
        width: `${value}%`,
        backgroundColor: `${calcColorRange()}`
    }

    return (
        <div className="h-2 w-full my-2 bg-black rounded-full border-[1px] border-gray-200">
            <div className={`h-full rounded-full`} style={progressBarStyle}></div>
        </div>
    );
}