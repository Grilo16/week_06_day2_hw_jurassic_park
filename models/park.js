const Park = function (parkName, ticketPrice){
    this.parkName = parkName
    this.ticketPrice = ticketPrice
    this.dinosaurs = []
}

Park.prototype.addDinosaur = function(dinosaur){
    this.dinosaurs.push(dinosaur)
};

Park.prototype.removeDinosaur = function(dinosaur){
    const dinosaurIndex = this.dinosaurs.indexOf(dinosaur)
    this.dinosaurs.splice(dinosaurIndex, 1)
};

Park.prototype.getMostPopularDino = function(){
    let mostPopularDino;
    let peopleAttracted = 0
    for (const dinosaur of this.dinosaurs){
        if (dinosaur.guestsAttractedPerDay > peopleAttracted){
            mostPopularDino = dinosaur
            peopleAttracted = dinosaur.guestsAttractedPerDay
        }
    }
    return mostPopularDino
};

Park.prototype.getDinoBySpecies = function(specie){
    let dinosBySpecies = []
    for (const dinosaur of this.dinosaurs){
        if (dinosaur.species === specie){
            dinosBySpecies.push(dinosaur)
        };
    };
    return dinosBySpecies
};

Park.prototype.getAvgDailyVisits = function(){
    let dailyAvgVisits = 0
    for (dinosaur of this.dinosaurs){
        dailyAvgVisits += dinosaur.guestsAttractedPerDay
    };
    return dailyAvgVisits
};

Park.prototype.getYearlyAvgVisitors = function(){
    return this.getAvgDailyVisits()*365
};

Park.prototype.getYearlyRevenue = function(){
    return this.getYearlyAvgVisitors() * this.ticketPrice
};

Park.prototype.removeBySpecies = function(specie){
    for (const dino of this.dinosaurs){
        if (dino.species === specie){
            this.removeDinosaur(dino)
        };
    };
};

Park.prototype.countByDietDict = function(){
    let output = {}
    for (dino of this.dinosaurs){
        if (output[dino.diet] === undefined){
            output[dino.diet] = 1;
        }else{
            output[dino.diet] += 1
        };
    };
    return output
};


module.exports = Park