'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash'),
    EventSchema = new Schema({
        ratings: [],
        averageRating: Number
    });


EventSchema.methods.getTotalRating = function(){
    var totalRatings = 0;

    _.each(this.ratings, function(item){
        totalRatings += item.rating;
    });

    return totalRatings;
};


EventSchema.methods.calculateAverageRating = function(){
    var totalRatings = this.getTotalRating();

    this.averageRating = totalRatings / this.ratings.length;
};

EventSchema.pre('save', function(next){


    // for (var i=0; i < this.ratings.length; i++){
    //     totalRatings += this.ratings[i].rating;
    // }
    //
    // if(this.ratings.length > 0){
    //     this.averageRating = totalRatings / this.ratings.length;
    // }else{
    //     this.averageRating = 0;
    // }
    this.calculateAverageRating();
    next();
});

module.exports = mongoose.model('Event', EventSchema);
