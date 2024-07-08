
$(document).ready(function () {


    $('main').sortable({
        handle: 'h1',
      // Specify that headings can be dragged
        update: function(event, ui) {
       }
    });

    // Save new heading
    $('#heading-form').on('submit', function (e) {
        e.preventDefault();
        var newHeading = $('.input-heading').val().trim();
        if (newHeading) {
            $('#Heading').modal('hide');
            $('#selectfield').append(`<option>${newHeading}</option>`);
            $('#sub-select').append(`<option>${newHeading}</option>`);

            // Append new heading to the list
            $('main').append(`
                <div class="heading-container">
                    <h1>${newHeading}
                    <button type="button" class="close1" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </h1>
                    <div class="subheading-list"></div>
                </div>
            `);
            $('.input-heading').val('');
        }
        localStorage.setItem('Heading', JSON.stringify(newHeading));
    

    $('main').on('click', '.close1', function() {
        $(this).closest('.heading-container').remove();
        //saveDataToLocalStorage(); // Save data to
        $('#Heading').trigger('reset');
      });
    });




   $('#subheading-form').on('submit', function (e) {
        e.preventDefault();
        var selectedHeading = $('#sub-select').val();
        var newSubHeading = $('#sub-input').val().trim();
        if (selectedHeading && newSubHeading) {
            $('#subheading').modal('hide');
            var headingContainer = $(`.heading-container:has(h1:contains('${selectedHeading}'))`);
            headingContainer.find('.subheading-list').append(`
                <div class="subheading-container">
                    <h2>${newSubHeading}
                        <button type="button" class="close-heading-btn" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h2>
                    <div class="form-list"></div>
                </div>
            `);
        $('#subheadselect').append(`<option>${newSubHeading}</option>`);
            // saveDataToLocalStorage(); // Save data to localStorage

            $('#sub-input').val('');
            $('#subheading-form').trigger('reset');
        }
   
      localStorage.setItem('subheading', JSON.stringify(newSubHeading));
      });

 //Remove subheading
      $('main').on('click', '.close-heading-btn', function() {
        $(this).closest('.subheading-container').remove();
      })

      $('#selectfield').change(function () {
        var selectedHeading = $(this).val();
        var subHeadings = $(`.heading-container:has(h1:contains('${selectedHeading}')) .subheading-container h2`);
        $('#subheadselect').empty().append('<option value="" disabled selected>Choose a sub-heading</option>');
        subHeadings.each(function () {
            var subHeadingText = $(this).text();
            $('#subheadselect').append(`<option>${subHeadingText}</option>`);
     });
     
    $('#sample-Form').on('submit', function (e) {
        e.preventDefault();
    
        var selectHeading = $('#selectfield').val();
        var selectSubHeading = $('#subheadselect').val();
        var inputType = $('#input').val();
        var nameInput = $('#name').val();
        var classInput = $('#class').val();
        var valueInput = $('#value').val();
        var placeholderInput = $('#placeholder').val();
        var optionInput = $('#options').val();
        var isReadonly = $('#readonly').is(':checked');
        var isDisabled = $('#disabled').is(':checked');
        var inputTag = '';
    
    // Generate the input tag based on the input type
        switch (inputType) {
            case 'text':
            case 'email':
            case 'file':
                inputTag = `<input type="${inputType}" id="${nameInput}" class="${classInput}" name="${nameInput}" value="${valueInput}" placeholder="${placeholderInput}" ${isReadonly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}>`;
                break;
    
            case 'textarea':
                inputTag = `<textarea id="${nameInput}" class="${classInput}" name="${nameInput}" placeholder="${placeholderInput}" ${isReadonly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}>${valueInput}</textarea>`;
                break;
    
            case 'checkbox':
            case 'radio':
                inputTag = optionInput.split(',').map(option => {
                    return `<label><input type="${inputType}" id="${option.trim()}" class="${classInput}" name="${nameInput}" value="${option.trim()}" ${isReadonly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}> ${option.trim()}</label>`;
                }).join('');
                break;
    
            case 'select':
                inputTag = `<select id="${nameInput}" class="${classInput}" name="${nameInput}" ${isReadonly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}>`;
                inputTag += optionInput.split(',').map(option => `<option value="${option.trim()}">${option.trim()}</option>`).join('');
                inputTag += `</select>`;
                break;
    
            case 'submit':
                inputTag = `<input type="submit" id="${nameInput}" class="${classInput}" value="${valueInput}">`;
                break;
    
            default:
               // console.error('Unsupported input type:', inputType);
                return;
            }
    
 // Create the form data object after inputTag is generated
        let formdata = {
            selectHeading: selectHeading,
            selectSubHeading: selectSubHeading,
            inputType: inputType,
            nameInput: nameInput,
            classInput: classInput,
            valueInput: valueInput,
            placeholderInput: placeholderInput,
            optionInput: optionInput,
            isReadonly: isReadonly,
            isDisabled: isDisabled,
            inputTag: inputTag
        };
    
        // Save form data to localStorage
        localStorage.setItem('formdata', JSON.stringify(formdata));
    
        // Select the correct subheading container
        var subHeadingContainer = $(`.heading-container:has(h1:contains('${selectHeading}')) .subheading-list`);
        subHeadingContainer.append(inputTag);
    
        // Hide the form modal and reset the form
        $('#form').modal('hide');
        $('#sample-Form')[0].reset();
    });
 });

});

