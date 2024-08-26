
export default function About({ height, weight, abilities }) {

    const formattedHeight = (height / 10).toFixed(1);
    const formattedWeight = (weight / 10).toFixed(1);

    return (
        <div className='w-full h-full flex flex-col justify-center items-start gap-1 px-7 mt-7'>
            <p>
                <span className='text-md text-slate-400 mr-3'>Height:</span>
                <span className="text-md">{formattedHeight} m</span>
            </p>
            <p>
                <span className='text-md text-slate-400 mr-3'>Weight:</span>
                <span className="text-md">{formattedWeight} kg</span>
            </p>
            <div className='w-full flex flex-wrap'>
                <span className='text-md text-slate-400 mr-3'>Abilities:</span>
                {abilities && abilities.map((item, i) => (
                    <span key={i} className='mr-2 '>{item.ability.name} <span className="text-slate-400">|</span></span>
                ))}
            </div>
        </div>
    );
}
