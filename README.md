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

## How it works

All plugin elements must be a child of the specified wrapper element.

This plugin will repeat the specified template row by appending a copy to the specified container element. All rows (including the template row) must be a child of the container element.

When the specified add element is clicked a new row is generated from the template row. All attributes on the template row will be copied to the newly generated row, replacing the specified `row_count_placeholder` (by default this is: "{{row-count-placeholder}}") with the row's index (zero based). By default, all input values (e.g. inputs|textareas|selects) are reset, but this can be turned off by setting the reset_inputs option to false.

If you specify the row_count_placeholder in the template row's attributes, they will be replaced with any new rows' index when it is added, but will not update if the row is moved to another position; if you want the repeated rows' count placeholder to update when the row is moved you will need to use the data attribute based template values on the template row. The default prefix to all template data attributes is set by the `data_prefix` option (default: "template"), and then specify the attribute name to be templated after the prefix, separated by a hyphen.
e.g. to template the `name` attribute of an input, the data attribute name would be: `data-template-name`.

If an attribute and a data template attribute are both set for the same attribute on an element within the template row, the data template attribute is used instead of the regular attribute.

If the `minimum` option is set, then the first minimum number of rows are created (if not already existig) and then cannot be removed (their remove elements are disabled).

## Requirements

This plugin requires [jQuery](http://jquery.com/) and [jQuery UI Sortable](https://jqueryui.com/sortable/).

### Simple Example

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
    			<td width="10%"><span class="move">Move</span></td>
    	
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

### Data Attribute Template Example

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
                <td width="10%"><span class="move">Move</span></td>
        
                <td width="10%">An Input Field</td>
                
                <td width="70%">
                    <input type="text" data-template-name="an-input-field[{{row-count-placeholder}}]" />
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
template: '.template',
minimum: 0,
data_prefix: "template",
before_add: null,
after_add: after_add,
before_remove: null,
after_remove: null,
is_sortable: true,
sortable_options: null,
reset_inputs: true,
row_count_placeholder: "{{row-count-placeholder}}",
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

<dt>template</dt>
<dd>Specifies an element within the container which acts as a row template.</dd>

<dt>minimum</dt>
<dd>Specifies how many rows must be present as a minimum.</dd>

<dt>data_prefix</dt>
<dd>Specifies the prefix used in a data attribute template value.</dd>

<dt>before_add</dt>
<dd>Specifies a function to run before a row is added</dd>

<dt>after_add</dt>
<dd>Specifies a function to run after a row is added</dd>

<dt>before_remove</dt>
<dd>Specifies a function to run before a row is removed</dd>

<dt>after_remove</dt>
<dd>Specifies a function to run after a row is removed</dd>

<dt>is_sortable</dt>
<dd>Specifies whether to allow moving/reordering rows or not.</dd>
</dl>

<dt>sortable_options</dt>
<dd>Specifies an object that can contain Options, Methods and Events which are passed to jQuery UI Sortable</dd>
</dl>

<dt>reset_inputs</dt>
<dd>Specifies the whether to reset/clear all the input/textarea/select values from the template row or not.</dd>
</dl>

<dt>row_count_placeholder</dt>
<dd>Specifies the placeholder value to be replaced with the row count (zero based) within all attributes of a template row.</dd>
</dl>