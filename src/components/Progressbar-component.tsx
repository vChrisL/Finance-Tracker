import { CSSProperties } from "react";

interface IProgressBarProps {
    value: number,
    // low mid and high threshold values
    low: number,
    mid: number,
    high: number,
}

export function ProgressBar({value, low, high}: IProgressBarProps){

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

    // Progressbar styling for width and color
    const progressBarStyle: CSSProperties = {
        width: `${Math.min(Math.max(value, 0), 100)}%`,
        backgroundColor: `${calcColorRange()}`
    }

    return (
        <div className="h-2 w-full my-2 bg-[#f5f5f5] rounded-full border-[1px] border-gray-100">
            <div className={`h-full rounded-full`} style={progressBarStyle}></div>
        </div>
    );
}