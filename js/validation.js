(function () {
    'use strict';

    let formValidationWrapper = ($form, formName, validationRules, validators) => {


        let getSelector = (name) => `${formName}[${name}]`;
        let getFormField = (selector) => {
            let fullName = `[name="${selector}"]`;
            return $form.querySelector(fullName);
        }
        let getErrorWrapper = (field) => {
            let errorWrapper = field.parentNode;

            while (!errorWrapper.classList.contains('form-field-wrapper')) {
                errorWrapper = errorWrapper.parentNode;
            }
            return errorWrapper.querySelector('.error-wrapper');
        }
        let getValue = (field) => {
            let value = field.value;
            if (value) value = value.trim();
            return value;
        }

        let validationResultFunction = (value, validationReguls, errorWrapper) => {
            errorWrapper.textContent = '';
            for (let validationRegul in validationReguls) {
                let validFunction = validators[validationRegul];
                let result = validFunction(value, validationReguls);
                if (!result.valid) {
                    if (errorWrapper.textContent === '') {
                        errorWrapper.textContent = result.message;
                    }
                }
            }
        }

        let validation = (inp) => {

            for (let validationRule in validationRules) {
                let selector = getSelector(validationRule);
                let formField = getFormField(selector);
                let errorWrapper = getErrorWrapper(formField);
                let validationReguls = validationRules[validationRule].validation;
                if (inp) {
                    if (formField === inp) {
                        let value = getValue(inp);
                        validationResultFunction(value, validationReguls, errorWrapper);
                    }
                }
                else {
                    let value = getValue(formField);
                    validationResultFunction(value, validationReguls, errorWrapper);
                }
            }
        }

        let onSubmit = (e) => {
            e.preventDefault();
            validation()
        }
        let onBlur = function () {
            validation(this)
        }

        let initialValidation = function () {

            for (let validationRule in validationRules) {

                let selector = getSelector(validationRule);
                let formField = getFormField(selector);
                formField.addEventListener('blur', onBlur)


            }

        }
        initialValidation();

        $form.addEventListener('submit', onSubmit);
    }



    let init = () => {

        let validationRules = {
            name: {
                validation: {
                    notBlank: {},
                    regex: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
                }
            },
            surname: {
                validation: {
                    notBlank: {},
                    regex: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
                }
            },
            email: {
                validation: {
                    notBlank: {},
                    regex: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                }
            },
            phone: {
                validation: {
                    notBlank: {},
                    regex: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                    length: 9
                }
            },
            message: {
                validation: {
                    notBlank: {},
                    maxLength: 130,
                }
            }


        }
        let validators = {
            notBlank: function (value) {
                if (value) value = value.trim()
                return value.length > 0 ? { valid: true } : { valid: false, message: "Pole nie moze być puste" }
            },
            regex: function (value, option) {
                if (value) value = value.trim()
                let patt = option.regex;

                let result = patt.test(value);
                console.log(result);
                return result ? { valid: true } : { valid: false, message: 'Niepoprawna składnia' }
            },
            length: function (value, option) {
                if (value) value = value.trim()
                let length = option.length
                return value.length === length ? { valid: true } : { valid: false, message: `Wymagana długość ${length} znaków` }
            },
            maxLength: function (value, option) {
                if (value) value = value.trim();
                let maxLength = option.maxLength;
                let result = value.length < maxLength;
                return result ? { valid: true } : { valid: false, message: `Maksymalna ilość znaków to ${maxLength} ` }
            }
        }
        let $form = document.querySelector(".contact-form");
        let formName = 'contactform';


        formValidationWrapper($form, formName, validationRules, validators)

    }
    init()

}())