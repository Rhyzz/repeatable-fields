/*
 * jQuery Repeatable Fields v1.1.4
 * http://www.rhyzz.com/repeatable-fields.html
 *
 * Copyright (c) 2014 Rhyzz
 * License MIT
*/

(function($) {
	$.fn.repeatable_fields = function(custom_settings) {
		var default_settings = {
			wrapper: '.wrapper',
			container: '.container',
			row: '.row',
			add: '.add',
			remove: '.remove',
			move: '.move',
			template: '.template',
			minimum: 0,
			data_prefix: "template",
			is_sortable: true,
			before_add: null,
			after_add: after_add,
			before_remove: null,
			after_remove: null,
			sortable_options: null,
            reset_inputs: true,
			row_count_placeholder: "{{row-count-placeholder}}",
		}

		var settings = $.extend(default_settings, custom_settings);

		// Initialize all repeatable field wrappers
		initialize(this);

		function initialize(parent) {
			$(settings.wrapper, parent).each(function(index, element) {
				var wrapper = this;

				var container = $(wrapper).find(settings.container);

				// Disable all form elements inside the row template
				$(container).children(settings.template).hide().find(':input').each(function() {
					jQuery(this).prop('disabled', true);
				});

				$(wrapper).on('click', settings.add, function(event) {
					event.stopImmediatePropagation();

					var row_template = $($(container).children(settings.template).first().clone().removeClass(settings.template.replace('.', ''))[0].outerHTML);

					// Enable all form elements inside the row template
					jQuery(row_template).find(':input').each(function() {
					     jQuery(this).prop('disabled', false);
					}).not("button").each(function(){
					    if (settings.reset_inputs){
					        var input = $(this);
                            input.prop("checked", input.prop("defaultChecked")).prop("selectedIndex", input.prop("defaultSelected ")).val("");
					    }
					});

					if(typeof settings.before_add === 'function') {
						settings.before_add(container);
					}

					var new_row = $(row_template).show().appendTo(container);

					if(typeof settings.after_add === 'function') {
					    settings.after_add(container, new_row);
					}
					refresh(container);

					// The new row might have it's own repeatable field wrappers so initialize them too
					initialize(new_row);
				});

				$(wrapper).on('click', settings.remove, function(event) {
					event.stopImmediatePropagation();

					var row = $(this).parents(settings.row).first();

					if(typeof settings.before_remove === 'function') {
					    settings.before_remove(container, row);
					}

					row.remove();

					if(typeof settings.after_remove === 'function') {
					    settings.after_remove(container);
					}
					refresh(container);
				});

				if(settings.is_sortable === true && typeof $.ui !== 'undefined' && typeof $.ui.sortable !== 'undefined') {
					var sortable_options = settings.sortable_options !== null ? settings.sortable_options : {};

					var userUpdateEvent = function () { }

					if (sortable_options.hasOwnProperty("update")) {
					    userUpdateEvent = sortable_options.update;
					}

					sortable_options.update = function (ev, ui) {
					    if (typeof userUpdateEvent === 'function') userUpdateEvent(ev, ui);

					    refresh(container);
					}
					sortable_options.handle = settings.move;

					$(wrapper).find(settings.container).sortable(sortable_options);
				}


				var rows = $(container).children(settings.row).filter(function () {
				        return !jQuery(this).hasClass(settings.template.replace('.', ''));
				    }),
                    add_elm = $(wrapper).find(settings.add);

				for (var i = rows.length; i < settings.minimum; i++)
				    add_elm.click();


				refresh(container);
			});
		}

		function after_add(container, new_row) {
		    var placeholderRegEx = new RegExp(settings.row_count_placeholder),
                row_count = $(container).children(settings.row).filter(function () {
				    return !jQuery(this).hasClass(settings.template.replace('.', ''));
			    }).length;

			$('*', new_row).each(function () {
			    $.each(this.attributes, function (index, element) {
			        if (this.name.slice(0, "data-template-".length) != "data-template-")
			            this.value = this.value.replace(placeholderRegEx, row_count - 1);
			    });
			});
		}

		function refresh(container) {
		    var dataRegEx = new RegExp("^" + settings.data_prefix + "((?:[A-Z][a-z0-1]*)+)$"),
		        placeholderRegEx = new RegExp(settings.row_count_placeholder),
		        row_index = 0;

		    $(container).children(settings.row).filter(function() {
		        return !jQuery(this).hasClass(settings.template.replace('.', ''));
		    }).each(function (i, elm) {
		        if (row_index < settings.minimum) {
		            $(this).find(settings.remove).prop("disabled", true).addClass("disabled");
		        } else {
		            $(this).find(settings.remove).prop("disabled", false).removeClass("disabled");
		        }
		        

		        $('*', this).each(function () {
		            var self = $(this),
                        dataAttrs = self.data();

		            for (i in dataAttrs) {
		                if (dataRegEx.test(i)) {
		                    self.attr(dataRegEx.exec(i)[1].toLowerCase(), dataAttrs[i].replace(placeholderRegEx, row_index));
		                }
		            }
		        });

		        row_index++;
		    })
		}
	}
})(jQuery);