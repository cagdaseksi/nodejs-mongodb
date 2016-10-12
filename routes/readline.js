var rl = require('readline');

var prompts = rl.createInterface(process.stdin, process.stdout);

prompts.question("Her gün kaç porsiyon meyve yiyorsun? ", function(servings){

  var message = '';

    if(servings < 5)
    {
        message = "daha fazla yemelisin " + (5 - servings) + " daha fazla";
    }else {
      message = "aynen hacı";
    }

    console.log(message);

    process.exit();

})
