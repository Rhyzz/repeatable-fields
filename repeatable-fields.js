/*
 * jQuery Repeatable Fields v1.0.6
 * http://www.rhyzz.com/repeatable-fields.html
 *
 * Copyright (c) 2013 Rhyzz
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
			is_sortable: true,
			before_add: null,
			after_add: after_add,
			before_remove: null,
			after_remove: null,
			after_move: null,
	                during_move: null,
        	   	after_move: null
		}

		var settings = $.extend(default_settings, custom_settings);

		// Initialize all repeatable field wrappers
		initialize(this);

		function initialize(parent) {
			$(settings.wrapper, parent).each(function(index, element) {
				wrapper = this;

				var container = $(wrapper).children(settings.container);

				// Disable all form elements inside the row template
				$(container).children(settings.template).hide().find(':input').each(function() {
					jQuery(this).prop('disabled', true);
				});

				$(wrapper).on('click', settings.add, function(event) {
					event.stopImmediatePropagation();

					var row_template = $($(container).children(settings.template).clone().removeClass(settings.template.replace('.', ''))[0].outerHTML);

					// Enable all form elements inside the row template
					jQuery(row_template).find(':input').each(function() {
						jQuery(this).prop('disabled', false);
					});

					if(typeof settings.before_add === 'function') {
						settings.before_add(container);
					}

					var new_row = $(row_template).show().appendTo(container);

					if(typeof settings.after_add === 'function') {
						settings.after_add(container, new_row);
					}

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
				});

				if(settings.is_sortable == true && typeof $.ui !== 'undefined' && typeof $.ui.sortable !== 'undefined') {
					$(wrapper).find(settings.container).sortable({
						handle: settings.move,
						row: $(settings.row, '>'),
			                        sort: settings.during_move,						
						stop: settings.after_move
					});
				}
			});
		}

		function after_add(container, new_row) {
			var row_count = $(container).children(settings.row).filter(function() {
				return !jQuery(this).hasClass(settings.template.replace('.', ''));
			}).length;

			$('*', new_row).each(function() {
				$.each(this.attributes, function(index, element) {
					this.value = this.value.replace(/{{row-count-placeholder}}/, row_count - 1);
				});
			});
		}
	}
})(jQuery);
