# Repeatable Fields

[Plugin's Homepage with Demo](http://www.rhyzz.com/repeatable-fields.html)

## Description

Repeatable Fields is a jQuery plugin which let's you create a set of fields that can be made to repeat. You can do the following to a field that is repeatable:

* Add new instance
* Remove existing instance
* Reposition an instance

The functionality that is provided by this plugin can also be referred to as:

* Dynamic Fields Plugin
* Dynamic Rows plugin
* Add Remove Rows Plugin

## Requirements

This plugin requires [jQuery](http://jquery.com/) and [jQuery UI Sortable](https://jqueryui.com/sortable/).

### Example

#### HTML

    <div class="repeat">
    	<table class="wrapper" width="100%">
    		<thead>
    			<tr>
					<td width="10%" colspan="4"><span class="add">Add</span></td>
    			</tr>
    		</thead>
    		<tbody class="container">
    		<tr class="template row">
    			<td width="10%">
					<span class="move">Move Row</span>
					<span class="move-up">Move Up</span>
					<input type="text" class="move-steps" value="1" />
					<span class="move-down">Move Down</span>
				</td>

    			<td width="10%">An Input Field</td>

    			<td width="70%">
    				<input type="text" name="an-input-field[{{row-count-placeholder}}]" />
    			</td>

    			<td width="10%"><span class="remove">Remove</span></td>
    		</tr>
    		</tbody>
    	</table>
    </div>

#### JavaScript

    jQuery(function() {
    	jQuery('.repeat').each(function() {
    		jQuery(this).repeatable_fields();
    	});
    });

## Options

```
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
after_remove: self.after_remove,
sortable_options: null,
row_count_placeholder: '{{row-count-placeholder}}',
```

<dl>
<dt>wrapper</dt>
<dd>Specifies an element that acts as a wrapper.</dd>

<dt>container</dt>
<dd>Specifies an element within the wrapper which acts as a container.</dd>

<dt>row</dt>
<dd>Specifies an element within the container that acts as a row holder. The row is what is repeated.</dd>

<dt>add</dt>
<dd>Specifies an element within the wrapper which let's you add more more</dd>

<dt>remove</dt>
<dd>Specifies an element within the row which let's you remove the current row</dd>

<dt>move</dt>
<dd>Specifies an element within the row which let's you reposition the current row.</dd>

<dt>move_up</dt>
<dd>Specifies an element clicking on which moves the row up</dd>

<dt>move_down</dt>
<dd>Specifies an element clicking on which moves the row down</dd>

<dt>move_steps</dt>
<dd>Specifies a field using which steps can be provided for the move_up and move_down functionality. An element will move up or down this number of steps. Default value is 1 step. -1 moves the item all the way up or down.</dd>

<dt>template</dt>
<dd>Specifies an element within the container which acts as a row template.</dd>

<dt>is_sortable</dt>
<dd>Specifies whether rows can be sorted</dd>

<dt>before_add</dt>
<dd>Specifies a function to run before a row is added</dd>

<dt>after_add</dt>
<dd>Specifies a function to run after a row is added</dd>

<dt>before_remove</dt>
<dd>Specifies a function to run before a row is removed</dd>

<dt>after_remove</dt>
<dd>Specifies a function to run after a row is removed</dd>

<dt>sortable_options</dt>
<dd>Specifies an object that can contain Options, Methods and Events which are passed to jQuery UI Sortable</dd>

<dt>row_count_placeholder</dt>
<dd>Specifies the row count placeholder to be used</dd>
</dl>
