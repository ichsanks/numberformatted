(function ($) {
    'use strict';

    $.fn.extend({
        numberformatted: function (options) {
            // filter out <= IE6
            if (typeof document.body.style.maxHeight === 'undefined') {
                return this;
            }
            var defaults = {
                    customClass: 'numberformatted',
            },
            options = $.extend(defaults, options),
            prefix = options.customClass,
            setSeparator = function(value) {
            	var result = [],
            		i = 0,
            		length = value.length;
				for(i; i<=length; i+=3) {
					result.push(value.substr(i, 3));
				}
				result.splice(-1,1);
				return result.join('.');
            },
			setMaskValue = function(value) {
				var value = value.toString(),
					isMinus = value.indexOf('-') < 0 ? false : true,					
					arrVal = [];

				if(isMinus) {
					value = value.substr(1);
				}

				// Check for decimal
				if(value.indexOf('.') < 0) {
					if(value.length>3){
						// Add separator
						value = (value.length%3 !== 0) ?
							value.substr(0,value.length%3) + '.' + setSeparator(value.substr(value.length%3, value.length)) :
							setSeparator(value);
					}
				} else {
					arrVal = value.toString().split('.');
					value = setMaskValue(arrVal[0]) + ',' + arrVal[1];					
				}

				return !isMinus ? value : '-'+value;
				//return value;
			},
            changed = function($input) {
            	var realVal = $input.val().stripChar(),
           	    	result = (realVal == "" || realVal == 0) ? 0 : setMaskValue(realVal);

           	    $input.val(result);
            },
            filterInput = function($input, event) {
            	var keyCode = event.keyCode;

            	if($input.val() == 0) { 
            		$input.val('');
            	}
            	//Numeric
				if( keyCode >= 48 && keyCode <= 57 ) {
					return true;
				//
				} else if( keyCode == 45) {
					if( (keyCode == 45 && $input.val().indexOf('-') >= 0) || $input.val() != 0 ) {						
						return false;
					}				
				} else if(keyCode == 46) {					
					event.preventDefault();
					if($input.val().indexOf(',') >= 0) {						
						return false;
					}
					$input.val($input.val() == 0 ? '0,' : $input.val()+',');
				} else {
					return false;
				}
            },
            parseEquation = function(equation) {
            	var data = equation.replace(/\(|\)|\+|\-|\/|\*/g,'.').split('.'),
            		result = equation;            	

            	$.each(data, function(key, val) {
            		var regex = new RegExp("\\b" + val + "\\b"),
            			realVal;

            		if(key>0 && data[key-1].toLowerCase() == "sum") {
            			return false;
            		}

            		switch(val.toLowerCase()) {
            			case '':
            				return false;
            				break;
            			case 'sum':
            				var group = $('*[data-cell^="'+ data[key+1] +'"]:enabled'),
            					groupVal = 0;
            				$.each(group, function(i, v) {            					
            					if($(this).data('cell').replace(/[0-9]/g, '').toLowerCase() == data[key+1].toLowerCase()) {
            						groupVal += parseFloat($(this).val().stripChar());            						
            					}
            				});            				
            				result = parseFloat(groupVal);     
            				break;
            			default:
            				realVal = $('*[data-cell="'+val+'"]').val().stripChar();
		            		result = result.replace(regex, realVal).replace('--','+');
            		}            		
            	});
            	return eval(result);
            },
            calculate = function() {
            	$.each($('*[data-equation]'), function() {
					var result = parseEquation($(this).data('equation'));
					$(this).val(setMaskValue(result));
            	});            	
            }

            return this.each(function () {
                var $input = $(this),
                	value = $input.val();                	

                $input.attr('autocomplete', 'off');
            		
                $input
                    .on('render.numberFormatted', function () {                    	
                    	changed($input);
                        if($input.data('equation')) {                           
                            var result = parseEquation($(this).data('equation'));
                            $(this).val(setMaskValue(result));
                        }                        
                    })
                    .on('keypress', function(event) {
                    	var keyCode = event.keyCode ? event.keyCode : event.which;

                    	return filterInput($input, event);
                    })
                    .on('keyup', function() {
                    	$input.val($input.val() == '' ? 0 : $input.val());
                    	changed($input);
                    	calculate();
                    })
                    .on('focusout', function() {
                    	$input.val($input.val() == '-' ? 0 : $input.val());
                    })
                    .trigger('render.numberFormatted');                
            });
        }
    });	

})(jQuery);

String.prototype.stripChar = function() {	
	return this.replace(/\./g,'').replace(',','.');
}