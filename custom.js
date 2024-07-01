$(document).ready(function() {
    // Append value in the first heading
    $(".heading-form").on('submit', function(e) {
        e.preventDefault();
        // Hide the first modal
        $('#Heading').modal('hide');
        let heading = $(".input-heading").val();
        let headingId = `heading-${Math.random().toString(36).substring(2, 9)}`; // ID generate 
        if (heading) {
            $('main').append(`<div id="${headingId}-container" class="heading-container">
                <h1 id="${headingId}">${heading}
                    <button class="close-heading" data-heading-id="${headingId}">x</button>
                </h1>
            </div>`);


        }
        // Append value in subheading option
        $('select[name=select-heading]').append(`<option value="${headingId}">${heading}</option>`);
        $('select[name=header-select]').append(`<option value="${headingId}">${heading}</option>`);
        $('.heading-form').trigger('reset');
    });

    // Subheading value
    $(".subheading-form").on('submit', function(e) {
        e.preventDefault();
        // Hide the second modal
        $('#subheading').modal('hide');
        let subheading = $(".input-subheading").val();
        let headingId = $('select[name=select-heading]').val();
        let subheadingId = `subheading-${Math.random().toString(36).substring(2, 9)}`; // ID generate 

        if (headingId && subheading) {
            $(`#${headingId}-container`).append(`
                <div id="${subheadingId}-container" class="draggable-container" draggable="true">
                    <h4 id="${subheadingId}">${subheading}</h4>
                </div>
            `);
            $('select[name=sub-select]').append(`<option data-heading="${headingId}" value="${subheadingId}">${subheading}</option>`);
            $('.subheading-form').trigger('reset');
        }
    });

    // Form 3 behavior
    $('#main-header3').on('change', function() {
        let selectedHeadingId = $(this).val();
        let subSelect = $('#recipient-name'); // Assuming 'recipient-name' is the sub-select dropdown
        subSelect.html('<option selected>...choose subhead</option>'); // Reset subhead options

        // Populate sub-select options based on the selected heading
        $(`option[data-heading="${selectedHeadingId}"]`).each(function() {
            subSelect.append(`<option value="${$(this).val()}">${$(this).text()}</option>`);
        });
    });

  // form3
        
    $(".form3").on('submit', function(e) {
        e.preventDefault();
        $('#form').modal('hide')

        let headingId = $("#main-header3").val();
        let subheadingId = $("#recipient-name").val();

        if (headingId && subheadingId) {
            let elementType = $("#input-type").val();
            let name = $("#name").val();
            let label = $("#label").val();
            let type = $("#type").val();
            let value = $("#value").val();
            let placeholder = $("#placeholder").val();
            let options = $("#options").val();
            let readonly = $("#flexRadioDefault1").prop('checked');
            let disable = $("#flexRadioDefault2").prop('checked');

            let formdata = {
                "name": name,
                "label": label,
                "type": type,
                "value": value,
                "placeholder": placeholder,
                "options": options,
                "readonly": readonly,
                "disable": disable,
            };
            console.log(forelement,'jjjjjjjjjjjjjjjjjjjjjjjjjjj');

            let formElement;
            switch (elementType) {
                case 'text':
                    formElement = `<input type="${elementType}" class="form-control" id="${name}" name="${name}" placeholder="${placeholder}" value="${value}" ${readonly ? 'readonly' : ''} ${disable ? 'disabled' : ''}>`;
                    break;
                case 'textarea':
                    formElement = `<textarea class="form-control" id="${name}" name="${name}" placeholder="${placeholder}" ${readonly ? 'readonly' : ''} ${disable ? 'disabled' : ''}>${value}</textarea>`;
                    break;
                case 'file':
                    formElement = `<input type="file" class="form-control" id="${name}" name="${name}" ${readonly ? 'readonly' : ''} ${disable ? 'disabled' : ''}>`;
                    break;
                case 'select':
                    let optionList = options.split(',').map(option => `<option>${option.trim()}</option>`).join('');
                    formElement = `<select class="form-control" id="${name}" name="${name}" ${readonly ? 'readonly' : ''} ${disable ? 'disabled' : ''}>${optionList}</select>`;
                    break;
                case 'submit':
                    formElement = `<button type="submit" class="btn btn-primary">${label}</button>`;
                    break;
                case 'checkbox':
                    formElement = `<input type="checkbox" id="${name}" name="${name}" ${readonly ? 'readonly' : ''} ${disable ? 'disabled' : ''}> <label for="${name}">${label}</label>`;
                    break;
                default:
                    formElement = `<p>Unsupported input type.</p>`;
                    break;
            
             }
             if (headingId && subheadingId) {
                $({subheadingId}-container).append(`
                  <div class="field-container" draggable="true">
                    ${newField}
                    <button type="button" class="close2" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  </div>`);
             }
             
        };

    });
});
    
