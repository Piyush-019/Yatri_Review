const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");



const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
       url: String,
       filename: String,
    },
    category: {
      type: String,
      enum: [
        "Trending",
        "Rooms",
        "Iconic Cities",
        "Castles",
        "Mountain Views",
        "Camping",
        "Amazing Nature",
        "Arctic",
        "Boats"
      ],
      required: true,
    },  
    price: Number,

    location: String,

    country: String,

    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],

    owner: 
        {
        type: Schema.Types.ObjectId,
        ref: "user",
        },
        
    geometry:{
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },

    
    coordinates:{
      type:[Number],
      requires:true
    }
 
});


listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id: {$in: listing.review}});
  }
});

//CREATING MODULE
const Listing = mongoose.model("Listing", listingSchema) ;

//and exporting this model to app.js with
module.exports = Listing;
