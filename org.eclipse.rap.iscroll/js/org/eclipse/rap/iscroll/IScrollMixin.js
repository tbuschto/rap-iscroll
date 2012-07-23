/*******************************************************************************
 * Copyright (c) 2012 EclipseSource
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

qx.Class.createNamespace( "org.eclipse.rap.iscroll", {} );

(function(){

var IScroll = org.eclipse.rap.iscroll.IScroll;


qx.Mixin.define( "org.eclipse.rap.iscroll.IScrollMixin", {

  construct : function() {
    this._iscroll = null;
    this._patchClientAreaWidget();
  },

  members : {

    /////////
    // PUBLIC

    getIScroll : function() {
      return this._iscroll;
    },

    getClientAreaWidget : function() {
      return this._clientArea;
    },

    //////////////
    // OVERWRITTEN

    setScrollBarsVisible : function( horizontal, vertical ) {
      this._horzScrollBar.setDisplay( horizontal );
      this._vertScrollBar.setDisplay( vertical );
      // omit setting overflow
      this._layoutX();
      this._layoutY();
    },

    _configureClientArea : function() {
      this.base( arguments );
      this._clientArea.setOverflow( "hidden" );
    },

    _onClientCreate : function( evt ) {
      this._clientArea.prepareEnhancedBorder();
      this._clientArea.setContainerOverflow( false );
      qx.html.Scroll.disableScrolling( this._clientArea.getElement() );
      this._createIScroll();
    },

    _onClientAppear : function() {
      this._refreshScroller();
      this.base( arguments );
    },

    _onClientLayout : function() {
      this._iscroll.refresh();
    },

    ////////////
    // INTERNALS

    _createIScroll : function() {
      var that = this;
      var options = {
        "onScroll" : function() {
          that.__onscroll( {} );
        }
      };
      this._iscroll = new IScroll( this._clientArea.getElement(), options );
    },

    _patchClientAreaWidget : function() {
      var that = this;
      this._clientArea.setScrollTop = function( value ) {
        that._iscroll.setScrollPosition( that._iscroll.x, ( value * -1 ) );
      };
      this._clientArea.setScrollLeft = function( value ) {
        that._iscroll.setScrollPosition( ( value * -1 ), that._iscroll.y );
      };
      this._clientArea.getScrollTop = function() {
        return that._getClientScrollTop();
      };
      this._clientArea.getScrollLeft = function() {
        return that._getClientScrollLeft();
      };
      this._clientArea._flushChildrenQueue = function() {
        this.constructor.prototype._flushChildrenQueue.call( this );
        that._refreshScroller();
      };
    },

    _refreshScroller : function() {
      this._layoutScroller();
      this._iscroll.refresh();
    },

    _layoutScroller : function() {
      var node = this._clientArea._getTargetNode();
      node.style.width = "0px";
      node.style.height = "0px";
      node.style.width = node.scrollWidth + "px";
      node.style.height = node.scrollHeight + "px";
    },

    _getClientScrollLeft : function() {
      var actual = this._iscroll.x * -1;
      var max = this._iscroll.maxScrollX * -1;
      return Math.min( Math.max( 0, actual ), max );
    },

    _getClientScrollTop : function() {
      var actual = this._iscroll.y * -1;
      var max = this._iscroll.maxScrollY * -1;
      return Math.min( Math.max( 0, actual ), max );
    }

  }

} );

}());