<?php
/**
 * Plugin Name: Go High Level Leads Plugin
 * Description: This is a GHL block for adding forms or surveys to a page.
 * Version: 1.2.2
 * Author: Mark Tank
 */

if( ! defined('ABSPATH') ) exit;

class GHL_plugin_block {

    public $postTitle;

    function __construct() {
        
        add_action('init', array($this,'ghl_enqueue_script'));

        add_action('wp_loaded', array($this,'loadIframeSizer'));

    }

    function loadIframeSizer() {

        wp_enqueue_script( 'ghl-thankyou-script', plugin_dir_url( __FILE__ ).'thankyou.min.js', true, true );

        wp_register_script('ghl-form-adjustment', 'https://api.montanashedcenter.com/js/form_embed.js', true);

        register_block_type('ghlleadblock/ghl-lead-block', array(
            'editor_script' => 'ghl-form-adjustment',
            'editor_style' => 'ghl-form-css',
            'render_callback' => array($this, 'blockHTML')
        ));
    }

    function blockHTML($attributes) {
        $passThese = json_encode( array( $attributes['ghlVal'], $attributes['ghlThanks'], $attributes['formID'] ) );
        if(!empty($attributes['formType'])) {
            $varParamenter = $this->getArgs($attributes['ghlVars']);
            return <<<HTML
                <div id="GHL-Survey">
                    <iframe src="https://api.montanashedcenter.com/widget/{$attributes['formType']}/{$attributes['formID']}/{$varParamenter}" style="border:none;width:100%; background-color: #ffffffaa;" scrolling="no" id="{$attributes['formID']}"></iframe>
                    <script src="https://api.montanashedcenter.com/js/form_embed.js"></script>
                    <input type="text" id="form-values" style="display: none;" value='{$passThese}' />
                </div>
            HTML;
        }
        else {
            return '<h3>Please set the from type.</h3>';
        }
    }

    function getArgs($vars) {
        $count = 0;
        if(strlen($vars) > 0) {
            $vars = (strpos($vars,',') > 0) ? explode(',',$vars) : $vars;
            if(is_array($vars)) {
                foreach($vars AS $key=>$val) {
                    $pares = $val.explode('=');
                    $allPares[$pares[0]] = $pares[1];
                }
            }
            else {
                $pares = explode('=',$vars);
                $allPares[$pares[0]] = $pares[1];
                
            }
            foreach($allPares AS $key=>$val) {
                if($count == 0) {
                    $paramenters = '?'.$key.'='.$val;
                }
                else {
                    $paramenters .= '&'.$key.'='.$val;
                }
                $count++;
            }
            return $paramenters;
        }
        else {
            return '';
        }
    }

    function ghl_enqueue_script() {
        wp_register_style( 'ghl-form-css', plugin_dir_url( __FILE__ ).'build/index.css');
        wp_enqueue_script( 'ghl-form-script', plugin_dir_url( __FILE__ ).'build/index.js', array('wp-blocks','wp-element','wp-editor'), true, true);

    }
}

$GHLblock = new GHL_plugin_block();