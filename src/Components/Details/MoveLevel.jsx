import { useGetBackgroundForLOvelUp } from "../../Hooks/backgroundClass"

export default function MoveLevel({ movesLearntByLevelUp, title }) {
    return (
        <div className='mt-8 w-full max-w-4xl mx-auto px-4'>
            <h2 className='text-lg text-center font-medium mb-2'>{title}</h2>
            <div className='levelUp overflow-x-auto shadow-md rounded-lg mb-5 border'>
                <table className="w-full border-collapse bg-white">
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Move</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Damage Class</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {movesLearntByLevelUp.map((move, index) => (

                            <tr key={index} className='hover:bg-gray-50'>
                                <td className="py-4 px-4 whitespace-nowrap text-sm">{move.level}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">{move.name}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center">
                                        <span className={`mr-2 w-4 h-4 rounded-full ${useGetBackgroundForLOvelUp(move.type)}`}></span>
                                        <span>{move.type || 'N/A'}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm">{move.damageClass || 'N/A'}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm">{move.power || 'N/A'}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm">{move.accuracy || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}