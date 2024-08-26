import { backgroundGradients, backgrounds } from "../Components/BackGroundTailwindCss/BackGroundTailwindCss";

export const useGetBackgroundClass = (types) => {
    if (!types || types.length === 0) return backgrounds.default;
    const primaryType = types[0]?.type?.name || "default";
    return backgrounds[primaryType] || backgrounds.default;
};


export const useGetBackgroundGradientsClass = (types) => {
    if (!types || types.length === 0) return backgroundGradients.default;
    const primaryType = types[0]?.type?.name || "default";
    return backgroundGradients[primaryType] || backgroundGradients.default;
};

export const useGetBackgroundForLOvelUp = (color) => {
    if (!color) return backgroundGradients.default
    return backgroundGradients[color]
}