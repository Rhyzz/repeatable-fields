/*
 * jQuery Repeatable Fields v1.5.0
 * http://www.rhyzz.com/repeatable-fields.html
 *
 * Copyright (c) 2014-2018 Rhyzz
 * License MIT
*/

(function($) {
	"use strict";

	$.fn.repeatable_fields = function(custom_settings) {
		var self = this;

		self.after_add = function(container, new_row) {
			var row_count = $(container).attr('data-rf-row-count');

			row_count++;

			$('*', new_row).each(function() {
				$.each(this.attributes, function() {
					this.value = this.value.replace(self.settings.row_count_placeholder, row_count - 1);
				});
			});

			$(container).attr('data-rf-row-count', row_count);
		};
		
		self.default_settings = {
			wrapper: '.wrapper',
			container: '.container',
			row: '.row',
			add: '.add',
			remove: '.remove',
			move: '.move',
			move_up: '.move-up',
			move_down: '.move-down',
			move_steps: '.move-steps',
			template: '.template',
			is_sortable: true,
			before_add: null,
			after_add: self.after_add,
			before_remove: null,
			after_remove: null,
			sortable_options: null,
			row_count_placeholder: '{{row-count-placeholder}}',
		};

		self.settings = $.extend({}, self.default_settings, custom_settings);

		self.initialize = function(parent) {
			$(self.settings.wrapper, parent).each(function() {
				var wrapper = this;

				var container = $(wrapper).children(self.settings.container);

				// Disable all form elements inside the row template
				$(container).children(self.settings.template).hide().find(':input').each(function() {
					$(this).prop('disabled', true);
				});

				var row_count = $(container).children(self.settings.row).filter(function() {
					return !$(this).hasClass(self.settings.template.replace('.', ''));
				}).length;

				$(container).attr('data-rf-row-count', row_count);

				$(wrapper).on('click', self.settings.add, function(event) {
					event.stopImmediatePropagation();

					var row_template = $($(container).children(self.settings.template).clone().removeClass(self.settings.template.replace('.', ''))[0].outerHTML);

					// Enable all form elements inside the row template
					$(row_template).find(':input').each(function() {
						$(this).prop('disabled', false);
					});

					if(typeof self.settings.before_add === 'function') {
						self.settings.before_add(container);
					}

					var new_row = $(row_template).show().appendTo(container);

					if(typeof self.settings.after_add === 'function') {
						self.settings.after_add(container, new_row, self.settings.after_add);
					}

					// The new row might have it's own repeatable field wrappers so initialize them too
					self.initialize(new_row);
				});

				$(wrapper).on('click', self.settings.remove, function(event) {
					event.stopImmediatePropagation();

					var row = $(this).parents(self.settings.row).first();

					if(typeof self.settings.before_remove === 'function') {
						self.settings.before_remove(container, row);
					}

					row.remove();

					if(typeof self.settings.after_remove === 'function') {
						self.settings.after_remove(container);
					}
				});
			
				if(self.settings.is_sortable === true) {
					if(typeof $.ui !== 'undefined' && typeof $.ui.sortable !== 'undefined') {
						var sortable_options = self.settings.sortable_options !== null ? self.settings.sortable_options : {};

						sortable_options.handle = self.settings.move;

						$(wrapper).find(self.settings.container).sortable(sortable_options);
					}

					$(wrapper).find(self.settings.container).on('click', function(event) {
						if(!$(event.target).is(self.settings.move_up) && !$(event.target).is(self.settings.move_down)) {
							return;
						}

						var steps = 1;
						
						if($(event.target).siblings(self.settings.move_steps).length === 1) {
							var custom_steps = parseInt($(event.target).siblings(self.settings.move_steps).val(), 10);
							
							if(isNaN(custom_steps) === false && (custom_steps > 0 || custom_steps === -1)) {
								steps = custom_steps;
							}
						}

						var current_row = $(event.target).closest(self.settings.row);

						var i = 0;

						if($(event.target).is(self.settings.move_up) === true) {
							var previous_row;
							
							for(i = 0; steps === -1 ? true : i < steps; i++) {
								if(previous_row === undefined) {
									if(current_row.prev().not(self.settings.template).length === 1) {
										previous_row = current_row.prev();
									}
									else {
										break;
									}
								}
								else {
									if(previous_row.prev().not(self.settings.template).length === 1) {
										previous_row = previous_row.prev();
									}
									else {
										break;
									}
								}
							}
							
							if(previous_row !== undefined) {
								previous_row.before(current_row);
							}
						}
						else if($(event.target).is(self.settings.move_down) === true) {
							var next_row;

							for(i = 0; steps === -1 ? true : i < steps; i++) {
								if(next_row === undefined) {
									if(current_row.next().length === 1) {
										next_row = current_row.next();
									}
									else {
										break;
									}
								}
								else {
									if(next_row.next().length === 1) {
										next_row = next_row.next();
									}
									else {
										break;
									}
								}
							}

							if(next_row !== undefined) {
								next_row.after(current_row);
							}
						}

						event.stopImmediatePropagation();
					});
				}
			});
		};

		// Initialize all repeatable field wrappers
		self.initialize(self);
		
		return self;
	};
})(jQuery);