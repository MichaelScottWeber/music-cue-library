
const mongoose = require("mongoose");
const Song = require("./models/song");
const Comment   = require("./models/comment");

const data = [
  {
    title: "Adventures in the Western Wood",
    image: "https://images.unsplash.com/photo-1455885661740-29cbf08a42fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description: "Magical and mysterious, Adventures in the Western Woods is a cinematic orchestral piece that uses soft pizzicatos, jaunty woodwinds, and lush strings to create a world of wonder.",
    tags: "orchestra, cinematic, magic, forest, strings, adventure, Danny Elfman, pizzicato, lush, vibrant, wonder, mysterious, woodwinds, piano, brass, instrumental, soundtrack, hollywood, dynamic",
    audio: "https://s3.us-east-2.amazonaws.com/michael-weber-music-cues/Adventures-in-the-Western-Woods.mp3"
  },
  {
    title: "Mountain Shade",
    image: "https://images.unsplash.com/photo-1479708393961-bbdb87fd2514?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description: "Mountain Shade is an indie folk instrumental track that uses banjo, acoustic guitar, and stomps and claps to evoke feelings of grandeur and resolution.",
    tags: "Indie, folk, natural, organic, mountains, summer, outdoors, acoustic, guitar, piano, stomps, claps, slow, big, resolution, epic, percussion",
    audio: "https://s3.us-east-2.amazonaws.com/michael-weber-music-cues/Mountain-Shade.mp3"
  },
  {
    title: "Rev Me Up",
    image: "https://images.unsplash.com/photo-1494598986508-74f9d1f44582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description: "Rev Me Up is a garage rock instrumental track filled with searing guitar leads and pounding drums.  The perfect track to add attitude and excitement to your production!",
    tags: "rock, hard rock, garage, guitar, distortion, fuzz, drums, bass, riff, bikers, queens of the Stone Age, QOTSA, Josh Homme, cars, motorcycles, badass, energy, hitting the road, history channel, discovery channel, cruising, Eagles of Death Metal, edgy, aggressive, rebellious, fast, sports",
    audio: "https://s3.us-east-2.amazonaws.com/michael-weber-music-cues/Rev-Me-Up.mp3"
  },
];

function seedDB(){
   //Remove all songss
   Song.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed songss!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add some songs
            data.forEach(function(seed){
                Song.create(seed, function(err, song){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a song");
                        //create a comment
                        Comment.create(
                            {
                                text: "Cool tune, needs more blast beats",
                                author: "d00d"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    song.comments.push(comment);
                                    song.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
};

module.exports = seedDB;
