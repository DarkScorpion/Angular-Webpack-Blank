
var imageTestStyle = require('../style/image.styl')

var getImageUrl = require('../util.js').getImageUrl;

module.exports = function ($scope) {

  $scope.foodData = [
    {name:'hotdog', url: getImageUrl('hotdog.png')},
    {name:'chiken', url: getImageUrl('chiken.png')}
  ];

}
