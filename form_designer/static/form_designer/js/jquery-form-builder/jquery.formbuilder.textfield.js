/*
* JQuery Form Builder - TextField plugin.
*
* Revision: 1
* Version: 0.1
* Copyright 2011 Emilio Sanchez (esanchez@yaco.es)
*
* Licensed under Apache v2.0 http://www.apache.org/licenses/LICENSE-2.0.html
*
* Date: 05-Oct-2011
*/

var FbTextField = $.extend({}, $.fb.fbWidget.prototype, {
	options: { // default options. values are stored in widget's prototype
		name: 'Text Field',
		belongsTo: $.fb.formbuilder.prototype.options._standardFieldsPanel,
		_type: 'TextField',
		_html : '<div><label><em></em><span></span></label> \
		      <textarea></textarea> \
	        <p class="formHint"></p></div>',
		_counterField: 'label',
		_languages: [ 'en', 'zh_CN', 'es' ],
		settings: {
			en: {
				label: 'Text Field',
				value: '',
				description: '',
				styles: {
					fontFamily: 'default', // form builder default
					fontSize: 'default',
					fontStyles: [0, 0, 0] // bold, italic, underline					
				}				
			},
			zh_CN : {
				label: '文本字段',
				value: '',
				description: '',				
				styles: {
					fontFamily: 'default', // form builder default
					fontSize: 'default',
					fontStyles: [0, 0, 0] // bold, italic, underline					
				}				
			},
            es: {
                label: 'Campo de Texto',
                value: '',
                description: '',
                styles: {
                    fontFamily: 'default', // form builder default
                    fontSize: 'default',
                    fontStyles: [0, 0, 0] // bold, italic, underline
                }
            },
			_persistable: true,
			required: true,
			readonly: false,
            noReadActiviti: false,
            noWriteActiviti: false,
			restriction: 'no',
			styles : {
				label: {
				  color : 'default',
				  backgroundColor : 'default'
				},
			  value: {
				  color : 'default',
				  backgroundColor : 'default'
				},
				description: {
					color : '777777',
					backgroundColor : 'default'
			    }				
			}
		}
	},
	_init : function() {
		// calling base plugin init
		$.fb.fbWidget.prototype._init.call(this);
		// merge base plugin's options
		this.options = $.extend({}, $.fb.fbWidget.prototype.options, this.options);
	},
	_getWidget : function(event, fb) {
		var $jqueryObject = $(fb.target.options._html);
		fb.target._log('fbTextField._getWidget executing...');
		$('label span', $jqueryObject).text(fb.settings.label);
		if (fb._settings.required) {
			$('label em', $jqueryObject).text('*');	
		}
		$('textarea', $jqueryObject).text(fb.settings.value);
		$('.formHint', $jqueryObject).text(fb.settings.description);
		fb.target._log('fbTextField._getWidget executed.');
		return $jqueryObject;
	},
	_getFieldSettingsLanguageSection : function(event, fb) {
		fb.target._log('fbTextField._getFieldSettingsLanguageSection executing...');
		var $label = fb.target._label({ label: $.fb.fbWidget.prototype.translate('Label'), name: 'field.label' })
                         .append('<input type="text" id="field.label" />');
    $('input', $label).val(fb.settings.label)
     .keyup(function(event) {
 	      var value = $(this).val();
	      fb.item.find('label span').text(value);
	      fb.settings.label = value;
	      fb.target._updateSettings(fb.item);
         });
	  var $value = fb.target._label({ label: $.fb.fbWidget.prototype.translate('Value'), name: 'field.value' })
		                      .append('<input type="text" id="field.value" />');
		$('input', $value).val(fb.settings.value)
		 .keyup(function(event) {
		  var value = $(this).val();
		  fb.item.find('.textInput').val(value);
		  fb.settings.value = value;
		  fb.target._updateSettings(fb.item);
		});    
		var $name = fb.target._label({
            label: $.fb.fbWidget.prototype.translate('Name'),
            name: 'field.name'
        }).append('<input type="text" id="field.name" />');
        $('input', $name).val(fb.item.find("input[id$='fields[" + fb.item.attr('rel') + "].name']").val()).keyup(function(event) {
            var value = $(this).val();
            fb.target._updateName(fb.item, value);
        });
		var $description = fb.target._label({ label: $.fb.fbWidget.prototype.translate('Description'), name: 'field.description' })
          .append('<textarea id="field.description" rows="2"></textarea>');
		$('textarea', $description).val(fb.settings.description)
			.keyup(function(event) {
			  var value = $(this).val();
			  fb.item.find('.formHint').text(value);
			  fb.settings.description = value;
			  fb.target._updateSettings(fb.item);
		});    		
		
    var styles = fb.settings.styles;
    var fbStyles = fb.target._getFbLocalizedSettings().styles;
    var fontFamily = styles.fontFamily != 'default' ? styles.fontFamily : fbStyles.fontFamily ;
	  var fontSize = styles.fontSize != 'default' ? styles.fontSize : fbStyles.fontSize;	  
		var $fontPanel = fb.target._fontPanel({ fontFamily: fontFamily, fontSize: fontSize, 
				                           fontStyles: styles.fontStyles, idPrefix: 'field.', nofieldset: true });
		
		$("input[id$='field.bold']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				fb.item.find('label').css('fontWeight', 'bold');
				fb.item.find('.textInput').css('fontWeight', 'bold');
				styles.fontStyles[0] = 1;
			} else {
				fb.item.find('label').css('fontWeight', 'normal');
				fb.item.find('.textInput').css('fontWeight', 'normal');				
				styles.fontStyles[0] = 0;
			}
			fb.target._updateSettings(fb.item);
		});
		$("input[id$='field.italic']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				fb.item.find('label').css('fontStyle', 'italic');
				fb.item.find('.textInput').css('fontStyle', 'italic');				
				styles.fontStyles[1] = 1;
			} else {
				fb.item.find('label').css('fontStyle', 'normal');
				fb.item.find('.textInput').css('fontStyle', 'normal');					
				styles.fontStyles[1] = 0;
			}
			fb.target._updateSettings(fb.item);
		});	
		$("input[id$='field.underline']", $fontPanel).change(function(event) {
			if ($(this).attr('checked')) {
				fb.item.find('label span').css('textDecoration', 'underline');
				fb.item.find('.textInput').css('textDecoration', 'underline');					
				styles.fontStyles[2] = 1;
			} else {
				fb.item.find('label span').css('textDecoration', 'none');
				fb.item.find('.textInput').css('textDecoration', 'none');					
				styles.fontStyles[2] = 0;
			}
			fb.target._updateSettings(fb.item);
		});
		
		$("input[id$='field.fontFamily']", $fontPanel).change(function(event) {
			var value = $(this).val();
			fb.item.css('fontFamily', value);
			fb.item.find('.textInput').css('fontFamily', value);	
			styles.fontFamily = value;
			fb.target._updateSettings(fb.item);
		});		
		
		$("select[id$='field.fontSize']", $fontPanel).change(function(event) {
			var value = $(this).val();
			fb.item.find('label').css('fontSize', value + 'px');
			fb.item.find('.textInput').css('fontSize', value + 'px');					
			styles.fontSize = value;
			fb.target._updateSettings(fb.item);
		});				
		fb.target._log('fbTextField._getFieldSettingsLanguageSection executed.');
		return [fb.target._twoColumns($label, $value), fb.target._oneColumn($name), fb.target._oneColumn($description), $fontPanel];
	},
	_getFieldSettingsGeneralSection : function(event, fb) {
		fb.target._log('fbDate._getFieldSettingsGeneralSection executing...');
        var $required = $('<div><input type="checkbox" id="field.required" />&nbsp;' + $.fb.fbWidget.prototype.translate('Required') + '</div>');
        var $readonly = $('<div><input type="checkbox" id="field.readonly" />&nbsp;' + $.fb.fbWidget.prototype.translate('Read-only') + '</div>');
        var $restriction = $('<div><select id="field.restriction" style="width: 99%"> \
                <option value="no">' + $.fb.fbWidget.prototype.translate('any character') + '</option> \
                <option value="alphanumeric">' + $.fb.fbWidget.prototype.translate('alphanumeric only') + '</option> \
                <option value="letterswithbasicpunc">' + $.fb.fbWidget.prototype.translate('letters or punctuation only') + '</option> \
                <option value="lettersonly">' + $.fb.fbWidget.prototype.translate('letters only') + '</option> \
            </select></div>');
		var $valuePanel = fb.target._fieldset({ text: 'Value'})
		                  .append(fb.target._twoColumns($required, $restriction))
		                  .append(fb.target._oneColumn($readonly));
		$('.col1', $valuePanel).css('width', '32%').removeClass('labelOnTop');
		$('.col2', $valuePanel).css('marginLeft', '34%').removeClass('labelOnTop');
		
		$('input', $required).attr('checked', fb.settings.required)
		 .change(function(event) {
			if ($(this).attr('checked')) {
				fb.item.find('em').text('*');
				fb.settings.required = true;
			} else {
				fb.item.find('em').text('');		
				fb.settings.required = false;
			}
			fb.target._updateSettings(fb.item);
		});		
		$('input', $readonly).attr('checked', fb.settings.readonly)
		 .change(function(event) {
			if ($(this).attr('checked')) {
				fb.settings.readonly = true;
			} else {
				fb.settings.readonly = false;
			}
			fb.target._updateSettings(fb.item);
		});		

        var $noReadActiviti = $('<div><input type="checkbox" id="field.noReadActiviti" />&nbsp;' + $.fb.fbWidget.prototype.translate('Do not read from activiti') + '</div>');
        var $noWriteActiviti = $('<div><input type="checkbox" id="field.noWriteActiviti" />&nbsp;' + $.fb.fbWidget.prototype.translate('Do not write to activiti') + '</div>');
        var $activitiPanel = fb.target._fieldset({ text: $.fb.fbWidget.prototype.translate('Activiti')})
                          .append(fb.target._oneColumn($noReadActiviti)).append(fb.target._oneColumn($noWriteActiviti));

        $('input', $noReadActiviti).attr('checked', fb.settings.noReadActiviti || this.options.settings.noReadActiviti).change(function(event) {
            if ($(this).attr('checked')) {
                fb.item.find('em').text('*');
                fb.settings.noReadActiviti = true;
            } else {
                fb.item.find('em').text('');
                fb.settings.noReadActiviti = false;
            }
            fb.target._updateSettings(fb.item);
        });
        $('input', $noWriteActiviti).attr('checked', fb.settings.noWriteActiviti || this.options.settings.noWriteActiviti).change(function(event) {
            if ($(this).attr('checked')) {
                fb.settings.noWriteActiviti = true;
            } else {
                fb.settings.noWriteActiviti = false;
            }
            fb.target._updateSettings(fb.item);
        }); 

		$("select option[value='" + fb.settings.restriction + "']", $restriction).attr('selected', 'true');
		$('select', $restriction).change(function(event) {
			fb.settings.restriction = $(this).val();
			fb.target._log('fb.settings.restriction = ' + fb.settings.restriction);
			fb.target._updateSettings(fb.item);
		});			
		
		var $textInput = fb.item.find('.textInput');
		var styles = fb.settings.styles;
		if (styles.value.color == 'default') {
			styles.value.color = $textInput.css('color');
		}
		if (styles.value.backgroundColor == 'default') {
			styles.value.backgroundColor = $textInput.css('backgroundColor');
		}		
		var $colorPanel = fb.target._labelValueDescriptionColorPanel(styles);
		
		$("input[id$='field.label.color']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			fb.item.css('color','#' + value);
			styles.label.color = value;
			fb.target._updateSettings(fb.item);
		});		

		$("input[id$='field.label.backgroundColor']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			fb.item.css('backgroundColor','#' + value);
			styles.label.backgroundColor = value;
			fb.target._updateSettings(fb.item);
		});				
		
		$("input[id$='field.value.color']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			$textInput.css('color','#' + value);
			styles.value.color = value;
			fb.target._updateSettings(fb.item);
		});		

		$("input[id$='field.value.backgroundColor']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			$textInput.css('backgroundColor','#' + value);
			styles.value.backgroundColor = value;
			fb.target._updateSettings(fb.item);
		});					
		
		$("input[id$='field.description.color']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			fb.item.find('.formHint').css('color','#' + value);
			styles.description.color = value;
			fb.target._updateSettings(fb.item);
		});		

		$("input[id$='field.description.backgroundColor']", $colorPanel).change(function(event) {
			var value = $(this).data('colorPicker').color;
			fb.item.find('.formHint').css('backgroundColor','#' + value);
			styles.description.backgroundColor = value;
			fb.target._updateSettings(fb.item);
		});				
		fb.target._log('fbTextField._getFieldSettingsGeneralSection executed.');
		return [$valuePanel, $activitiPanel, $colorPanel];
	}, 
	_languageChange : function(event, fb) {
		fb.target._log('fbTextField.languageChange executing...');
		var styles = fb.settings.styles;
		var fbStyles = fb.target._getFbLocalizedSettings().styles;
		var fontFamily = styles.fontFamily != 'default' ? styles.fontFamily : fbStyles.fontFamily;
		var fontSize = styles.fontSize != 'default' ? styles.fontSize : fbStyles.fontSize;
		var fontWeight = styles.fontStyles[0] == 1 ? 'bold' : 'normal';
    var fontStyle = styles.fontStyles[1] == 1 ? 'italic' : 'normal';
    var textDecoration = styles.fontStyles[2] == 1 ? 'underline' : 'none';
		
    fb.item.css('fontFamily', fontFamily);
		fb.item.find('label span').text(fb.settings.label)
		  .css('textDecoration', textDecoration);

		fb.item.find('label').css('fontWeight', fontWeight)
		  .css('fontStyle', fontStyle)
		  .css('fontSize', fontSize + 'px');
			
		fb.item.find('.textInput').val(fb.settings.value)
		  .css('fontWeight', fontWeight)
		  .css('fontStyle', fontStyle)
		  .css('textDecoration', textDecoration)
		  .css('fontFamily', fontFamily)
		  .css('fontSize', fontSize + 'px');

		fb.item.find('.formHint').text(fb.settings.description);
		
		fb.target._log('fbTextField.languageChange executed.');
	}
});

$.widget('fb.fbTextField', FbTextField);
