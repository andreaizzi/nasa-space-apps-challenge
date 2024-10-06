const normalize = (value, minVal, maxVal) => {
    return (value - minVal) / (maxVal - minVal);
};

const calculateCropHealthScore = (temperature, precipitation, solarRadiation, vegetationIndex, waterIndex) => {
    const normTemp = normalize(temperature, 0, 40);
    const normPrecip = normalize(precipitation, 0, 100);
    const normSolar = normalize(solarRadiation, 0, 1000);

    const tempWeight = 0.2;
    const precipWeight = 0.2;
    const solarWeight = 0.1;
    const vegetationWeight = 0.3;
    const waterWeight = 0.2;

    const cropHealthScore = (
        normTemp * tempWeight +
        normPrecip * precipWeight +
        normSolar * solarWeight +
        vegetationIndex * vegetationWeight +
        waterIndex * waterWeight
    );

    return (cropHealthScore * 100).toFixed(2);
};

export { calculateCropHealthScore };