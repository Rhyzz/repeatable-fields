/*
 * jQuery Repeatable Fields v1.4.0
 * http://www.rhyzz.com/repeatable-fields.html
 *
 * Copyright (c) 2014-2015 Rhyzz
 * License MIT
 * 
 * The original version of the plugin was not able to prepolulate and postpopulate data.
 * @revision : Vishal Zanzrukia (vishal.zanzrukia@azilen.com)
 * 
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
			sortable_options: null,
			row_count_placeholder: '{{row-count-placeholder}}',
			json_array_rows : null,
			init_with_single_row : true,
			key_prefix : '',
			default_format : 'mm/dd/yyyy'
		};
		
		var parent = this;
		var settings = $.extend({}, default_settings, custom_settings);
		
		/** generate row html components using template row and append them to container */
		var generate_template_row = function(container){
			var row_template = $($(container).children(settings.template).clone().removeClass(settings.template.replace('.', ''))[0].outerHTML);
			// Enable all form elements inside the row template
			$(row_template).find(':input').each(function() {
				$(this).prop('disabled', false);
			});
			if(typeof settings.before_add === 'function') {
				settings.before_add(container);
			}
			var new_row = $(row_template).show().appendTo(container);
			return new_row; 
		};
		
		/** pre-populate all the rows with given data */
		var pre_populate_data = function(container, json_array_rows){
			var any_row_exists = false;
			for(var index in json_array_rows)
			{
				var rowJson = json_array_rows[index];
				if(!jQuery.isEmptyObject(rowJson)){
					var new_row = generate_template_row(container);
					any_row_exists = true;
					if(typeof settings.after_add === 'function') {
						settings.after_add(container, new_row, rowJson, after_add);	
					}
				}
			}
			
			if(!any_row_exists && settings.init_with_single_row === true){
				/** init empty one single row */
				var new_row = generate_template_row(container);
				if(typeof settings.after_add === 'function') {
					settings.after_add(container, new_row, {}, after_add);
				}
			}
		};
		
		/** populate each row with given data */
		var populate_row = function(jsonRow, component){
			if(typeof component.name != 'undefined' && component.name != null && component.name != '' && !jQuery.isEmptyObject(jsonRow)){
				for (var key in jsonRow) {
					if (jsonRow.hasOwnProperty(key)) {
					  if(component.name.indexOf(settings.row_count_placeholder)!=-1 && component.name.indexOf(key)!=-1){
						  var key = component.name.replace(settings.row_count_placeholder, '');
						  component.value = jsonRow[key];
					  }
				  }
			   }
			}
		};
		
		/** populate date picker on field*/
		var populate_date_picker = function(component){
			var has_date = $(component).attr('has-date');
			if(typeof has_date != 'undefined' && has_date != null && has_date != '' && has_date == 'true' && component.name.indexOf(settings.row_count_placeholder) == -1 ){
				$('body').on('focus',"input[name="+component.name+"]", function(){
					var format = $(component).attr('date-format');
					format = typeof format != 'undefined' && format != null && format != '' ? format : settings.default_format;
				    $(this).datepicker({
					    format:format
					});
				});
			}
		};
		
		/** provide current data from template */
		this.get_current_data = function(){
			var container = $(settings.container);
			var final_rows = [];
			$('> tr',container).each(function() {
				if(!$(this).hasClass(settings.template.replace('.', ''))){
					var final_row  = {};
					$(':input', this).each(function(index, ele) {
						if(typeof this.name != 'undefined' && this.name != null && this.name != '' && this.name.indexOf(settings.key_prefix) != -1 && this.name.indexOf(settings.row_count_placeholder) == -1){
							final_row[this.name.replace(/[0-9]/g, "")] = this.value;
						}
					});
					if(!jQuery.isEmptyObject(final_row)){
						final_rows.push(final_row);
					}
				}
			});
			return final_rows;
		};
		
		// Initialize all repeatable field wrappers
		initialize(this);

		function initialize(parent) {
			$(settings.wrapper, parent).each(function(index, element) {
				var wrapper = this;
				var container = $(wrapper).children(settings.container);
				// Disable all form elements inside the row template
				$(container).children(settings.template).hide().find(':input').each(function() {
					$(this).prop('disabled', true);
				});
				
				var row_count = $(container).children(settings.row).filter(function() {
					return !$(this).hasClass(settings.template.replace('.', ''));
				}).length;

				$(container).attr('data-rf-row-count', row_count);

				$(wrapper).on('click', settings.add, function(event) {
					
					event.stopImmediatePropagation();
					var new_row = generate_template_row(container);
					if(typeof settings.after_add === 'function') {
						settings.after_add(container, new_row, {}, after_add);
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

				if(settings.is_sortable === true && typeof $.ui !== 'undefined' && typeof $.ui.sortable !== 'undefined') {
					var sortable_options = settings.sortable_options !== null ? settings.sortable_options : {};
					sortable_options.handle = settings.move;
					$(wrapper).find(settings.container).sortable(sortable_options);
				}
				
				/** populate data */
				pre_populate_data(container, settings.json_array_rows);
			});
		}
		
		function after_add(container, new_row, jsonRow) {
			
			var row_count = $(container).attr('data-rf-row-count');
			row_count++;
			
			$('*', new_row).each(function() {
				
				/** populate row with data*/
				populate_row(jsonRow, this);	
				
			    /** it will replace place holder with original index */ 
				$.each(this.attributes, function(index, element) {
					this.value = this.value.replace(settings.row_count_placeholder, row_count - 1);
				});
				
				/**
				 * populate date pickers if any
				 **/
				populate_date_picker(this);
			});

			$(container).attr('data-rf-row-count', row_count);
		}
		return this;
	}
})(jQuery);