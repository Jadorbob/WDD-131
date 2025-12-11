const Submarine = {
    depth: 0,

    fuel: 1000,
    fuelMax: 1000,

    boiler: 100,
    boilerMax: 900,

    oxygen: 50,
    oxygenMax: 100,

    depthProgressRate: 15,

    pressureToAirRatio: 5,
    pressureToTravel: 50,

    boilerDecay: 2,
    oxygenDecay: 1,
    
    boilerRefillRate: 102,
    boilerFuelCostRate: 30,

    oxygenRefillRate: 10,

    isTraveling: null,
    isBoilerFilling: null,
    isOxygenFilling: null,
    isBoilerDecaying: null,
    isOxygenDecaying: null,

    
    startStatDecay() {
        this.startBoilerDecay();
        this.startOxygenDecay();
    },

    startBoilerDecay() {
        if (this.isBoilerDecaying) return;

        this.isBoilerDecaying = setInterval(() => {
            this.boiler = Math.max(0, this.boiler - this.boilerDecay);
            this.updateUI();
        }, 700);
    },

    startOxygenDecay() {
        if (this.isOxygenDecaying) return;

        this.isOxygenDecaying = setInterval(() => {
            this.oxygen = Math.max(0, this.oxygen - this.oxygenDecay);
            this.updateUI();
        }, 700);
    },
    
    startTravel() {
        if (this.isTraveling) return;
        
        this.isTraveling = setInterval(() => {
            
            if (this.boiler > 0) {
                this.depth += this.depthProgressRate / 10;
                const boilerUsed = this.pressureToTravel / 10;
                
                this.boiler = Math.max(0, this.boiler - boilerUsed);
            }
            
            this.updateUI();
        }, 100);
    },
    
    startBoilerRefill() {
        if (this.isBoilerFilling) return;

        this.stopBoilerDecay();

        this.isBoilerFilling = setInterval(() => {
            const fuelUsed = this.boilerFuelCostRate / 10;
            const fillAmt = this.boilerRefillRate / 10;
            
            if (this.fuel <= 0) return;
            
            if (this.fuel - fuelUsed >= 0) {
                this.fuel -= fuelUsed;
                this.boiler = Math.min(this.boiler + fillAmt, this.boilerMax);
            }
            
            this.updateUI();
        }, 100);
    },
    
    startOxygenRefill() {
        if (this.isOxygenFilling) return;

        this.stopOxygenDecay();

        this.isOxygenFilling = setInterval(() => {
            const fillAmt = this.oxygenRefillRate / 10;
            const pressureUsed = this.pressureToAirRatio / 10
            
            if (this.boiler > 0) {
                this.oxygen = Math.min(this.oxygen + fillAmt, this.oxygenMax);
                this.boiler = Math.max(0, this.boiler - pressureUsed);
            } else {
                this.stopOxygenRefill();
            }
            this.updateUI();
        }, 100);
    },
    
    stopBoilerDecay() {
        clearInterval(this.isBoilerDecaying);
        this.isBoilerDecaying = null;
    },

    stopOxygenDecay() {
        clearInterval(this.isOxygenDecaying);
        this.isOxygenDecaying = null;
    },

    stopTravel() {
        clearInterval(this.isTraveling);
        this.isTraveling = null;
    },

    stopBoilerRefill() {
        clearInterval(this.isBoilerFilling);
        this.isBoilerFilling = null;
        this.startBoilerDecay();
    },
    
    stopOxygenRefill() {
        clearInterval(this.isOxygenFilling);
        this.isOxygenFilling = null;
        this.startOxygenDecay();
    },

    updateUI() {
        document.querySelector(".depth-counter p:first-child").textContent = Math.floor(this.depth);
        document.querySelector(".fuel-container .stat-counter p:first-child").textContent = Math.floor(this.fuel);
        document.querySelector(".boiler-container .stat-counter p:first-child").textContent = Math.floor(this.boiler);
        document.querySelector(".oxygen-container .stat-counter p:first-child").textContent = Math.floor(this.oxygen);
    }
};

// These are for the buttons
const travelBtn = document.querySelector(".travel-container");
const boilerBtn = document.querySelector(".boiler-container");
const oxygenBtn = document.querySelector(".oxygen-container");

travelBtn.addEventListener("mousedown", () => Submarine.startTravel());
travelBtn.addEventListener("mouseup", () => Submarine.stopTravel());
travelBtn.addEventListener("mouseleave", () => Submarine.stopTravel());

boilerBtn.addEventListener("mousedown", () => Submarine.startBoilerRefill());
boilerBtn.addEventListener("mouseup", () => Submarine.stopBoilerRefill());
boilerBtn.addEventListener("mouseleave", () => Submarine.stopBoilerRefill());

oxygenBtn.addEventListener("mousedown", () => Submarine.startOxygenRefill());
oxygenBtn.addEventListener("mouseup", () => Submarine.stopOxygenRefill());
oxygenBtn.addEventListener("mouseleave", () => Submarine.stopOxygenRefill());


// -------------------------------------------------------
// Game Start



Submarine.startStatDecay();