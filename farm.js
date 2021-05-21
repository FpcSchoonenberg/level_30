
//functie 1 opbrengst per plant in kg___________________________________________________________________________________________________
const getYieldForPlant = (plant) => plant.yield;

//functie 2 opbrengst per crop in kg____________________________________________________________________________________________________
const getYieldForCrop = (input) => getYieldForPlant(input.crop) * input.numCrops;

//functie 3 opbrengst totaal alle verschillende soorten crops in kg_____________________________________________________________________
const getTotalYield = ({ crops }) => {
    let totalYield = 0;
    crops.forEach(crop => {
        totalYield +=getYieldForCrop(crop);
    });
    return totalYield;
};

//functie 5 kosten per crop in euro____________________________________________________________________________________________________
const getCostsForCrop = (plant) => plant.costs * plant.plantsPerCrop;

//functie 6 omzet in euro per kg = salesprice * 1kg____________________________________________________________________________________
const getRevenueForCrop = (plant) => plant.yield * plant.revenue * plant.plantsPerCrop;

//functie 7 winst per crop in euro = omzet - kosten____________________________________________________________________________________
const getProfitForCrop = (plant) => getRevenueForCrop(plant) - getCostsForCrop(plant);

//functie8 totale winst per crop_______________________________________________________________________________________________________
const getTotalProfit = (plant) => getProfitForCrop(plant) * plant.numCrops;

//functie9 opbrengst per plant met omgevingsfactoren___________________________________________________________________________________
const getYieldForPlantWithFactors = (plant, environmentFactors) => {
    let totalOfEnvironmentsFactor = 1;
    for (factor in environmentFactors) {
        for (const property in plant.factors) {
            if (property === factor) {
                const factorValue = Object.entries(plant.factors[property]);
                for (i = 0; i <= factorValue.length - 1; i++) {
                    if (factorValue[i][0] === environmentFactors[factor]) {
                        totalOfEnvironmentsFactor = totalOfEnvironmentsFactor * ((factorValue[i][1] + 100) / 100);
                    }
                }
            }
        }
    }
    return Math.round(totalOfEnvironmentsFactor * plant.yield)
};

//functie10 opbrengst per crop per plant_____________________________________________________________________________________________
const getYieldForCropWithFactors = (input, environmentFactors) => {
    return getYieldForPlantWithFactors(input.crop, environmentFactors) * input.numCrops;
};

//functie11 totale opbrengst van alle planten(alle soorten)__________________________________________________________________________
const getTotalYieldWithFactors = (crops, environmentFactors) => {
    let totalYield = 0;
    crops.forEach(crop => {
        totalYield = totalYield + (getYieldForPlantWithFactors(crop.crop, environmentFactors) * crop.numCrops);
    });
    return totalYield;
};

//functie12 omzet crop = opbrengst in kg * revenue (salesprice * 1kg)________________________________________________________________
const getTotalProfitWithFactors = (crops, environmentFactors) => {
    let totalProfitWithFactors = 0;
    crops.forEach(crop => {
        totalProfitWithFactors += getProfitForCropWithFactors(crop.crop, environmentFactors) * crop.numCrops;
    });
    return totalProfitWithFactors;
};

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
    getProfitForCropWithFactors,
    getTotalProfitWithFactors
};






