!function(a,b){a.fn.listautowidth=function(){return this.each(function(){var b=a(this).width(),c=b/a(this).children("li").length;a(this).children("li").each(function(){var b=a(this).outerWidth(!0)-a(this).width();a(this).width(c-b)})})},b.WP_User_Frontend={init:function(){this.enableMultistep(this),a(".wpuf-form").on("click","img.wpuf-clone-field",this.cloneField),a(".wpuf-form").on("click","img.wpuf-remove-field",this.removeField),a(".wpuf-form").on("click","a.wpuf-delete-avatar",this.deleteAvatar),a(".wpuf-form").on("click","a#wpuf-post-draft",this.draftPost),a(".wpuf-form").on("click","button#wpuf-account-update-profile",this.account_update_profile),a(".wpuf-form-add").on("submit",this.formSubmit),a("form#post").on("submit",this.adminPostSubmit),b.matchMedia("(max-width: 600px)").matches&&(a("table.items-table tr td .post-edit-icon").click(function(b){b.preventDefault(),a(this).parents("tr").find(".data-column").toggleClass("flex-column"),a(this).toggleClass("toggle-icon")}),a(".wpuf-dashboard-navigation ul li:first-child").after().click(function(b){b.preventDefault(),a(".wpuf-dashboard-navigation ul li").not(":first").toggle()})),a(".wpuf-form").on("step-change-fieldset",function(a,b,c){if(wpuf_plupload_items.length)for(var d=wpuf_plupload_items.length-1;d>=0;d--)wpuf_plupload_items[d].refresh();if(wpuf_map_items.length)for(var d=wpuf_map_items.length-1;d>=0;d--)google.maps.event.trigger(wpuf_map_items[d].map,"resize"),wpuf_map_items[d].map.setCenter(wpuf_map_items[d].center)}),this.ajaxCategory(),a(':submit[name="wpuf_user_subscription_cancel"]').click(function(b){b.preventDefault(),Swal.fire({text:wpuf_frontend.cancelSubMsg,icon:"warning",showCancelButton:!0,confirmButtonColor:"#d54e21",confirmButtonText:wpuf_frontend.delete_it,cancelButtonText:wpuf_frontend.cancel_it,customClass:{confirmButton:"btn btn-success",cancelButton:"btn btn-danger"}}).then(function(b){if(!b.isConfirmed)return!1;a("#wpuf_cancel_subscription").submit()})}),this.warningOnExit(),this.handleReadOnly()},warningOnExit:function(){a('input[name="submit"], #wpuf-post-draft').on("click",function(){b.onbeforeunload=null}),a(".wpuf-form-add").on("change",function(){a(".wpuf-form-add input, .wpuf-form-add select, .wpuf-form-add textarea").each(function(c){"hidden"===a(this).attr("type")&&"submit"===a(this).attr("type")&&-1===a(this).val()||(b.onbeforeunload=function(){return"you have changes"})})})},handleReadOnly:function(){a(".wpuf-form .read-only").each(function(){a("input, select, textarea",this).each(function(){a(this).attr("disabled",!0)})})},check_pass_strength:function(){var b=a("#pass1").val();if(a("#pass-strength-result").show(),a("#pass-strength-result").removeClass("short bad good strong"),!b)return a("#pass-strength-result").html("&nbsp;"),void a("#pass-strength-result").hide();if(void 0!==wp.passwordStrength)switch(wp.passwordStrength.meter(b,wp.passwordStrength.userInputDisallowedList(),b)){case 2:a("#pass-strength-result").addClass("bad").html(pwsL10n.bad);break;case 3:a("#pass-strength-result").addClass("good").html(pwsL10n.good);break;case 4:a("#pass-strength-result").addClass("strong").html(pwsL10n.strong);break;case 5:a("#pass-strength-result").addClass("short").html(pwsL10n.mismatch);break;default:a("#pass-strength-result").addClass("short").html(pwsL10n.short)}},enableMultistep:function(c){var d=this,e=0,f=a(':hidden[name="wpuf_multistep_type"]').val();if(null!=f){if(a("fieldset.wpuf-multistep-fieldset").find(".wpuf-multistep-prev-btn").first().remove(),a("fieldset.wpuf-multistep-fieldset").find(".wpuf-multistep-next-btn").last().remove(),a(".wpuf-form fieldset").removeClass("field-active").first().addClass("field-active"),"progressive"==f&&0!=a(".wpuf-form .wpuf-multistep-fieldset").length){a("fieldset.wpuf-multistep-fieldset legend").first();a(".wpuf-multistep-progressbar").html('<div class="wpuf-progress-percentage"></div>');var g=a(".wpuf-multistep-progressbar"),h=a(".wpuf-progress-percentage");a(".wpuf-multistep-progressbar").progressbar({change:function(){h.text(g.progressbar("value")+"%")}}),a(".wpuf-multistep-fieldset legend").hide()}else a(".wpuf-form").each(function(){var b=a(this),c=a(".wpuf-multistep-progressbar",b),d="";c.addClass("wizard-steps"),d+='<ul class="wpuf-step-wizard">',a(".wpuf-multistep-fieldset",this).each(function(){d+="<li>"+a.trim(a("legend",this).text())+"</li>",a("legend",this).hide()}),d+="</ul>",c.append(d),a(".wpuf-step-wizard li",c).first().addClass("active-step"),a(".wpuf-step-wizard",c).listautowidth()});this.change_fieldset(e,f),a("fieldset .wpuf-multistep-prev-btn, fieldset .wpuf-multistep-next-btn").click(function(g){if(a(this).hasClass("wpuf-multistep-next-btn")){0!=d.formStepCheck("",a(this).closest("fieldset"))&&c.change_fieldset(++e,f)}else a(this).hasClass("wpuf-multistep-prev-btn")&&c.change_fieldset(--e,f);var h=a("form.wpuf-form-add"),i=h.offset().top;return b.scrollTo({top:i-32,behavior:"smooth"}),!1})}},change_fieldset:function(b,c){var d=a("fieldset.wpuf-multistep-fieldset").eq(b);a("fieldset.wpuf-multistep-fieldset").removeClass("field-active").eq(b).addClass("field-active"),a(".wpuf-step-wizard li").each(function(){a(this).index()<=b?"step_by_step"==c?a(this).addClass("passed-wpuf-ms-bar"):a(".wpuf-ps-bar",this).addClass("passed-wpuf-ms-bar"):"step_by_step"==c?a(this).removeClass("passed-wpuf-ms-bar"):a(".wpuf-ps-bar",this).removeClass("passed-wpuf-ms-bar")}),a(".wpuf-step-wizard li").removeClass("wpuf-ms-bar-active active-step completed-step"),a(".passed-wpuf-ms-bar").addClass("completed-step").last().addClass("wpuf-ms-bar-active"),a(".wpuf-ms-bar-active").addClass("active-step");var e=a("fieldset.wpuf-multistep-fieldset").eq(b).find("legend").text();if(e=a.trim(e),"progressive"==c&&0!=a(".wpuf-form .wpuf-multistep-fieldset").length){var f=100*(b+1)/a("fieldset.wpuf-multistep-fieldset").length,f=Number(f.toFixed(2));a(".wpuf-multistep-progressbar").progressbar({value:f}),a(".wpuf-progress-percentage").text(e+" ("+f+"%)")}a(".wpuf-form").trigger("step-change-fieldset",[b,d])},ajaxCategory:function(){a(".category-wrap").on("change",".cat-ajax",function(){var b=a(this).data("form-id");currentLevel=parseInt(a(this).parent().attr("level")),WP_User_Frontend.getChildCats(a(this),currentLevel+1,"category",b)})},getChildCats:function(b,c,d,e){var f=a(b).val(),g="wpuf-category-dropdown-lvl-"+c,d=void 0!==d?d:"category",h=a(b).siblings("span").data("taxonomy");a.ajax({type:"post",url:wpuf_frontend.ajaxurl,data:{action:"wpuf_get_child_cat",catID:f,nonce:wpuf_frontend.nonce,field_attr:h,form_id:e},beforeSend:function(){a(b).parent().parent().next(".loading").addClass("wpuf-loading")},complete:function(){a(b).parent().parent().next(".loading").removeClass("wpuf-loading")},success:function(e){a(b).parent().nextAll().each(function(){a(this).remove()}),""!=e&&(a(b).parent().addClass("hasChild").parent().append('<div id="'+g+'" level="'+c+'"></div>'),b.parent().parent().find("#"+g).html(e).slideDown("fast")),a(document).trigger("wpuf-ajax-fetched-child-categories",g,c,d)}})},cloneField:function(b){b.preventDefault();var c=a(this).closest("tr"),d=c.clone();d.find("input").val(""),d.find(":checked").attr("checked",""),c.after(d)},removeField:function(){var b=a(this).closest("tr");b.siblings().addBack().length>1&&b.remove()},adminPostSubmit:function(b){b.preventDefault();var c=a(this);if(WP_User_Frontend.validateForm(c))return!0},draftPost:function(b){b.preventDefault();var c=a(this),d=a(this).closest("form"),e=d.serialize()+"&action=wpuf_draft_post",f=d.find('input[type="hidden"][name="post_id"]').val(),g=[];a(".wpuf-rich-validation").each(function(b,c){var c=a(c),d=c.data("id"),e=c.data("name"),f=a.trim(tinyMCE.get(d).getContent());g.push(e+"="+encodeURIComponent(f))}),e=e+"&"+g.join("&"),c.after(' <span class="wpuf-loading"></span>'),a.post(wpuf_frontend.ajaxurl,e,function(b){if(void 0===f){var e='<input type="hidden" name="post_id" value="'+b.post_id+'">';e+='<input type="hidden" name="post_date" value="'+b.date+'">',e+='<input type="hidden" name="post_author" value="'+b.post_author+'">',e+='<input type="hidden" name="comment_status" value="'+b.comment_status+'">',d.append(e)}c.next("span.wpuf-loading").remove(),c.after('<span class="wpuf-draft-saved">&nbsp; '+b.message+"</span>"),a(".wpuf-draft-saved").delay(2500).fadeOut("fast",function(){a(this).remove()})})},account_update_profile:function(b){b.preventDefault();var c=a(this).closest("form");a.post(wpuf_frontend.ajaxurl,c.serialize(),function(a){a.success?(c.find(".wpuf-error").hide(),c.find(".wpuf-success").show()):(c.find(".wpuf-success").hide(),c.find(".wpuf-error").show(),c.find(".wpuf-error").text(a.data))})},formStepCheck:function(a,b){var c=b,d=(c.find("input[type=submit]"),WP_User_Frontend.validateForm(c));return 0==d&&WP_User_Frontend.addErrorNotice(self,"bottom"),d},formSubmit:function(c){c.preventDefault();var d=a(this),e=d.find("input[type=submit]");form_data=WP_User_Frontend.validateForm(d),form_data&&(d.find("li.wpuf-submit").append('<span class="wpuf-loading"></span>'),e.attr("disabled","disabled").addClass("button-primary-disabled"),a.post(wpuf_frontend.ajaxurl,form_data,function(c){if(c.success)a("body").trigger("wpuf:postform:success",c),1==c.show_message?(d.before('<div class="wpuf-success">'+c.message+"</div>"),d.slideUp("fast",function(){d.remove()}),a("html, body").animate({scrollTop:a(".wpuf-success").offset().top-100},"fast")):b.location=c.redirect_to;else{if(void 0!==c.type&&"login"===c.type)return void(confirm(c.data.error)?b.location=c.redirect_to:(e.removeAttr("disabled"),e.removeClass("button-primary-disabled"),d.find("span.wpuf-loading").remove()));d.find(".g-recaptcha").length>0&&grecaptcha.reset(),Swal.fire({html:c.data.error,icon:"warning",showCancelButton:!1,confirmButtonColor:"#d54e21",confirmButtonText:"OK",customClass:{cancelButton:"btn btn-danger"}}),e.removeAttr("disabled")}e.removeClass("button-primary-disabled"),d.find("span.wpuf-loading").remove()}))},isTelephoneField:function(b){return a(b).hasClass("wpuf_telephone")&&"yes"===a(b).data("show-list")},validateForm:function(c){var d=[],e=[];if(WP_User_Frontend.removeErrors(c),WP_User_Frontend.removeErrorNotice(c),c.find("input:visible, textarea:visible, select:visible, div.br-widget:visible, .wpuf-rich-validation:visible, div.wpuf-attachment-upload-filelist:visible").each(function(f,g){var h="",i=a(g).data("type"),j=a(g).data("required");switch(i){case"rich":var k=a(g).data("id"),l=a(g).data("name");w=a.trim(tinyMCE.get(k).getContent()),"yes"===j&&""===w&&e.push({type:"required",container:g});var m=WP_User_Frontend.editorLimit.isRestrictionFailed(g);if(m){e.push({type:"limit",container:g});break}var n=WP_User_Frontend.editorContainingShortcode(g);if(n.shortcodeFound){e.push({type:"custom",container:g,message:wpuf_frontend.protected_shortcodes_message.replace("%shortcode%","["+n.shortcode+"]")});break}d.push(l+"="+encodeURIComponent(w));break;case"textarea":case"text":if(w=a.trim(a(g).val()),"yes"===j&&""===w){e.push({type:"required",container:g});break}var m=WP_User_Frontend.editorLimit.isRestrictionFailed(g);if(m){e.push({type:"limit",container:g});break}if(WP_User_Frontend.isTelephoneField(g)){var o=b.intlTelInputGlobals.getInstance(g);if(""!==o.getNumber()&&!o.isValidNumber()){e.push({type:"validation",container:g});break}var p=a(g).attr("name"),q=o.getNumber();a("<input>").attr("type","hidden").attr("name",p).attr("value",q).appendTo(c);break}break;case"url":if(w=a.trim(a(g).val()),"yes"===j&&""===w){e.push({type:"required",container:g});break}if(""!==w&&!WP_User_Frontend.isValidURL(w)){e.push({type:"validation",container:g});break}break;case"password":case"confirm_password":var r=a(g).data("repeat"),s=a(g).data("strength"),t=a(g).data("minimum-length");if(w=a.trim(a(g).val()),"yes"===j&&""===w){e.push({type:"required",container:g});break}if(w.length<t){e.push({type:"custom",container:g,message:"Minimum "+t+" character is required"});break}if("yes"===r&&a('[data-type="confirm_password"]').eq(0).val()!==w&&e.push({error_type:"mismatch",container:g}),s){var u=wp.passwordStrength.meter(w,wp.passwordStrength.userInputDisallowedList());"weak"===s&&u<2?e.push({type:"custom",container:g,message:"Password minimum strength should be weak"}):"medium"===s&&u<3?e.push({type:"custom",container:g,message:"Password minimum strength should be medium"}):"strong"===s&&u<4&&e.push({type:"custom",container:g,message:"Password strength should be strong"})}break;case"select":w=a(g).val(),"yes"===j&&"-1"===w&&e.push({type:"required",container:g});break;case"multiselect":w=a(g).val(),"yes"===j&&0===w.length&&e.push({type:"required",container:g});break;case"tax-checkbox":var v=a(g).children().find("input:checked").length;"yes"!==j||v||e.push({type:"required",container:g});break;case"radio":case"checkbox":h=a(g).parents(".wpuf-fields"),v=a(h).find("input:checked").length,"yes"!==j||v||e.push({type:"required",container:g});break;case"file":var v=a(g).find("ul").children().length;"yes"!==j||v||e.push({type:"required",container:a(g).closest(".wpuf-fields")});break;case"email":if(w=a(g).val(),"yes"===j&&""===w){e.push({type:"required",container:g});break}""===w||WP_User_Frontend.isValidEmail(w)||e.push({type:"validation",container:g});break;case"url":var w=a(g).val();if("yes"===j&&""===w){e.push({type:"validation",container:g});break}""===w||WP_User_Frontend.isValidURL(w)||e.push({type:"validation",container:g});break;default:if(a(g).attr("id")&&a(g).attr("id").startsWith("wpuf-map")){var x=a(g).parents(".wpuf-form-google-map-container");mapField=a(x).find('input[id^="wpuf-map-lat"]'),j=a(mapField).data("required"),w=a(mapField).val(),"yes"===j&&""===w&&e.push({type:"required",container:x})}a(g).hasClass("br-widget")&&(h=a(g).parents(".wpuf-fields"),j=a(h).find("select.wpuf-ratings").data("required"),v=a(g).find(".br-selected").length,"yes"!==j||v||e.push({type:"required",container:g}))}}),e.length){var f,g=e.length;for(f=0;f<g;f++)WP_User_Frontend.markError(e[f].container,e[f].type,e[f].message);return WP_User_Frontend.addErrorNotice(c,"end"),a(e[0].container).focus(),!1}c.find('li.wpuf-el[style*="display: none"] input').each(function(b,c){switch(a(c).attr("type")){case"url":case"email":a(c).val("")}});var h=c.find(":disabled").removeAttr("disabled"),i=c.serialize();return h.attr("disabled","disabled"),i=i+"&"+d.join("&")},addErrorNotice:function(b,c){"bottom"==c?a(".wpuf-multistep-fieldset:visible").append('<div class="wpuf-errors">'+wpuf_frontend.error_message+"</div>"):a(b).find("li.wpuf-submit").append('<div class="wpuf-errors">'+wpuf_frontend.error_message+"</div>")},removeErrorNotice:function(b){a(b).find(".wpuf-errors").remove()},markError:function(b,c,d){if(a(b).closest("div").addClass("has-error"),c){var e="",f=a(b).data("label");switch(e=f||a(b).closest("li").data("label"),c){case"required":case"mismatch":case"validation":e=e+" "+error_str_obj[c];break;case"limit":e="";break;case"custom":e=d}a(b).siblings(".wpuf-error-msg").remove(),a(b).closest(".wpuf-fields.wpuf-fields-address").length?(a(b).closest("div.wpuf-sub-fields").find("div.wpuf-error-msg").remove(),a(b).closest("div.wpuf-sub-fields").append('<div class="wpuf-error-msg">'+e+"</div>")):(a(b).closest("div.wpuf-fields").find("div.wpuf-error-msg").remove(),a(b).closest("div.wpuf-fields").append('<div class="wpuf-error-msg">'+e+"</div>"))}},removeErrors:function(b){a(b).find(".has-error").removeClass("has-error"),a(".wpuf-error-msg").remove()},isValidEmail:function(a){return new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i).test(a)},isValidURL:function(a){return new RegExp("^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/){1}[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,20}(:[0-9]{1,20})?(\\/.*)?$").test(a)},insertImage:function(b,c){if(a("#"+b).length){var d=new plupload.Uploader({runtimes:"html5,html4",browse_button:b,container:"wpuf-insert-image-container",multipart:!0,multipart_params:{action:"wpuf_insert_image",form_id:a("#"+b).data("form_id")},multiple_queues:!1,multi_selection:!1,urlstream_upload:!0,file_data_name:"wpuf_file",max_file_size:wpuf_upload.max_filesize,url:wpuf_upload.plupload.url,flash_swf_url:wpuf_upload.flash_swf_url,filters:[{title:"Allowed Files",extensions:"jpg,jpeg,gif,png,bmp"}]});d.bind("Init",function(a,b){}),d.bind("FilesAdded",function(b,c){var d=a("#wpuf-insert-image-container");a.each(c,function(a,b){d.append('<div class="upload-item" id="'+b.id+'"><div class="progress progress-striped active"><div class="bar"></div></div></div>')}),b.refresh(),b.start()}),d.bind("QueueChanged",function(a){d.start()}),d.bind("UploadProgress",function(b,c){var d=a("#"+c.id);a(".bar",d).css({width:c.percent+"%"}),a(".percent",d).html(c.percent+"%")}),d.bind("Error",function(a,b){alert("Error #"+b.code+": "+b.message)}),d.bind("FileUploaded",function(b,d,e){if(a("#"+d.id).remove(),"error"!==e.response){if("undefined"!=typeof tinyMCE)if("function"!=typeof tinyMCE.execInstanceCommand){var f=tinyMCE.get("post_content_"+c);null!==f&&f.insertContent(e.response)}else tinyMCE.execInstanceCommand("post_content_"+c,"mceInsertContent",!1,e.response);var g=a("#post_content_"+c);g.val(g.val()+e.response)}else alert("Something went wrong")}),d.init()}},deleteAvatar:function(b){b.preventDefault(),confirm(a(this).data("confirm"))&&a.post(wpuf_frontend.ajaxurl,{action:"wpuf_delete_avatar",_wpnonce:wpuf_frontend.nonce},function(){a(b.target).parent().remove(),a("[id^=wpuf-avatar]").css("display","")})},editorLimit:{bind:function(b,c,d,e,f){"no"===d?(a("textarea#"+c).keyup(function(a){WP_User_Frontend.editorLimit.textLimit.call(this,a,b,e,f)}),a("input#"+c).keyup(function(a){WP_User_Frontend.editorLimit.textLimit.call(this,a,b,e,f)}),a("input#"+c).change(function(a){WP_User_Frontend.editorLimit.textLimit.call(this,a,b,e,f)}),a("textarea#"+c).on("paste",function(c){var d=a(this);setTimeout(function(){WP_User_Frontend.editorLimit.textLimit.call(d,c,b,e,f)},100)}),a("input#"+c).on("paste",function(c){var d=a(this);setTimeout(function(){WP_User_Frontend.editorLimit.textLimit.call(d,c,b,e,f)},100)})):setTimeout(function(){tinyMCE.get(c).onKeyUp.add(function(a,c){WP_User_Frontend.editorLimit.tinymce.onKeyUp(a,c,b,e,f)}),tinyMCE.get(c).onPaste.add(function(a,c){setTimeout(function(){WP_User_Frontend.editorLimit.tinymce.onPaste(a,c,b,e,f)},100)})},1e3)},checkTinyMCERestriction:function(b,c,d){var e=0,f=void 0!==c[0]&&null!==c[0]?parseInt(c[0]):0,g=(void 0!==c[1]&&null!==c[1]&&c[1].trim(),void 0!==c[2]&&null!==c[2]&&c[2].trim(),void 0!==c[3]&&null!==c[3]?c[3].trim():""),h=void 0!==c[4]&&null!==c[4]?c[4].trim():"",i="";"word"===g?(e=WP_User_Frontend.editorLimit.tinymce.getStats(d).words,i="word_"+h):(e=WP_User_Frontend.editorLimit.tinymce.getStats(d).chars,i="char_"+h);wpuf_frontend["word_"+h];return 0!==e&&(e>f&&"max"===h?(WP_User_Frontend.markError(b,"limit"),jQuery(".mce-path-item.mce-last",d.container).html(wpuf_frontend[i]+" "+e+"/"+f),!0):e<f&&"min"===h?(WP_User_Frontend.markError(b,"limit"),WP_User_Frontend.contentLimitMessage(a(b),g,h,f),!0):void 0)},isRestrictionFailed:function(b){var c=a(b).data("id"),d=(a(b).data("type"),!1),e=null,f=0,g=0,h="";if(a(b).closest("div.wpuf-fields").hasClass("has-error")&&a(b).closest("div.wpuf-fields").removeClass("has-error"),"undefined"!=typeof tinyMCE&&null!==tinyMCE.get(c)&&(d=!0,e=tinyMCE.get(c),e.focus()),a(b).closest("li.wpuf-el").find("script").html()){var i=a(b).closest("li.wpuf-el").find("script").html();h=i.match(/(?:bind\()(.*?(?=\)))/)?i.match(/(?:bind\()(.*?(?=\)))/)[1].replace(/['"]/g,"").split(","):""}if(d)return WP_User_Frontend.editorLimit.checkTinyMCERestriction(b,h,e);var j=void 0!==h[0]&&null!==h[0]?parseInt(h[0]):0,k=void 0!==h[3]&&null!==h[3]?h[3].trim():"",l=void 0!==h[4]&&null!==h[4]?h[4].trim():"";if(f=a(b).val().trim().length,g=a(b).val().trim().split(" ").length,0===f)return!1;if("word"===k){if(g>j&&"max"===l)return WP_User_Frontend.markError(b,"limit"),!0;if(g<j&&"min"===l)return WP_User_Frontend.markError(b,"limit"),!0}else{if(f>j&&"max"===l)return WP_User_Frontend.markError(b,"limit"),!0;if(f<j&&"min"===l)return WP_User_Frontend.markError(b,"limit"),!0}return!1},tinymce:{getStats:function(a){var b=a.getContent({format:"text"});return{chars:b.length,words:b.split(" ").length}},onKeyUp:function(b,c,d,e,f){var g=a(".wpuf-fields.wpuf_"+b.id);a(g.closest(".wpuf-fields")).hasClass("has-error")&&g.removeClass("has-error");var h=WP_User_Frontend.editorLimit.tinymce.getStats(b).chars;if(!h)return void g.closest(".wpuf-fields").find("span.wpuf-wordlimit-message").html("");"word"===e&&(h=WP_User_Frontend.editorLimit.tinymce.getStats(b).words),d&&h>d&&"max"===f?(WP_User_Frontend.markError(g,"limit"),WP_User_Frontend.contentLimitMessage(a(g),e,f,d)):d&&h<d&&"min"===f?(WP_User_Frontend.markError(g,"limit"),WP_User_Frontend.contentLimitMessage(a(g),e,f,d)):(jQuery(".mce-path-item.mce-last",b.container).html(""),g.closest(".wpuf-fields").find("span.wpuf-wordlimit-message").html(""))},onPaste:function(b,c,d,e,f){var g=b.getContent({format:"text"}),h=g.length,i=a(".wpuf-fields.wpuf_"+b.id);i.closest(".wpuf-fields").hasClass("has-error")&&i.closest(".wpuf-fields").removeClass("has-error"),h&&("word"===e&&(h=g.split(" ").length),d&&h>d&&"max"===f?(WP_User_Frontend.contentLimitMessage(i,e,f,d),WP_User_Frontend.markError(i,"limit")):d&&h<d&&"min"===f?(WP_User_Frontend.contentLimitMessage(i,e,f,d),WP_User_Frontend.markError(i,"limit")):i.closest(".wpuf-fields").find("span.wpuf-wordlimit-message").html(""),WP_User_Frontend.editorLimit.make_media_embed_code(g,b))}},textLimit:function(b,c,d,e){var f=a(this),g=f.val().length;f.closest(".wpuf-fields").hasClass("has-error")&&f.closest(".wpuf-fields").removeClass("has-error"),g&&("word"===d&&(g=f.val().split(" ").length),c&&g>c&&"max"===e?(WP_User_Frontend.contentLimitMessage(f,d,e,c),WP_User_Frontend.markError(f,"limit")):c&&g<c&&"min"===e?(WP_User_Frontend.contentLimitMessage(f,d,e,c),WP_User_Frontend.markError(f,"limit")):f.closest(".wpuf-fields").find("span.wpuf-wordlimit-message").html(""),"paste"===b.type&&(c&&g>c&&"max"===e?(WP_User_Frontend.contentLimitMessage(f,d,e,c),WP_User_Frontend.markError(f,"limit")):c&&g<c&&"min"===e?(WP_User_Frontend.contentLimitMessage(f,d,e,c),WP_User_Frontend.markError(f,"limit")):f.closest(".wpuf-fields").find("span.wpuf-wordlimit-message").html("")))},blockTyping:function(b){-1!==a.inArray(b.keyCode,[46,8,9,27,13,110,190,189])||65==b.keyCode&&!0===b.ctrlKey||b.keyCode>=35&&b.keyCode<=40||(b.preventDefault(),b.stopPropagation())},make_media_embed_code:function(b,c){a.post(ajaxurl,{action:"wpuf_make_media_embed_code",content:b},function(a){c.setContent(c.getContent()+c.setContent(a))})}},doUncheckRadioBtn:function(a){a.checked=!1},contentLimitMessage:function(a,b,c,d){var e="";"word"===b?"min"===c?(e=wpuf_frontend.word_min_title+"<br>",e+=wpuf_frontend.word_min_details.replace("%number%",d)):(e=wpuf_frontend.word_max_title+"<br>",e+=wpuf_frontend.word_max_details.replace("%number%",d)):"min"===c?(e=wpuf_frontend.char_min_title+"<br>",e+=wpuf_frontend.char_min_details.replace("%number%",d)):(e=wpuf_frontend.char_max_title+"<br>",e+=wpuf_frontend.char_max_details.replace("%number%",d)),a.closest(".wpuf-fields").find("span.wpuf-wordlimit-message").html(e)},editorContainingShortcode:function(b){var c=a(b),d=c.data("id"),e=a.trim(tinyMCE.get(d).getContent()).toLowerCase(),f=wpuf_frontend.protected_shortcodes;if(!f)return{shortcodeFound:!1};for(var g=0;g<f.length;g++){var h=f[g];if(new RegExp(h).test(e))return{shortcodeFound:!0,shortcode:h}}return{shortcodeFound:!1}}},a(function(){if(WP_User_Frontend.init(),a("ul.wpuf-payment-gateways").on("click","input[type=radio]",function(b){a(".wpuf-payment-instruction").slideUp(250),a(this).parents("li").find(".wpuf-payment-instruction").slideDown(250)}),a("ul.wpuf-payment-gateways li").find("input[type=radio]").is(":checked")){a("ul.wpuf-payment-gateways li").find("input[type=radio]:checked").parents("li").find(".wpuf-payment-instruction").slideDown(250)}else a("ul.wpuf-payment-gateways li").first().find("input[type=radio]").click()}),a(function(){a('input[name="first_name"], input[name="last_name"]').on("change keyup",function(){var b,c=a.makeArray(a('input[name="first_name"], input[name="last_name"]').map(function(){if(b=a(this).val())return b})).join(" ");a('input[name="display_name"]').val(c)})}),a(function(a){a('.wpuf-form-add input[name="dokan_store_name"]').on("focusout",function(){var b=a(this).val().toLowerCase().replace(/-+/g,"").replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");a('input[name="shopurl"]').val(b),a("#url-alart").text(b),a('input[name="shopurl"]').focus()}),a('.wpuf-form-add input[name="shopurl"]').keydown(function(b){a(this).val();-1!==a.inArray(b.keyCode,[46,8,9,27,13,91,109,110,173,189,190])||65==b.keyCode&&!0===b.ctrlKey||b.keyCode>=35&&b.keyCode<=39||(b.shiftKey||(b.keyCode<65||b.keyCode>90)&&(b.keyCode<48||b.keyCode>57))&&(b.keyCode<96||b.keyCode>105)&&b.preventDefault()}),a('.wpuf-form-add input[name="shopurl"]').keyup(function(b){a("#url-alart").text(a(this).val())}),a('.wpuf-form-add input[name="shopurl"]').on("focusout",function(){var b=a(this),c={action:"shop_url",url_slug:b.val(),_nonce:dokan.nonce};""!==b.val()&&a.post(dokan.ajaxurl,c,function(b){0==b?(a("#url-alart").removeClass("text-success").addClass("text-danger"),a("#url-alart-mgs").removeClass("text-success").addClass("text-danger").text(dokan.seller.notAvailable)):(a("#url-alart").removeClass("text-danger").addClass("text-success"),a("#url-alart-mgs").removeClass("text-danger").addClass("text-success").text(dokan.seller.available))})}),a(".wpuf-form-add #wpuf-map-add-location").attr("name","find_address")}),a(function(a){a(document).on("click",".wpuf-eye",function(){const b=a(this).siblings("input");"password"===b.attr("type")?(b.attr("type","text"),a(this).attr("src",wpuf_frontend.asset_url+"/images/eye-close.svg")):(b.attr("type","password"),a(this).attr("src",wpuf_frontend.asset_url+"/images/eye.svg"))})})}(jQuery,window);