/* �����T���l�C���\���v���O�C�� for jQuery
2009.1 By KaZuhiro FuRuhata  */
$.fn.thumbnail = function(baseURL){
    var serverURL = "http://capture.heartrails.com/320x240/round/border/shadow?";
    return this.each(function(){
        $(this).hover(
            function(e){
                var url = $(this).attr("href");
                $("#jqThumbnail").attr("src",serverURL+url);
                $("#jqThumbnail").css("left",e.pageX+10);
                $("#jqThumbnail").css("top",e.pageY+10);
                $("#jqThumbnail").show();
            },
            function(){
                $("#jqThumbnail").hide();
            }
        );
    });
}
$(function(){
    $("body").append("<img src='' id='jqThumbnail' width='320' height='240' style='position:absolute;display:none'>");
    /*$("a").thumbnail();*/ //�S�Ă�a�^�O�ɓK��
    $("a.thumb").thumbnail(); //a�^�O��class��thumb�Ǝw�肵�����̂����T���l�C����\��
});