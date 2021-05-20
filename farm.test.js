// do not edit

const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop,
    getRevenueForCrop, getProfitForCrop, getTotalProfit, getYieldForPlantWithFactors, getYieldForCropWithFactors,
    getTotalYieldWithFactors, getRevenueForCropWithFactors, getProfitForCropWithFactors, getTotalProfitWithFactors } = require("./farm.js");

//test1_______________________________________________________________________________________________
describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 3,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(3);
    });
});
//test2_______________________________________________________________________________________________
describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});
//test3_______________________________________________________________________________________________
describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });
    //test4_______________________________________________________________________________________________
    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getCostsForCrop", () => {
    const corn = {
        name: "corn",
        yield: 30,
        costs: 1,
        plantsPerCrop: 100
    };
    test("Get costs per crop", () => {
        expect(getCostsForCrop(corn)).toBe(100);
    });
});
//test5_______________________________________________________________________________________________
describe("getRevenueForCrop", () => {
    const corn = {
        name: "corn",
        yield: 30,
        costs: 1,
        plantsPerCrop: 100,
        revenue: 10  //per kilo
    };
    test("Get revenue for crop with no environment factors", () => {
        expect(getRevenueForCrop(corn)).toBe(300);
    });
});
//test6_______________________________________________________________________________________________
describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        yield: 30,
        costs: 1.5,
        plantsPerCrop: 100,
        revenue: 10  //per kilo
    };
    test("Get profit for crop with no environment factors", () => {
        expect(getProfitForCrop(corn)).toBe(150);
    });
});

//test7_______________________________________________________________________________________________
describe("getTotalProfit", () => {
    const corn = {
        name: "corn",
        yield: 30,
        costs: 1.5,
        plantsPerCrop: 100,
        revenue: 10,  //per kilo
        numCrops: 10,
    };
    test("Get total profit with no environment factors", () => {
        expect(getTotalProfit(corn)).toBe(1500); //150*10
    });
});

//test8_______________________________________________________________________________________________
describe("getYieldForPlantWithFactors", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: +50,
            },
            ground: {
                clay: -50,
                sand: +25,
            },
            wind: {
                tornado: -100,
                storm: -75
            }
        }
    }

    const environmentFactors = {
        sun: "medium",
        ground: "sand"
    }

    test("Get yield for plant with multiple factors", () => {
        //30*(1*1*1.25*0.25)=4
        expect(getYieldForPlantWithFactors(corn, environmentFactors)).toBe(38);
    });
});

//test9_______________________________________________________________________________________________
describe("getYieldForCropWithFactors", () => {
    const corn = {
        name: "corn",
        yield: 30,
        costs: 1.5,
        plantsPerCrop: 100,
        revenue: 10,  //per kilo
        // numCrops: 10,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: +50,
            },
            ground: {
                clay: -50,
                sand: +25,
            },
            wind: {
                tornado: -100,
                storm: -75
            }
        },
    };
    const environmentFactors = {
        sun: "low",
        wind: "storm",
    };
    const input = {
        crop: corn,
        numCrops: 10,
    };
    test("Get total yield with low sun and stormy factor", () => {
        expect(getYieldForCropWithFactors(input, environmentFactors)).toBe(40);
    });
});
//test10_______________________________________________________________________________________________
describe("getTotalYieldWithFactors", () => {
    const corn = {
        name: "corn",
        yield: 30,
        costs: 1.5,
        plantsPerCrop: 100,
        revenue: 10,  //per kilo
        // numCrops: 10,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: +50,
            },
            ground: {
                clay: -50,
                sand: +25,
            },
            wind: {
                tornado: -100,
                storm: -75
            }
        },
    }
    const pumpkin = {
        name: "pumpkin",
        yield: 10,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: +50,
            },
            ground: {
                clay: -50,
                sand: +25,
            }
        }
    }
    const crops = [
        { crop: corn, numCrops: 5 },
        { crop: pumpkin, numCrops: 2 },
    ]

    const environmentFactors = {
        sun: "low",
        ground: "clay",
    }

    test("Get total yield with environmentsfactors", () => {
        expect(getTotalYieldWithFactors(crops)).toBe(170);
    });
});

//test11_______________________________________________________________________________________________
describe("getRevenueForCropWithFactors", () => {
    const corn = {
        name: "corn",
        yield: 30,
        costs: 1.5,
        plantsPerCrop: 100,
        revenue: 10,  //per kilo
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: +50,
            },
            ground: {
                clay: -50,
                sand: +25,
            },
            wind: {
                tornado: -100,
                storm: -75
            }
        },
    }
    const environmentFactors = {
        sun: "low",
        ground: "clay",
    }
    test("Get revenue for crop with environmentsfactors", () => {
        expect(getRevenueForCropWithFactors(corn,environmentFactors)).toBe(8000);
    });
});


// // 12 
// describe("getProfitForCropWithFactors", () => {
//     const corn = {


//     test("Get profit for crop with environmentsfactors", () => {
//         expect(getProfitForCropWithFactors(corn, environmentFactors)).toBe(450);
//     });
// });


// // 13 
// describe("getTotalProfitWithFactors", () => {
//     const corn = {

//     test("Get total profit with factors", () => {
//         expect(getTotalProfitWithFactors(corn, environmentFactors)).toBe(4500);
//     });
// });