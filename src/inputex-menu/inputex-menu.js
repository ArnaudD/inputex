/**
 * @module inputex-menu
 */
YUI.add("inputex-menu",function(Y){
	
   var inputEx     = Y.inputEx,
       lang        = Y.Lang;
       substitute  = Y.substitute,
       create      = Y.Node.create;
	
/**
 * Create a menu field
 * @class inputEx.MenuField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *    <li>typeInvite    : text to display when no selection made</li>
 *	   <li>menuItems     : contains descriptions of menu items</li>
 *	   <li>menuTrigger   : event to trigger menu show</li> TODO
 *    <li>menuPosition  : array of corners positions (syntax : ['menu popup corner','invite div corner'])</li> TODO
 *    <li>menuConfig (optional) : object used as a config for the YUI Menu generated by MenuField TODO
 * </ul>
 */
inputEx.MenuField = function(options) {
	inputEx.MenuField.superclass.constructor.call(this,options);
};

inputEx.MenuField.MENU_TEMPLATE = 
   '<div class="yui3-menu">' +
       '<div class="yui3-menu-content">' +
           '<ul>' +
               '{menu_items}' +
           '</ul>' +
       '</div>' +
   '</div>';

inputEx.MenuField.MENU_ITEM_TEMPLATE = 
   '<li class="{item_class}">' +
      '<a href="{href}" class="{label_class}">' +
         '{label}' +
      '</a>' +
      '{submenu}' +
   '</li>';

Y.extend(inputEx.MenuField, inputEx.Field, {
   /**
    * Set the default values of the options
    * @param {Object} options Options object as passed to the constructor
    */
	setOptions: function(options) {
	   inputEx.MenuField.superclass.setOptions.call(this,options);
	   
	   // Overwrite options:
	   this.options.className = options.className ? options.className : 'inputEx-Field inputEx-MenuField';
	   
	   // New options
	   this.options.typeInvite = options.typeInvite || inputEx.messages.menuTypeInvite;
	   this.options.menuTrigger = options.menuTrigger || "click";
	   this.options.menuPosition = options.menuPosition || ["tl","tr"];
	   this.options.menuItems = options.menuItems;
	   
	   // Configuration options for the generated YUI Menu instance
	   this.options.menuConfig = options.menuConfig || {};
	},

   /**
    * Build a menu
    */
   renderComponent: function() {
      // Keep selected value in a hidden field
      this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.options.value || ''});
      this.fieldContainer.appendChild(this.hiddenEl);
      this.renderMenu(this.fieldContainer);
      // TODO Set initial value if exists
   },

   // Parse menuItems option to add ids, listeners, etc.
   renderMenu: function(container) {
      var that = this;

      // Keep corresponding text for each value selectable in the menu
      //   -> will be used to display selection after click
      this._textFromValue = {};


      var renderMenuRecurs = function (conf, level) {
         if (level>5) throw new Error("MenuField : too much recursion, menuItems property should be 5 level deep at most.");

         var html = '',
             length = conf.length,
             item,
             templateData,
             i;

         for (i = 0; i < length; i++) {
            item = conf[i];

            if (lang.isUndefined(item.text) && !lang.isUndefined(item.value)) {
               item.text = item.value;
            }
            if (lang.isUndefined(item.value) && !lang.isUndefined(item.text)) {
               item.value = item.text;
            }

            templateData = {
               label:         item.text,
               href:          '#'+item.value,
               submenu:       '',
               label_class:   'yui3-menuitem-content',
               item_class:    ''
            };

            // item with submenu
            if (!lang.isUndefined(item.submenu)) {
               templateData.label_class = 'yui3-menu-label';
               templateData.submenu     = renderMenuRecurs(item.submenu.itemdata,level+1);
            } else {
               that._textFromValue[item.value] = item.text;
            }

            html += substitute(inputEx.MenuField.MENU_ITEM_TEMPLATE, templateData)
         }

         return substitute(inputEx.MenuField.MENU_TEMPLATE, {
            menu_items: html
         });

      };
      this._menu = create(renderMenuRecurs([{text: this.options.typeInvite, submenu: {itemdata: this.options.menuItems}}], 0));
      this._menu.plug(Y.Plugin.NodeMenuNav);
      this._menu.appendTo(container);
   },

   initEvents: function() {
      this._menu.delegate('click', Y.bind(this.onItemClick, this), 'a');
   },

   onItemClick: function(e) {
      e.preventDefault();
      if (e.currentTarget.hasClass ('yui3-menuitem-content')) {
         this.setValue(e.currentTarget.getAttribute('href').substring(1), true);
         this._menu.menuNav._hideAllSubmenus(this._menu.menuNav._rootMenu);
      }
   },

   getValue: function() {
      return this.hiddenEl.value;
   },

   setValue: function(value, sendUpdatedEvt) {
      if (! this._rootItemLabel) {
         this._rootItemLabel = this._menu.one('.yui3-menu-label');
      }

      // update text
      this._rootItemLabel.setContent(this._textFromValue[value] || this.options.typeInvite);

      // set value
      this.hiddenEl.value = (!!this._textFromValue[value]) ? value : '';
      inputEx.MenuField.superclass.setValue.call(this, value, sendUpdatedEvt);
   }

});

// Register this class as "menu" type
inputEx.registerType("menu", inputEx.MenuField);

}, '3.0.0a',{
requires: ['inputex-field', 'node-event-delegate', 'node-menunav', 'substitute']
});
