
export default function BaseStats({ stats }) {
    // const maxBaseStat = 255;

    const baseStateFunction = (value) => {
        const maxBaseStat = 100;
        let baseValue = value / maxBaseStat * 100;
        if (baseValue > 100) {
            baseValue = 100
        }
        return `${baseValue}%`

    }

    const getColor = (name) => {
        switch (name) {
            case 'hp':
                return 'bg-red-500';
            case 'attack':
                return 'bg-orange-500';
            case 'defense':
                return 'bg-blue-500';
            case 'special-attack':
                return 'bg-purple-500';
            case 'special-defense':
                return 'bg-teal-500';
            case 'speed':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className='w-[80%] flex flex-col justify-center items-center max-w-md mx-auto p-6 mt-4 mb-4'>
            {stats && stats.map((st, i) => (
                <div key={i} className='mb-2 flex justify-center items-center gap-4 w-full'>
                    <div className='flex justify-between items-center mb-2 w-[40%]'>
                        <span className='w-[80%] flex justify-end items-center  text-sm font-medium text-gray-500'>{st.stat.name}</span>
                        <span className='w-[] text-sm font-medium text-gray-900'>{st.base_stat}</span>
                    </div>
                    <div className='relative w-[45%] flex bg-gray-200 rounded-full h-[4px] mt-[-7px]'>
                        <div
                            className={`absolute h-full rounded-full ${getColor(st.stat.name)}`}
                            style={{ width: `${baseStateFunction(st.base_stat)}` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
