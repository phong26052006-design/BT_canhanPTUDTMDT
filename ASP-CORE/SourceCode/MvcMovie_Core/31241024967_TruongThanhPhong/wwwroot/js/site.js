// jQuery Validate uses English decimal separators by default. Match vi-VN server binding.
if (window.jQuery && jQuery.validator) {
    const parseNumber = (value, element) => element.type === 'number'
        ? Number(value)
        : Number(value.replace(/\./g, '').replace(',', '.'));
    jQuery.validator.methods.number = function (value, element) {
        const pattern = element.type === 'number' ? /^-?\d+(\.\d+)?$/ : /^-?\d+(,\d+)?$/;
        return this.optional(element) || pattern.test(value);
    };
    jQuery.validator.methods.range = function (value, element, range) {
        const n = parseNumber(value, element);
        return this.optional(element) || (n >= range[0] && n <= range[1]);
    };
}
