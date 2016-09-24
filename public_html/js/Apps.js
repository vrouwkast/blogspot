var getCookie = function (cname)
    {
        if (document.cookie.length > 0)
        {
            cstart = document.cookie.indexOf(cname + "=");
            if (cstart != -1)
            {
                cstart = cstart + cname.length+1;
                cend = document.cookie.indexOf (";",cstart);
                if (cend == -1)
                    cend = document.cookie.length;
                return unescape (document.cookie.substring (cstart,cend));
            }
        }
        return "";
    };
    
var setCookie = function (cname,cstr,chrs)
    {
        var cdate = new Date();
        cdate.setTime(cdate.getTime()+(chrs*60*60*1000));
        document.cookie = cname + "=" + escape(cstr) + "; path=/" + ((chrs==null) ? "" : ";expires="+cdate.toGMTString());
    };    

//var fs = "http://localhost/onlinestoreblogger/public_html/";
var fs = "http://www.googledrive.com/host/0B2_jLO3lNcKXfkw3VXlMdVJ6akNZVlFoOThmZHhVb1Ewd0JvQWtXS2Rad1JrNmpzclhGaFU/public_html/";
var mr = "30";

var GETCJSONCAT = function (callback){
    $.ajax({
        type: 'GET',
        url: fs+"json/category.js?callback=?",
        async: false,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
            callback(json);
            //console.log(json);
        },
        error: function(e) {
            console.log(e.message);
        }
    });
};
    
$(document).ready(function(){ GETCJSONCAT(function(json){
    var s = '';
    for (var y in json){
        s +=    '<div class="col-md-12 col-cat">'+
                '<h1>'+json[y]['nm']+'</h1>';
        for (var i=0; i<json[y]['cat'].length; i++) {
            s +=    '<a href="search/label/'+y+' '+json[y]['cat'][i]['caturl']+'?max-results='+mr+'">'+
                        '<div class="col-md-3 cat-itm">'+
                            '<div class="cat-itm-img">'+
                                '<img src="'+fs+json[y]['cat'][i]['catlogo']+'" />'+
                            '</div>'+
                            '<span class="cat-itm-nm">'+json[y]['cat'][i]['catnm']+'</span>'+
                        '</div>'+
                    '</a>'; 
        }
        s +=    '</div>';
    }
    $('#ldcat').empty().append(s);
});});


function RESIZEIMG(image_url,post_title){
    var image_size=000;
    var show_default_thumbnail=true;
    var default_thumbnail="http://4.bp.blogspot.com/-2dgF7Aou1y8/UTlOhDifkHI/AAAAAAAABY4/jvPmlxkvhZg/s000/default.png";
    if(show_default_thumbnail == true && image_url == "") image_url= default_thumbnail;
    image_tag='<img src="'+image_url.replace('/s72-c/','/s'+image_size+'-c/')+'" alt="'+post_title+'"/>';
    if(image_url!="") return image_tag; else return "";
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
var page = getParameterByName('p');

function TABHOME(p) {
    if (p === '' || p === 'undefined')
        $('#tphome').addClass('active');
    else if (p === 'category')
        $('#tpcategory').addClass('active');
};
$(document).ready(function(){ TABHOME(page); });

function PRICEPRODUCT(){
    var d = $("#data_price").text();
    return d;
};

function DESCPRODUCT(){
    var d = $("#data_description").text();
    return SPLITTXT(d,'-','<br>','\n');
};

function SPLITTXT(txt,glyp,del,obj){
    var t = txt.split(obj);
    var h = '';
    for (var i=0;i<t.length; i++) {
        h += glyp+' '+t[i]+del;
    }
    return h;
};
$(document).ready(function(){
    function LOADIMGPRD(d){
        var imgs = $( "img" );
        var a = $( ".post_content" ).find( imgs );
        var h = '';
        for (var i=0;i<a.length; i++) {
            if (i===d) var act = 'active';  else var act = '';
            var src = $(a[i]).attr('src').replace('/s200/','/s1600/');
            h += '<img src="'+src+'" class="'+act+' prd-img-i prd-img-'+i+'" />';
        }
        h +=    BTNNEXTPREV(a.length);
        $('#loadImg').empty().append(h);
        $(document).on('click','.btn-next', function(){
            $('.prd-img-i').removeClass('active');
            var xyz = parseInt($('.imgxyz').text());
            $('.imgxyz').empty().append(xyz+1);
            $('.prd-img-'+(xyz+1)).addClass('active');
            ACTBTN(xyz+1,a.length);
        });
        $(document).on('click','.btn-preview', function(){
            $('.prd-img-i').removeClass('active');
            var xyz = $('.imgxyz').text();
            $('.imgxyz').empty().append((xyz-1));
            $('.prd-img-'+(xyz-1)).addClass('active');
            ACTBTN(xyz-1,a.length);
        });
        ACTBTN(0,a.length);
    };
    LOADIMGPRD(0);
    
    function BTNNEXTPREV(l){
        var s = '<button class="btn btn-preview"><span class="glyphicon glyphicon-menu-left"></span></button>'+
                '<span class="imgxyz" style="display:none;">0</span>'+
                '<button class="btn btn-next"><span class="glyphicon glyphicon-menu-right"></span></button>';
        return s;
    };
    
    function ACTBTN(x,l){
        if (x === l-1) $('.btn-next').css('display', 'none'); else $('.btn-next').css('display', 'initial');
        if (x === 0) $('.btn-preview').css('display', 'none'); else $('.btn-preview').css('display', 'initial');
    };
    
    
/* SOCIAL MEDIA SHARE */
    
    function SOSMEDSHARE(){
        function popupwindow(url, title, w, h) {
            var left = (screen.width/2)-(w/2);
            var top = (screen.height/2)-(h/2);
            return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
        } 
        $('#fbshare').click(function(){
            popupwindow('https://www.facebook.com/sharer/sharer.php?u='+location.href,'facebook',600,400);
        });
        $('#twshare').click(function(){
            popupwindow('https://twitter.com/home?status='+$('title').text()+' '+location.href,'twitter',700,500);
            
        });
        $('#gpshare').click(function(){
            popupwindow('https://plus.google.com/share?url='+location.href,'googleplus',600,400);
        });
    };
    SOSMEDSHARE();
    
/* ALERT */    
    $("#alerttop").hide();
    
/* ADD TO CART*/

    function ADDTOCART(){
        var v = $('#addtocart').val();
        var cc = getCookie("CART");
        var arr =  new Array();
        if (cc === '' || cc === undefined) {
            arr.push(v);
            setCookie("CART",arr,1);
        } else {
            arr.push(cc);
            arr.push(v);
            setCookie("CART",arr,1);
        }
        CHECKONCART();
        COUNTPRODUCTONCART();
        $("#alerttop").addClass("alert-success");
        $("#alertmsg").empty().append("Added to cart.");
        $("#alerttop").alert();
        $("#alerttop").fadeTo(2000, 500).slideUp(500, function(){
            $("#alerttop").removeClass("alert-success");
            $("#alerttop").hide();
        });
        console.log(getCookie("CART"));
    };
    
    $(document).on('click','#addtocart',function(){
        ADDTOCART();
    });
        
});

/* EMPTY CART */

    function EMPTYCART(){
        setCookie("CART","",-1);
        $('#loadcart').empty().append("Removing ...");
        $('#loadcart').empty().append(GETCARTDATA());
    };
    
    $(document).on('click','#emptycart',function(){
        EMPTYCART();
        CHECKONCART();
        COUNTPRODUCTONCART();
    });

/* CHECK ON CART */    
    
    function CHECKONCART(){
        var id = $('#addtocart').val();
        var a = getCookie("CART").split(",");
        var arr = [];
        for(var k = 0; k < a.length; ++k){
            arr.push(a[k]);
        }
        if (arr.indexOf(id) > -1) {
            var count = [];
            for(var j = 0; j < arr.length; ++j){
                if(arr[j] === id){
                    count.push(j);
                }
            }
            $('#addtocart').text(count.length+' pc on cart. Add more');
        } else {
            $('#addtocart').text('Add to cart');
        }
    };

/* TROLLEY */
    
    function GETPOSTID(bid,pid){
        var b = bid.split("tag:blogger.com,1999:blog-");
        var p = pid.split("tag:blogger.com,1999:blog-"+b[1]+".post-");
        return p[1];
    };
    
    function CARTVALUE(json) {
        var a = getCookie("CART").split(",");
        var arr = [];
        for(var k = 0; k < a.length; ++k){
            arr.push(a[k]);
        }
        var e = json.feed.entry;
        var s = '';
            for(var i=0;i<e.length;i++){
                var pid = GETPOSTID(json.feed.id.$t,json.feed.entry[i].id.$t);
                if (arr.indexOf(pid) > -1) {
                    var count = [];
                    for(var j = 0; j < arr.length; ++j){
                        if(arr[j] === GETPOSTID(json.feed.id.$t,json.feed.entry[i].id.$t)){
                            count.push(j);
                        }
                    }
                    s +=    '<div class="cart-item media">'+
                            '<div class="media-left"><img class="media-object" src="'+json.feed.entry[i].media$thumbnail.url+'" /></div>'+
                            '<div class="media-body">'+
                            '<h4 class="media-heading">'+json.feed.entry[i].title.$t+'</h4>'+
                            '<span>'+count.length+' pc</span>'+
                            '</div>'+
                            '<button id="trashitmoncart'+pid+'" class="btn btn-primary-vk btn-trsitm"><span class="glyphicon glyphicon-trash"></span></button>'+
                            '</div>';
                    TRASHITEMONCART(pid);
                }
            }
            if (getCookie("CART") === '') {
                $('#checkoutnorder').css('display','none');
                s += '<span>Your shopping cart is empty.</span>';
            } else {
                $('#checkoutnorder').css('display','initial');
            }
            s += '';
        $('#loadcart').append(s);
    };
    
    function TRASHITEMONCART(id){
        $(document).on('click','#trashitmoncart'+id,function(){ 
            var a = getCookie("CART").split(",");
            var arr = [];
            for(var k = 0; k < a.length; ++k){
                if (a[k] !== id)
                    arr.push(a[k]);
            }
            setCookie("CART",arr,1);
            GETCARTDATA();
            CHECKONCART();
            COUNTPRODUCTONCART();
        });
    };
    
    function GETCARTDATA(){
        $('#loadcart').empty().append('Loading ...');
        var t = '<script src="/feeds/posts/default/?alt=json-in-script&amp;callback=CARTVALUE" type="text/javascript"></script>';
        $('#loadcart').empty().append(t);
    };
    
    $(document).on('click','#btntrolley',function(){ 
        $('#myModalTrolley').modal('show');
        GETCARTDATA();
    });


/* CHECK OUT AND ORDER */
    
    function SENDORDER(){
        var blogId = '4932272821615391641';
        var contactFormMessageSendingMsg ='Sending...';
        var contactFormMessageSentMsg = 'Your order has been sent.';
        var contactFormMessageNotSentMsg = 'Message could not be sent. Please try again later or try order by SMS.';
        var contactFormEmptyMessageMsg ='Message field cannot be empty.';
        var contactFormInvalidEmailMsg = 'A valid email is required.';
        var widgetLoaded=false;
        if(widgetLoaded == false) {
            _WidgetManager._RegisterWidget('_ContactFormView', new _WidgetInfo('ContactForm2', 'sidebar', null, document.getElementById('ContactForm2'), {
                'contactFormMessageSendingMsg': contactFormMessageSendingMsg , 
                'contactFormMessageSentMsg': contactFormMessageSentMsg , 
                'contactFormMessageNotSentMsg': contactFormMessageNotSentMsg , 
                'contactFormInvalidEmailMsg': contactFormInvalidEmailMsg , 
                'contactFormEmptyMessageMsg': contactFormEmptyMessageMsg , 
                'title': 'VROUWKAST ORDER', 
                'blogId': blogId, 
                'contactFormNameMsg': 'Name', 
                'contactFormEmailMsg': 'Email', 
                'contactFormMessageMsg': 'Message', 
                'contactFormSendMsg': 'Send', 
                'submitUrl': 'https://www.blogger.com/contact-form.do'}, 
            'displayModeFull'));
            widgetLoaded=true;
            document.getElementById('ContactForm2_contact-form-submit').click();
        }
        return true;
    };
    
    $(document).on('click','#ContactForm2_contact-form-submit',function(){
        SENDORDER();
    });
    
    $(document).on('click','#closechkout',function(){
        if ($('#ContactForm2_contact-form-email-message').val() === ''){
            EMPTYCART();
            CHECKONCART();
            COUNTPRODUCTONCART();
        }
    });
    
    function CARTVALUEFORORDER(json){
        var a = getCookie("CART").split(",");
        var arr = [];
        for(var k = 0; k < a.length; ++k){
            arr.push(a[k]);
        }
        var e = json.feed.entry;
        var s = '';
            for(var i=0;i<e.length;i++){
                if (arr.indexOf(GETPOSTID(json.feed.id.$t,json.feed.entry[i].id.$t)) > -1) {
                    s +=    '*) '+json.feed.entry[i].title.$t+' (';
                    var count = [];
                    for(var j = 0; j < arr.length; ++j){
                        if(arr[j] === GETPOSTID(json.feed.id.$t,json.feed.entry[i].id.$t)){
                            count.push(j);
                        }
                    }
                    s += count.length;
                    s +=    ') \n';
                }
            }
        $('#ContactForm2_contact-form-email-message').val(s);
    };
    
    $(document).on('click','#checkoutnorder',function(){
        $('#myModalTrolley').modal('hide');
        $('#myModalCheckoutAndOrder').modal('show');
        var t = '<script src="/feeds/posts/default/?alt=json-in-script&amp;callback=CARTVALUEFORORDER" type="text/javascript"></script>';
        $('#loadcartvaluefororder').empty().append(t);
    });
    
/* COUNT PRODUCT ON CART */

    function COUNTPRODUCTONCART(){
        var a = getCookie("CART").split(",");
        if (getCookie("CART") === '')
            $('#prdnum').empty().append('0');
        else
            $('#prdnum').empty().append(a.length);
    };
    $(document).ready(function(){
        COUNTPRODUCTONCART();
    });