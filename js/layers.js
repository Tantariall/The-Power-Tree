addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "darkred",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "proteins", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 23)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for protein", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Addifier",
            description: "Increase base power gain by +1.",
            cost: new Decimal(3),
            effect() {
                return 1
            },
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        12: {
            title: "Doubler",
            description: "Double power gain.",
            cost: new Decimal(1.5*2),
        },
        13: {
            title: "Empower",
            description: "Power gain is /3. This effect will negate at certain point.",
            cost: new Decimal(1.5*2),
            effect () {
                return Math.min(player.points.add(1).pow(0.7).times(1/3), 3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Another Addifier",
            description: "Increase base power gain by +3.",
            unlocked() {return hasUpgrade("p", 11)&&hasUpgrade("p", 12)&&hasUpgrade("p", 13)},
            cost: new Decimal(10),
            effect() {
                return 3
            },
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        22: {
            title: "Tripler",
            description: "Triple power gain.",
            unlocked() {return hasUpgrade("p", 11)&&hasUpgrade("p", 12)&&hasUpgrade("p", 13)},
            cost: new Decimal(10),
        },
        23: {
            title: "Eggs",
            description: "Double protein gain.",
            unlocked() {return hasUpgrade("p", 11)&&hasUpgrade("p", 12)&&hasUpgrade("p", 13)},
            cost: new Decimal(10),
        },
        24: {
            title: "Energy",
            description: "Protein boosts power gain.",
            unlocked() {return hasUpgrade("p", 11)&&hasUpgrade("p", 12)&&hasUpgrade("p", 13)},
            tooltip: "1+log10(Protein+1)",
            cost: new Decimal(10),
            effect() {
                return player[this.layer].points.add(1).log(10).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
})
addLayer("ACH", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
    }},
    tooltip: "",
    color: "#f5c542",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "", // Name of prestige currency
    baseResource: "human powers", // Name of resource prestige is based on
    baseAmount() {return player.points.times(1/100000)}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    achievements: {
        11: {
            name: "Strength of a baby.",
            goalTooltip: "Obtain a tiny amount of power.",
            tooltip: "Reach 100 power.",
            done() { return player.points.gte(100)},
        },
        12: {
            name: "Strength of a kid.",
            goalTooltip: "Obtain a small amount of power.",
            tooltip: "Reach 1000 power.",
            done() { return player.points.gte(1000)},
        },
        13: {
            name: "Strength of a teen.",
            goalTooltip: "Obtain a low amount of power.",
            tooltip: "Reach 5000 power.",
            done() { return player.points.gte(5000)},
        },
        14: {
            name: "Strength of an adult.",
            goalTooltip: "Obtain some power.",
            tooltip: "Reach 100000 power.",
            done() { return player.points.gte(100000)},
        },
        21: {
            name: "Superhuman",
            goalTooltip: "Obtain a large amount of power.",
            tooltip: "Reach 1e10 power. That's 10 times stronger than a normal human.",
            done() { return player.points.gte(10**10)},
        },
    },
})