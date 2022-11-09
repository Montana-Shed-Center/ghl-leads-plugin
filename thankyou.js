document.addEventListener("DOMContentLoaded", () => {

    if(window.localStorage.getItem('leadValue')) {
        //set dataLayer if we are on the correct page
        const pathVars = window.location.pathname.split("/").sort();
        const storedPathVars = window.localStorage.getItem('leadResponsePage').split("/").sort();
        if(compareArray(pathVars, storedPathVars)) {
            setDataLayer( window.localStorage.getItem('leadValue'), window.localStorage.getItem('formId') );
            window.localStorage.removeItem('leadValue');
            window.localStorage.removeItem('leadResponsePage');

            //set new localStorage values if need be.
            setLocalValues();
        }
    }

    else {
        //if there are the values attacted to the from we will get them
        setLocalValues();
    }

    function setLocalValues() {
        if( document.getElementById("form-values") ) {
            const formValues = JSON.parse(document.getElementById("form-values").value);
            window.localStorage.setItem('leadValue', formValues[0]);
            window.localStorage.setItem('leadResponsePage', formValues[1]);
            window.localStorage.setItem('formId', formValues[2]);
        }
    }

    function setDataLayer(leadValue, formId) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "generate_lead",
            value: leadValue,
            formId: formId
        })
    }

    function compareArray(array1, array2) {
        array1 = array1.filter(n => n);
        array2 = array2.filter(n => n);
        for(value of array1) {
            if(array2.includes(value)) {
                return true;
            }
        }
    }
});
