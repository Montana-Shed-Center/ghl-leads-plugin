
import "./index.scss";
import {Dashicon} from "@wordpress/components";

wp.blocks.registerBlockType("ghlleadblock/ghl-lead-block",{
    title: "GHL Lead Block",
    icon: "forms",
    category: "widgets",
    attributes: {
        formType: {type: "string"},
        formID: {type: "string"},
        ghlVars: {type: "string"},
        ghlVal: {type: "number"},
        ghlThanks: {type: "string"}
    },
    edit: (props) => {
        const formChecked = (props.attributes.formType === "form") ? "selected" : false;
        const surveyChecked = (props.attributes.formType === "survey") ? "selected" : false;
        return (
            <div class="ghl-lead-section">
                <div class="components-placeholder__label">
                    <Dashicon icon="forms"  className="block-editor-block-icon"/>
                    GLH Form/Survery
                </div>
                <form id="ghl-lead-form">
                    <div>
                        <label for="form-type">Type:</label>
                        <select id="form-type" onChange={(event) => { 
                            props.setAttributes({formType: event.target.value});
                        }}>
                        <option value="">Please Choose</option>
                            <option value="form" selected={formChecked}>Form</option>
                            <option value="survey" selected={surveyChecked}>Survery</option>
                        </select>
                    </div>
                    <div>
                        <label for="formId">Form ID:</label> <input type="text" name="formId" id="formId" value={props.attributes.formID} onChange={(event) => {
                            props.setAttributes({formID: event.target.value}); 
                        }} />
                    </div>
                    <div className="input-control">
                        <p class="help-tip">If more than one optional variable is needed, separate them with a comma.</p>
                        <label>Optional Variable: <Dashicon icon="editor-help" className="help-dashicon" onClick={ helpTips}/><input type="text" name="optional-variable" id="optional-variable" value={props.attributes.ghlVars} placeholder="var=name" onChange={(event)=>{
                            props.setAttributes({ghlVars: event.target.value});
                        }} /></label>
                    </div>
                    <div  className="input-control">
                        <p class="help-tip">The "Lead Value" is how much the lead is worth and will be passed to the dataLayer as "lead_value." 
                    The dataLayer event is "generate_lead.</p>
                        <label for="lead-value">Lead Value: <Dashicon icon="editor-help" className="help-dashicon" onClick={helpTips}/></label> <input type="number" name="lead-value" id="lead-value" value={props.attributes.ghlVal} onChange={(event)=> {
                            let ghlValNumber = parseInt(event.target.value);
                            props.setAttributes({ghlVal: ghlValNumber})
                        }} />
                    </div>
                    <div className="input-control">
                    <p class="help-tip">This is the page that the user will be redirected to when they submit the form. It is set in GHL.</p>
                        <label for="lead-thanks">Response Page: <Dashicon icon="editor-help" className="help-dashicon" onClick={helpTips}/></label> <input type="text" name="lead-thanks" id="lead-thanks" placeholder="Title of response page (thank you)." value={props.attributes.ghlThanks} onChange={(event)=> {
                            props.setAttributes({ghlThanks: event.target.value})
                        }} />
                    </div>
                </form>
            </div>
        )
    },
    save: () => {
        return null
    }
 });

 function helpTips(e){
    const parentOf = e.target.parentElement.parentElement;
    parentOf.querySelector(".help-tip").classList.toggle("help-top-show");
 }
