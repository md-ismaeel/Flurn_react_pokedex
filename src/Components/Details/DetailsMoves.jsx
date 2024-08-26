import axios from "axios";
import React, { useState, useEffect } from "react";
import MoveLevel from "./MoveLevel";

export default function DetailsMoves({ moves }) {
    const [movesLearntByLevelUp, setMovesLearntByLevelUp] = useState([]);
    const [movesLearntByTechnicalMachines, setMovesLearntByTechnicalMachines] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // console.log("movesLearntByTechnicalMachines", movesLearntByTechnicalMachines);


    useEffect(() => {
        const fetchMoveDetails = async () => {
            if (loading) return;
            setLoading(true)
            setError(null)
            try {
                // Fetch Level-Up Moves
                const levelUpMoves = moves.filter((move) => move.version_group_details.some((detail) => detail.move_learn_method.name === "level-up"));

                const moveDetailsPromises = await Promise.all(levelUpMoves.map(async (move) => {
                    const response = await axios.get(move.move.url);
                    const moveDetails = response.data;
                    const levelDetail = move.version_group_details.find((detail) => detail.move_learn_method.name === "level-up");

                    return {
                        level: levelDetail ? levelDetail.level_learned_at : "N/A",
                        name: move.move.name,
                        type: moveDetails.type.name,
                        damageClass: moveDetails.damage_class.name,
                        power: moveDetails.power || "N/A",
                        accuracy: moveDetails.accuracy || "N/A",
                    };
                }))

                const sortedMoveData = moveDetailsPromises.sort((a, b) => a.level - b.level);
                setMovesLearntByLevelUp(sortedMoveData);

                // Fetch Technical Machine (TM) Moves
                const machines = moves.filter((move) => move.version_group_details.some((detail) => detail.move_learn_method.name === "machine"));
                // console.log("movesLearntByTechnicalMachines", machines);

                const moveDetailsPromisesMachines = await Promise.all(machines.map(async (move) => {
                    const response = await axios.get(move.move.url);
                    const moveDetails = response.data;
                    const levelDetail = move.version_group_details.find((detail) => detail.move_learn_method.name === "machine");

                    return {
                        level: levelDetail ? levelDetail.level_learned_at : "N/A",
                        name: move.move.name,
                        type: moveDetails.type.name,
                        damageClass: moveDetails.damage_class.name,
                        power: moveDetails.power || "N/A",
                        accuracy: moveDetails.accuracy || "N/A",
                    };
                }));
                setMovesLearntByTechnicalMachines(moveDetailsPromisesMachines);
            }
            catch (err) {
                console.warn("ThugBoss-ERROR" + err?.message);
                setError("Error occurred while fetching data", err?.message)
            } finally { }
            setLoading(false)
        }

        fetchMoveDetails();
    }, [moves]);

    if (loading) return <div className="text-center text-md italic text-pink-500 mt-5">Loading...</div>;
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                {movesLearntByLevelUp.length > 0 ? (
                    <MoveLevel
                        movesLearntByLevelUp={movesLearntByLevelUp}
                        title="Moves learnt by Level Up"
                    />
                ) : (
                    "No data available for Level Up moves."
                )}
                {movesLearntByTechnicalMachines.length > 0 ? (
                    <MoveLevel
                        movesLearntByLevelUp={movesLearntByTechnicalMachines}
                        title="Moves learnt by Technical Machine"
                    />
                ) : (
                    "No data available for TM moves."
                )}
            </div>
        </>
    );
}
