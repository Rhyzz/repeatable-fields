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
    		<script type="text/html" class="template">
    		<tr class="row">
    			<td width="10%"><span class="move">Move</span></td>
    	
    			<td width="10%">An Input Field</td>
    			
    			<td width="70%">
    				<input type="text" name="an-input-field[{{row-count-placeholder}}]" />
    			</td>
    			
    			<td width="10%"><span class="remove">Remove</span></td>
    		</tr>
    		</script>
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
before_add: null,
after_add: after_add,
before_remove: null,
after_remove: null,
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
<dd>Specifies an element within the container which contains an HTML template for the row. This should be a <script> element. If your template is going to have a nested template
then you must set the type attribute of your script to application/json and you must convert the content to JSON format.
</dd>

<dt>before_add</dt>
<dd>Specifies a function to run before a row is added</dd>

<dt>after_add</dt>
<dd>Specifies a function to run after a row is added</dd>

<dt>before_remove</dt>
<dd>Specifies a function to run before a row is removed</dd>

<dt>after_remove</dt>
<dd>Specifies a function to run after a row is removed</dd>
</dl>
