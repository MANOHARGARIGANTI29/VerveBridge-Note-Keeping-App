

const EmptyCard = ({imageSrc,message})=>{
    return(
        <div className="flex flex-col items-center justify-center mt-20">
            <img src={imageSrc} alt="No Notes" className="w-60 sm:w-80 md:w-96"/>
            <p className="w-11/12 sm:w-9/12 md:w-8/12 text-sm sm:text-base font-medium text-slate-700 text-center leading-7 mt-5">{message}</p>
        
        </div>
    )
}

export default EmptyCard;