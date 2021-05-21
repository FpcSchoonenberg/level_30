// do not edit

const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop,
    getRevenueForCrop, getProfitForCrop, getTotalProfit, getYieldForPlantWithFactors, getYieldForCropWithFactors,
    getTotalYieldWithFactors, getRevenueForCropWithFactors, getProfitForCropWithFactors, getTotalProfitWithFactors } = require("./farm.js");


//test1_______________________________________________________________________________________________
describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 3,
    }
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
        }
        const pumpkin = {
            name: "pumpkin",
            yield: 10,
        }
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ]
        expect(getTotalYield({ crops })).toBe(35);     //(5*3)+(2*10)
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
//test5_______________________________________________________________________________________________
describe("getCostsForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        costs: 1.5,
        plantsPerCrop:100
    }
    test("Get costs per crop", () => {
        expect(getCostsForCrop(corn)).toBe(150);    //100*1.5
    });
});
//test6_______________________________________________________________________________________________
describe("getRevenueForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        costs: 1.5,
        plantsPerCrop: 100,
        revenue: 10  //per kilo
    };
    test("Get revenue for crop with no environment factors", () => {
        expect(getRevenueForCrop(corn)).toBe(3000); // 3*100*10
    });
});
//test7_______________________________________________________________________________________________
describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        costs: 1.5,
        plantsPerCrop: 100,
        revenue: 10  //per kilo
    };
    test("Get profit for crop with no environment factors", () => {
        expect(getProfitForCrop(corn)).toBe(2850);   //3000-150
    });
});

//test8_______________________________________________________________________________________________
describe("getTotalProfit", () => {
    const corn = {
        name: "corn",
        yield: 3,
        costs: 1.5,
        plantsPerCrop: 100,
        revenue: 10,  //per kilo
        numCrops: 10,
    };
    test("Get total profit with no environment factors", () => {
        expect(getTotalProfit(corn)).toBe(28500);    //2850*10
    });
});

//test9_______________________________________________________________________________________________
describe("getYieldForPlantWithFactors", () => {
    const corn = {
        name: "corn",
        yield: 3,
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
        ground: "sand",
        wind:"storm"
    }
    test("Get yield for plant with multiple factors", () => {
        expect(getYieldForPlantWithFactors(corn, environmentFactors)).toBe(1);         //3*(1*1.25*0.25)=1
    });
});

//test10_______________________________________________________________________________________________
describe("getYieldForCropWithFactors", () => {
    const corn = {
        name: "corn",
        yield: 3,
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
        ground: "sand",
        wind: "storm"
    }
    const input = {
        crop: corn,
        numCrops: 10,
    };
    test("Get total yield with low sun and stormy factor", () => {
        expect(getYieldForCropWithFactors(input, environmentFactors)).toBe(10);     //10*1
    });
});
//test11_______________________________________________________________________________________________
describe("getTotalYieldWithFactors", () => {
    const corn = {
        name: "corn",
        yield: 3,
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
    const pumpkin = {
        name: "pumpkin",
        yield: 10,
        costs: 1.0,
        plantsPerCrop: 50,
        revenue: 5,
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
        sun: "medium",
        ground: "sand",
        wind: "storm"
    }
    test("Get total yield with environmentsfactors", () => {
        expect(getTotalYieldWithFactors(crops)).toBe(35);
    });
});

//test12_______________________________________________________________________________________________
describe("getRevenueForCropWithFactors", () => {
    const corn = {
        name: "corn",
        yield: 3,
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
        sun: "medium",
        ground: "sand",
        wind: "storm"
    }
    test("Get revenue for crop with environmentsfactors", () => {
        expect(getRevenueForCropWithFactors(corn, environmentFactors)).toBe(1000);
    });
});

//test13_______________________________________________________________________________________________
describe("getProfitForCropWithFactors", () => {
    const corn = {
        name: "corn",
        yield: 3,
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
        sun: "medium",
        ground: "sand",
        wind: "storm"
    }
    test("Get profit for crop with environmentsfactors", () => {
        expect(getProfitForCropWithFactors(corn, environmentFactors)).toBe(850);
    });
});

//test14_______________________________________________________________________________________________
describe("getTotalProfitWithFactors", () => {
    const corn = {
        name: "corn",
        yield: 3,
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
        costs: 1.0,
        plantsPerCrop: 50,
        revenue:5,
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
        sun: "medium",
        ground: "sand",
        wind: "storm"
    }
    test("Get total profit with factors", () => {
        expect(getTotalProfitWithFactors(crops, environmentFactors)).toBe(10650);
    });
});