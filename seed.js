const New = require('./models/New');
const data = [{
    newImage: "1.png",
    newHeading: "Great Tips To Earn More Money From Digital Industry",
    newContent: "Facilisis arcu ligula, malesuada id tincidunt laoreet, facilisis at justo id tincidunt. Facilisis arcu ligula, malesuada id tincidunt laoreet, facilisis at justo id tincidunt. Facilisis arcu ligula, malesuada id tincidunt laoreet, facilisis at justo id tincidunt."
  },{
    newImage: "2.png",
    newHeading: "The Billionaire Guide On Design That will Get You Rich",
    newContent: "Facilisis arcu ligula, malesuada id tincidunt laoreet, facilisis at justo id tincidunt. Facilisis arcu ligula, malesuada id tincidunt laoreet, facilisis at justo id tincidunt. Facilisis arcu ligula, malesuada id tincidunt laoreet, facilisis at justo id tincidunt."
  },{
    newImage: "3.png",
    newHeading: "Making Peace With The Feast Or Famine Of Freelancing",
    newContent: "Facilisis arcu ligula, malesuada id tincidunt laoreet, facilisis at justo id tincidunt. Facilisis arcu ligula, malesuada id tincidunt laoreet, facilisis at justo id tincidunt. Facilisis arcu ligula, malesuada id tincidunt laoreet, facilisis at justo id tincidunt."
  }]

  data.forEach(async (obj) => {
      await new New({
          newImage: obj.newImage,
          newHeading: obj.newHeading,
          newContent: obj.newContent
      }).save()
  })