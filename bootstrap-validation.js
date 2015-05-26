//############## VALIDATIONS ################

/* Changelog */
/*
    Version 1.0.0   2015-05-26  Initial Version
*/

/* Pre-Requisites to use this validations */
/*
	jQuery:		jQuery 1.x (Not tested in 2.x)
	Bootstrap:	Bootstrap 3 for Inline Messages in validateFields()
*/

/* Validate fields in the given containerID */
/*
    containerID:        The ID container of the container in which the fields to be validated
    skipHiddenFields:   Skip Hidden Fields from validations. NOTE: This will not work with multiple Tabbed form.
	showInlineMessage:	Whether to show inline messages for validations
    callbackMethod:     A callback method can be specified to get the validation error message to a custom method
*/

// js variables
var msg_validation_this = 'This'
var msg_validation_select = 'Please select'
var msg_validation_an_option = 'an Option'
var msg_validation_empty = 'cannot be empty'
var msg_validation_email = 'is not a valid email address'
var msg_validation_number = 'is not a valid number'
var msg_validation_decimal = 'is not a valid decimal'
var msg_validation_special = 'is not in correct format'
var msg_validation_url = 'is not a valid URL'
var msg_validation_date = 'is not a valid date'


function bootstrapvalidate(containerID, skipHiddenFields, showInlineMessage, callbackMethod) {
    var isValid = true;
    var isAllValid = true;
    var errMessage = "";
    var validateField;
    var validationTypes;
    var elementValue;
    var minlength;
    var maxlength;
	var message = "";

    var errorContainer =  '<br/><center><div id="error-content">';
    $("#" + containerID + " [data-validation]").each(function () {

        // reset highlight effect
        unhighlightElement(this);

        validationTypes = $(this).data("validation").split(",");
        validateField = $(this).data("validate-name");
        elementValue = $(this).val();
        isValid = true;
		
		// 
		if (validateField == undefined) {
		    if ($(this).is("select")) {
		        validateField = msg_validation_this;
		    }
		    else {
		        validateField = msg_validation_this;
		    }
		}

        // Skip hidden fields
        if (skipHiddenFields) {
            if ($(this).is(":visible") == false) {
                //continue. i.e, skip this iteration and continue next iteration
                return;
            }
        }

        if ($(this).is("input")) {
            // Validate for empty
            if (validationTypes.indexOf("required") != -1) {

                if (elementValue == "") {
				
                    message = validateField + ' ' + msg_validation_empty;
					if (showInlineMessage) {
						highlightElement(this, message);
					}
					else {
						highlightElement(this);
						errMessage = errMessage + '<p>' + message + '</p>';
					}
					
					isValid = false;
                }
            }

            // validate for valid number
            if (isValid && validationTypes.indexOf("number") != -1) {

                if (isNaN(elementValue) || elementValue % 1 != 0) {
				
					message = validateField + ' ' + msg_validation_number;
					if (showInlineMessage) {
						highlightElement(this, message);
					}
					else {
						highlightElement(this);
                        errMessage = errMessage + '<p>' + message + '</p>';
                    }

                    isValid = false;
                }
            }

           
            // validate for valid decimal
            if (isValid && validationTypes.indexOf("decimal") != -1) {

                if (isNaN(elementValue)) {
				
                    message = validateField + ' ' + msg_validation_decimal;
					if (showInlineMessage) {
						highlightElement(this, message);
					} 
					else {
						highlightElement(this);
                        errMessage = errMessage + '<p>' + message + '</p>';
                    }

                    isValid = false;
                }
            }

            // validate for valid email
            if (isValid && elementValue != '' && validationTypes.indexOf("email") != -1) {

                var regex = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if (!regex.test(elementValue)) {
				
                    message = validateField + ' ' + msg_validation_email;
					if (showInlineMessage) {
						highlightElement(this, message);
					} 
					else {
						highlightElement(this);
                        errMessage = errMessage + '<p>' + message + '</p>';
                    }

                    isValid = false;
                }
            }
           
            // validate for special characters.
            if (isValid && elementValue != '' && validationTypes.indexOf("special") != -1) {
                
                var regex = /^[a-zA-Z0-9-]+$/gm;
                if (!regex.test(elementValue)) {

                    message = validateField + ' ' + msg_validation_special;
                    if (showInlineMessage) {
                        highlightElement(this, message);
                    }
                    else {
                        highlightElement(this);
                        errMessage = errMessage + '<p>' + message + '</p>';
                    }

                    isValid = false;
                }
            }

            // validate for valid url
            if (isValid && elementValue != '' && validationTypes.indexOf("url") != -1) {

                var regex = /((?:https?\:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)/i;
                if (!regex.test(elementValue)) {
				
                    message = validateField + ' ' + msg_validation_url;
					if (showInlineMessage) {
						highlightElement(this, message);
					}
					else {
						highlightElement(this);
                        errMessage = errMessage + '<p>' + message + '</p>';
                    }

                    isValid = false;
                }
            }

            // validate for date type
            if (isValid && elementValue != '' && validationTypes.indexOf("date") != -1) {
                var regex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
                if (regex.test(elementValue)) {

                    var dateVal = elementValue.split("-");
                    var yearVal = dateVal[0];
                    var monthVal = dateVal[1];
                    var dayVal = dateVal[2];

                    if (dayVal > 30 && (monthVal == 04 || monthVal == 06 || monthVal == 09 || monthVal == 11)) {
                        // More than 30th of a month with 30 days
                        isValid = false;
                    } else if (dayVal > 29 && monthVal == 02) {
                        // February greater than 29th
                        isValid = false;
                    } else if (monthVal == 02 && dayVal == 29 && !(yearVal % 4 == 0 && (yearVal % 100 != 0 || yearVal % 400 == 0))) {
                        // February 29th outside a leap year
                        isValid = false;
                    } else {
                        // Valid date
                        isValid = true;
                    }
                }
                else {
                    // Invalid Format
                    isValid = false;
                }

                if (!isValid) {
                    message = validateField + ' ' + msg_validation_date;
					if (showInlineMessage) {
						highlightElement(this, message);
					}
					else {
	                    highlightElement(this);
                        errMessage = errMessage + '<p>' + message + '</p>';
                    }
                }
            }

            // validate for no-space in content
            if (isValid && validationTypes.indexOf("nospace") != -1) {
                if (elementValue.indexOf(' ') != -1) {
                    isValid = false;
                    message = validateField + " cannot have whitespace";
                    if (showInlineMessage) {
                        highlightElement(this, message);
                    }
                    else {
                        highlightElement(this);
                        errMessage = errMessage + '<p>' + message + '</p>';
                    }

                }
            }

            // validate for minimum length
            //if (isValid && validationTypes.indexOf("minlength") != -1) {
            if (isValid) {
                minlength = $(this).data("validate-minlength");

                if (minlength != undefined) {
                    if (elementValue.length < minlength) {
						message = validateField + " should be at least " + minlength + " characters";
						if (showInlineMessage) {
							highlightElement(this, message);
						}
						else {
							highlightElement(this);
                            errMessage = errMessage + '<p>' + message + '</p>';
                        }

                        isValid = false;
                    }
                }
            }

            // validate for maximum length
            //if (isValid && validationTypes.indexOf("maxlength") != -1) {
            if (isValid) {
                maxlength = $(this).data("validate-maxlength");

                if (maxlength != undefined) {
                    if (elementValue.length > maxlength) {
						message = validateField + " should not exceed " + maxlength + " characters";
						if (showInlineMessage) {
							highlightElement(this, message);
						}
						else {
							highlightElement(this);
                            errMessage = errMessage + '<p>' + message + '</p>';
                        }

                        isValid = false;
                    }
                }
            }

            if (isValid) {
                var minval = $(this).data("minval");
                //validate minus value
                if (!isNaN(elementValue)) {
                    if (elementValue < minval) {
                        message = validateField + " cannot be less than " + minval;
                        if (showInlineMessage) {
                            highlightElement(this, message);
                        }
                        else {
                            highlightElement(this);
                            errMessage = errMessage + '<p>' + message + '</p>';
                        }

                        isValid = false;
                    }
                }

            }
        }

        if ($(this).is("select")) {

            // Validate for empty
            if (validationTypes.indexOf("required") != -1) {
                if (elementValue == "0") {
                    message = msg_validation_select + ' ' + validateField;
					if (showInlineMessage) {
						highlightElement(this, message);
					}
					else {
						highlightElement(this);
                        errMessage = errMessage + '<p>' + message + '</p>';
                    }

                    isValid = false;
                }
            }
        }

        if ($(this).is(":checkbox")) {
            // validate if required field 
            if (validationTypes.indexOf("required") != -1) {
                if (!$(this).is(":checked")) {
                    message = "Please check " + validateField;
                    if (showInlineMessage) {
                        highlightElement(this, message);
                    }
                    else {
                        highlightElement(this);
                        errMessage = errMessage + '<p>' + message + '</p>';
                    }

                    isValid = false;
                }
            }
        }

        if ($(this).is("textarea")) {
            // Validate for empty 
            if (validationTypes.indexOf("required") != -1) {

                if (elementValue == "") {

                    message = validateField + ' ' + msg_validation_empty;
                    if (showInlineMessage) {
                        highlightElement(this, message);
                    }
                    else {
                        highlightElement(this);
                        errMessage = errMessage + '<p>' + message + '</p>';
                    }

                    isValid = false;
                }
            }

        }

        if (!isValid) {
            isAllValid = false;
        }
    });

    // send the error messages to the callback
    if (callbackMethod != undefined || callbackMethod != ""){
        callbackMethod = callbackMethod + "('" + errMessage + "')";
        eval(callbackMethod);
    }
	
    return isAllValid;
}

/* Highlight the given field */
function highlightElement(elementselector, message) {
    $(elementselector).css("border-color", "red");
	
	// if message is received, show as inline message
	if (message != undefined && message != "") {
		$(elementselector).after('<span class="text-danger">'+message+'</span>');
	}
}

/* Reset the Hightlight effect on given field */
function unhighlightElement(elementselector) {
    $(elementselector).css("border-color", "");
	
	// Remove inline messages as well.
	$(elementselector).next('span.text-danger').remove();
}
