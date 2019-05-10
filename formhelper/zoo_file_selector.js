(function($) {
    'use strict';
	var pluginName = "ZooFileSelector";
    var defaults = {
								maxWidth: 200,
								maxHeight: 200,
								//allowedFormats: [ 'jpg', 'jpeg', 'png', 'gif' ],
								allowedFormats: "*",
								notallowedFormats: ['html','htm','php','jsp','asp','aspx','ini','inc'],
								maxFileSizeKb: 2048,
								maxCount:1,
								loaginImg:'/assets/icons/fam3/ajax_loading21.gif',
								loaginText:'Loading...',
							};
	function ZooFileSelector(wrap,options) {
		this.$wrap = $(wrap);
		this.$file = this.$wrap.find(":file");
		this.$filelabel = this.$wrap.find("label.zoo-fileselector-filelabel");
		this.$btn_reset = this.$wrap.find(".zoo-fileselector-reset");
		this.$img_preview = this.$wrap.find(".zoo-fileselector-preview");
		this.$txt_img_name = this.$wrap.find(".zoo-fileselector-name");
		this.$btn_download = this.$wrap.find(".zoo-fileseletor-download");

		this.options = defaults;
		this.options.maxWidth = typeof(options.maxWidth)=='undefined'?defaults.maxWidth:options.maxWidth;
		this.options.maxHeight = typeof(options.maxHeight)=='undefined'?defaults.maxHeight:options.maxHeight;
		this.options.allowedFormats = typeof(options.allowedFormats)=='undefined'?defaults.allowedFormats:options.allowedFormats;

		if(!Array.isArray(this.options.allowedFormats)) {
			if(this.options.allowedFormats.toLowerCase() == 'imageonly') {
				this.options.allowedFormats = [ 'jpg', 'jpeg', 'png', 'gif' ];
			}else if(this.options.allowedFormats != "*") {
				this.options.allowedFormats = this.options.allowedFormats.split(",");
			}
		}
		this.options.notallowedFormats = typeof(options.notallowedFormats)=='undefined'?defaults.notallowedFormats:options.notallowedFormats;
		this.options.maxFileSizeKb = typeof(options.maxFileSizeKb)=='undefined'?defaults.maxFileSizeKb:options.maxFileSizeKb;
		this.options.maxCount = typeof(options.maxCount)=='undefined'?defaults.maxCount:options.maxCount;
		this.options.loaginImg = typeof(options.loaginImg)=='undefined'?defaults.loaginImg:options.loaginImg;
		this.options.loaginText = typeof(options.loaginText)=='undefined'?defaults.loaginText:options.loaginText;
		if((this.$btn_reset.length != 0 && this.$btn_reset.css("display") == 'none' && this.$btn_download.length == 0)) {
			this.$filelabel.addClass("dropdown-toggle");
		}
		this.init();
	}
	$.extend(ZooFileSelector.prototype, {
        init: function () {
				var $this = this;
				this.$file.change(function (e) {
					var input = $(this),
					numFiles = input.get(0).files ? input.get(0).files.length : 1,
					label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
					input.trigger('fileselect', [numFiles, label]);
					var files = e.target.files;
					var filesArr = Array.prototype.slice.call(files);
					var cnt_file = 0;
					var arr_fname = [];
					var is_seleted_ok = 1;

					if($this.$img_preview.length != 0) {
						$this.$img_preview.html('');
					}
					filesArr.forEach(function(f) {
						var is_img = 1;
						if(!f.type.match("image.*")) {
							is_img = 0;
						}
						if(is_seleted_ok != 1) {
							return;
						}
						var fname = f.name;
						var fxtnd = fname.substring(fname.lastIndexOf(".")+1, fname.length).toLowerCase();
						if($this.options.allowedFormats != "*" && Array.isArray($this.options.allowedFormats)) {
							if($this.options.allowedFormats.indexOf(fxtnd)  == -1) { // $.inArray(fxtnd,$this.options.allowedFormats)
								alert("�꾨옒�� �뚯씪留� 媛��ν빀�덈떎.\n\n[ "+$this.options.allowedFormats.join(", ")+" ]");
								is_seleted_ok = 0;
								$this.resetForm();
								return;
							}
						}
						if($this.options.notallowedFormats.indexOf(fxtnd)  != -1) {
							alert("�좏깮�� �뚯씪�� 遺덇��⑸땲��.");
							is_seleted_ok = 0;
							$this.resetForm();
							return;
						}
						if (f.size / 1024 > $this.options.maxFileSizeKb) {
							alert("�뚯씪 �ш린媛� �덈Т �쎈땲��.\n\n(Max : " + $this.options.maxFileSizeKb + "kB)");
							is_seleted_ok = 0;
							$this.resetForm();
							return;
						}
						arr_fname.push(fname);

						if($this.$img_preview.length != 0 && is_img == 1 && is_seleted_ok == 1) {
							var $imgtag = $this.getImgTag($this.options.loaginImg,$this.options.loaginTxt);
							$this.$img_preview.append($imgtag);
							var reader = new FileReader();
							reader.onload = function(e) {
								$imgtag.attr("src",e.target.result);
								$imgtag.attr("alt",label);
							}
							reader.onerror = function() {
								alert('誘몃━蹂닿린瑜� 留뚮뱾 �� �놁뒿�덈떎.');
								input.val('');
							};
							reader.readAsDataURL(f);
						}
					});

					if(arr_fname.length > 0 && is_seleted_ok == 1) {
						$this.$filelabel.removeClass("dropdown-toggle");
						$this.$btn_reset.removeClass("hide").prop("disabled",false);
						if($this.$txt_img_name.length != 0) {
							$this.$txt_img_name.val(arr_fname.join(", "));
						}
					}

				});
				if(this.$txt_img_name.length != 0) {
					this.$txt_img_name.click(function () {
						  $this.$file.trigger("click");
					});
				}
				if(this.$btn_reset.length != 0) {
					this.$btn_reset.click(function () {
						$this.resetForm();
					});
				}
			},
			getImgTag: function (src,nm_img) {
				return $('<img src="' + src + '" alt="'+nm_img+'" class="zoo-fileselector-thumnail" style="max-width: ' + this.options.maxWidth + 'px; max-height: ' + this.options.maxHeight + 'px;margin:2px auto">');
			},
			resetForm: function () {
				this.$file.val('');
				if(this.$txt_img_name.length != 0) {
					this.$txt_img_name.val('');
				}
				if(this.$img_preview.length != 0) {
					this.$img_preview.html('');
				}
				this.$btn_reset.addClass("hide").prop("disabled",true);
				if(this.$btn_download.length == 0) {
					this.$filelabel.addClass("dropdown-toggle");
				}
			}
	});

		$[ pluginName ] = $.fn[ pluginName ] = function ( options ) {
										return this.each(function() {
											if ( !$.data( this, "plugin_" + pluginName ) ) {
												$.data( this, "plugin_" + pluginName, new ZooFileSelector( this, options ) );
											}
										});
									};
}(jQuery));

/*

	<div class="zoo-imgupload">
		<div class='zoo-imgupload-preview'></div>
		<div class="input-group ">
			<input type="text" class="form-control input-xs zoo-imgupload-name" readonly value='ddd'>
			<div class="input-group-btn">
				<label class="btn btn-xs btn-success zoo-imgupload-filelabel  dropdown-toggle">
					<span>
						�뚯씪�좏깮&hellip;
					</span>
					<input type="file" name='att_catalogue' style="display:none ;" multiple>
				</label>
				<button type="button" id="btn_deletelistimg" class="btn btn-xs btn-info zoo-imgupload-remove hide " disabled >�좏깮痍⑥냼</button>
			</div>
		</div>
	</div>


	<div class="zoo-imgupload">
		<div class='zoo-imgupload-preview'></div>
		<div class="btn-group">
			<label class="btn btn-xs btn-success zoo-imgupload-filelabel btn-file dropdown-toggle">
				<span>�뚯씪�좏깮</span>
				<input type="file" name="listimage" id="listimage" accept="image/*" style="display:none">
			</label>
			<button type="button" id="btn_deletelistimg" class="btn btn-xs btn-info zoo-imgupload-remove hide" disabled >�뚯씪��젣</button>
		</div>
	</div>

$(".zoo-imgupload").ZooFileSelector({});


									<div class="zoo-fileselector input-group att_files">
										<input type="text" class="form-control input-xs zoo-fileselector-name" readonly value="<?=$data['prodinfo']['catalog_clt']?>">
										<div class="input-group-btn">
											<label class="btn btn-xs btn-success zoo-fileselector-filelabel btn-file">
												<span><?=cLang("�뚯씪�좏깮")?></span>
												<input type="file" name="att_catalog" id="att_catalog" style="display:none">
											</label>
											<button type="button" class="btn btn-xs btn-default zoo-fileselector-reset hide" disabled ><?=cLang("�좏깮痍⑥냼")?></button>
											<a href="" class="btn btn-xs btn-info zoo-fileseletor-download"><?=cLang("�ㅼ슫濡쒕뱶")?></a>
										</div>
									</div>
$(".att_files").ZooFileSelector({});

*/