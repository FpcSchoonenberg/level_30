// 1 opbrengst per plant in kg
const getYieldForPlant = (plant) => plant.yield;

// 2 opbrengst per crop in kg
const getYieldForCrop = (input) => getYieldForPlant(input.crop) * input.numCrops;

// 3 opbrengst totaal alle verschillende soorten crops in kg
const getTotalYield = ({ crops }) => {
    let totalYield = 0;
    crops.forEach(crop => {
        totalYield = totalYield + getYieldForCrop(crop);
    });
    return totalYield;
};

// 4 kosten per crop in euro
const getCostsForCrop = (plant) => plant.costs * plant.plantsPerCrop;

// 5 omzet in euro per kg = salesprice * 1kg
const getRevenueForCrop = (plant) => plant.yield * plant.revenue;

// 6 winst per crop in euro = omzet - kosten
const getProfitForCrop = (plant) => getRevenueForCrop(plant) - getCostsForCrop(plant);

// 7 totale winst per crop
const getTotalProfit = (plant) => getProfitForCrop(plant) * plant.numCrops;

// 8 opbrengst per plant met omgevingsfactoren
const getYieldForPlantWithFactors = (plant, environmentFactors) => {
    let totalOfEnvironmentsFactor = 1
    for (factor in environmentFactors) {
        for (const property in plant.factors) {
            if (property === factor) {
                const factorValue = Object.entries(plant.factors[property]);
                for (i = 0; i <= factorValue.length - 1; i++) {
                    if (factorValue[i][0] === environmentFactors[factor]) {
                        totalOfEnvironmentsFactor = totalOfEnvironmentsFactor * (factorValue[i][1] + 100) / 100;
                    }
                }
            }
        }
    } return Math.round(totalOfEnvironmentsFactor * plant.yield)
}

// 9 opbrengst per crop per plant
const getYieldForCropWithFactors = (input, environmentFactors) => {
    return getYieldForPlantWithFactors(input.crop, environmentFactors) * input.numCrops;
};

//10 totale opbrengst van alle planten(alle soorten)
const getTotalYieldWithFactors = (crops,environmentFactors) => {
    let totalYield = 0;
    crops.forEach(crop => {
        totalYield = totalYield + (getYieldForPlantWithFactors(crop.crop, environmentFactors) * crop.numCrops);
    });
    return totalYield;
};

// 11 omzet crop = opbrengst in kg * revenue (salesprice * 1kg)
const getRevenueForCropWithFactors = (input, environmentFactors) => {
     return (getYieldForPlantWithFactors(input, environmentFactors)* input.plantsPerCrop * input.revenue)
};

// // 12 get profit For Crop with factors 
// const getProfitForCropWithFactors = (input, environmentFactors) => {
//     const revenuePerCrop = getRevenueForCropWithFactors(input, environmentFactors)
//     const costsPerCrop = getCostsForCrop(input)
//     return (revenuePerCrop - costsPerCrop)
// };

// // 13 get total profit with factors 
// const getTotalProfitWithFactors = (input, environmentFactors) => {
//     return getProfitForCropWithFactors(input, environmentFactors) * input.numCrops
// };

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
    getYieldForPlantWithFactors,
    getYieldForCropWithFactors,
    getTotalYieldWithFactors,
    getRevenueForCropWithFactors,
//     // //     // getProfitForCropWithFactors,
//     // //     // getTotalProfitWithFactors
};






