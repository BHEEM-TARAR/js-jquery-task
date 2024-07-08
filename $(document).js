$(document).ready(function () {
    // Load data from localStorage on page load
     //loadDataFromLocalStorage();

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
        $('main').on('click', '.close1', function() {
            $(this).closest('.heading-container').remove();
            saveDataToLocalStorage();
         });
    });

    // Save new subheading
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
            // Save data to localStorage
            saveDataToLocalStorage();

            $('#sub-input').val('');
            $('#subheading-form').trigger('reset');
        }

    });

    // Save new form field
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
                optionInput.split(',').forEach(option => {
                    inputTag += `<label><input type="${inputType}" id="${option.trim()}" class="${classInput}" name="${nameInput}" value="${option.trim()}" ${isReadonly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}> ${option.trim()}</label>`;
                });
                break;
            case 'select':
                inputTag = `<select id="${nameInput}" class="${classInput}" name="${nameInput}" ${isReadonly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}>`;
                optionInput.split(',').forEach(option => {
                    inputTag += `<option value="${option.trim()}">${option.trim()}</option>`;
                });
                inputTag += `</select>`;
                break;
            case 'submit':
                inputTag = `<input type="submit" id="${nameInput}" class="${classInput}" value="${valueInput}">`;
                break;
        }

        var subHeadingContainer = $(`.heading-container:has(h1:contains('${selectHeading}')) .subheading-container:has(h2:contains('${selectSubHeading}')) .form-list`);

         subHeadingContainer.append(inputTag);

          $('#form').modal('hide');
           saveDataToLocalStorage();
         $('#sample-Form')[0].reset();
    });
      
    $('#selectfield').change(function () {
      var selectedHeading = $(this).val();
      var subHeadings = $(`.heading-container:has(h1:contains('${selectedHeading}')) .subheading-container h2`);
      $('#subheadselect').empty().append('<option value="" disabled selected>Choose a sub-heading</option>');
      subHeadings.each(function () {
          var subHeadingText = $(this).text();
          $('#subheadselect').append(`<option>${subHeadingText}</option>`);
      });
    });
    


    
   
   
   
   
   
   
   function saveDataToLocalStorage() {
        var data = [];
        $('.heading-container').each(function () {
            var heading = $(this).find('h1').text().trim();
            var subHeadings = [];
            $(this).find('.subheading-container').each(function () {
                var subHeading = $(this).find('h2').text().trim();
                var formElements = $(this).find('.form-list').html();
                subHeadings.push({
                    subHeading: subHeading,
                    formElements: formElements
                });
            });
            data.push({
                heading: heading,
                subHeadings: subHeadings
            });
        });
        localStorage.setItem('formData', JSON.stringify(data));
    
    }

    function loadDataFromLocalStorage() {
        var data = JSON.parse(localStorage.getItem('formData'));
        if (data) {
            data.forEach(function (headingData) {
                var headingContainer = $(`<div class="heading-container"><h1>${headingData.heading}</h1><div class="subheading-list"></div></div>`);
                $('#selectfield').append(`<option>${headingData.heading}</option>`);
                $('#sub-select').append(`<option>${headingData.heading}</option>`);
                headingData.subHeadings.forEach(function (subHeadingData) {
                    var subHeadingContainer = $(`<div class="subheading-container"><h2>${subHeadingData.subHeading}</h2><div class="form-list">${subHeadingData.formElements}</div></div>`);
                    headingContainer.find('.subheading-list').append(subHeadingContainer);
                    $('#subheadselect').append(`<option>${subHeadingData.subHeading}</option>`);
                });
                $('main').append(headingContainer);
            });
        }
    }

});
  
