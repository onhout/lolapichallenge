/**
 * Created by pl on 8/28/15.
 */
$(function(){
    var rand = Math.floor(Math.random() * (4 - 1) + 1);
    $('body').css('background-image', 'url(./asset/background/'+rand+'.jpg)');
});