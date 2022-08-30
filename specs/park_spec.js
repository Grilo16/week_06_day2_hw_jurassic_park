const assert = require('assert');
const Park = require('../models/park.js');
const Dinosaur = require('../models/dinosaur.js');

describe('Park', function() {
  let park;
  let chicken;
  let pidgeon;
  beforeEach(function () {
    park = new Park("South", 69)
    chicken = new Dinosaur("Chicken", "carnivore", 420)
    pidgeon = new Dinosaur("Pidgeon", "carnivore", 69)

  })

  it('should have a name', function(){
    const actualName = park.parkName
    assert.equal(actualName, "South")
  });

  it('should have a ticket price', function(){
    const actualTicketPrice = park.ticketPrice
    assert.strictEqual(actualTicketPrice, 69)
  });

  it('should have a collection of dinosaurs', function(){
    const dinosaurs = park.dinosaurs
    assert.deepStrictEqual(dinosaurs, [])
  });

  describe("Test add and remove methods", function(){

    
    it('should be able to add a dinosaur to its collection', function(){
      park.addDinosaur(chicken)
      const dinosaurList = park.dinosaurs
      assert.deepStrictEqual(dinosaurList, [chicken]) 
      
    });
    
    it('should be able to remove a dinosaur from its collection', function(){
      park.addDinosaur(chicken)
      park.removeDinosaur(chicken)
      const dinosaurList = park.dinosaurs
      assert.deepStrictEqual(dinosaurList, []) 
      
    });
  });
  describe("Test other park methods", function(){
    beforeEach(function(){
      park.addDinosaur(chicken)
      park.addDinosaur(pidgeon)      
    });
    
    
    it('should be able to find the dinosaur that attracts the most visitors', function(){
      const mostPopularDino = park.getMostPopularDino()
      assert.deepStrictEqual(mostPopularDino, chicken)
    });
    
    
    it('should be able to find all dinosaurs of a particular species', function(){
      park.addDinosaur(chicken)
      const dinoBySpecies = park.getDinoBySpecies("Chicken")
      assert.deepStrictEqual(dinoBySpecies, [chicken, chicken])
      
      
    });
    
    it('should be able to calculate the total number of visitors per day', function(){
      const dailyVisitors = park.getAvgDailyVisits()
      assert.strictEqual(dailyVisitors, 489)
    });
    
    it('should be able to calculate the total number of visitors per year', function(){
      const yearlyAvgVisitors = park.getYearlyAvgVisitors()
      assert.strictEqual(yearlyAvgVisitors, 178485)
    });
    
    it('should be able to calculate total revenue for one year', function(){
      const yearlyRevenue = park.getYearlyRevenue()
      assert.strictEqual(yearlyRevenue, 12315465 )
    });
    
    describe("Extension tests", function(){
      let duck;
      let hoatzin; 
      beforeEach(function(){
        duck  = new Dinosaur("Duck", "omnivore", 42069)
        hoatzin  = new Dinosaur("Opisthocomidae", "herbivore", 3)
        park.addDinosaur(chicken)
        park.addDinosaur(duck)
        park.addDinosaur(hoatzin)
        park.addDinosaur(chicken)
      });
      
      it("Should remove all dinosaurs by species", function(){
        park.removeBySpecies("Chicken")
        const currentDinos = park.dinosaurs
        assert.deepStrictEqual(currentDinos, [pidgeon, duck, hoatzin])
      });

      it("Should provide a dict containing all diet types and dinos that have them", function(){
        const countByDietDict = park.countByDietDict()
        assert.deepStrictEqual(countByDietDict, { 'carnivore': 4, 'herbivore': 1, 'omnivore': 1 })
      });

    });
  });
});
