# numberformatted
jQuery plugin for number formatted input and simple calculations

jQuery numberformatted is a jQuery plugin designed to help at formatting input to numbers and do simple calculations.

## How to Use
Include jQuery in your page:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
```
Include numberformatted plugins
```html
<script src="js/numberformatted.js"></script>
```
Initialize plugins

```html
<script>
$(function() {
  $('input').numberformatted();
});
</script>
```

## Calculations
* Add `data-cell="[cell-name]"` to input element as calculation data
* Add `data-math="[function]"` to element as calculation result
* Available function to use: `+, -, *, /, SUM()`
* **Don't use the same cell-name in one page**

## Examples

#### Addition
```html
<input type="text data-cell="A1" />
<input type="text data-cell="A2" />
<input type="text data-math="A1+A2" />
```

#### Substraction
```html
<input type="text data-cell="A1" />
<input type="text data-cell="A2" />
<input type="text data-math="A1-A2" />
```

#### Multiplication
```html
<input type="text data-cell="A1" />
<input type="text data-cell="A2" />
<input type="text data-math="A1*A2" />
```

#### Division
```html
<input type="text data-cell="A1" />
<input type="text data-cell="A2" />
<input type="text data-math="A1/A2" />
```

#### Summary
```html
<input type="text data-cell="A1" />
<input type="text data-cell="A2" />
<input type="text data-math="SUM(A)" />
```

#### Chaining calculations
```html
<input type="text data-cell="A1" />
<input type="text data-cell="A2" />
<input type="text data-cell="B1" data-math="SUM(A)" />
<input type="text data-cell="C1" />
<input type="text data-cell="C2" />
<input type="text data-cell="B2" data-math="C1*C2" />
<input type="text data-math="SUM(B)" />
```
