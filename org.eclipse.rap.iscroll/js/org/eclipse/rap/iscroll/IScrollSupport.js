/*******************************************************************************
 * Copyright (c) 2012, 2013 EclipseSource
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

rwt.qx.Class.createNamespace( "org.eclipse.rap.iscroll", {} );

(function(){

var Scrollable = rwt.widgets.base.Scrollable;
var IScroll = org.eclipse.rap.iscroll.IScroll;
var IScrollMixin = org.eclipse.rap.iscroll.IScrollMixin;
var IScrollUtil = org.eclipse.rap.iscroll.IScrollUtil;
var MobileWebkitSupport = rwt.runtime.MobileWebkitSupport;
var Client = rwt.client.Client;

org.eclipse.rap.iscroll.IScrollSupport = {

  _active : false,

  autoActivate : function() {
    if( Client.isAndroidBrowser() ) {
      this.activate();
    }
  },

  activate : function() {
    if( !this._active ) {
      this._active = true;
      this._patchIScroll();
      this._patchScrollable();
      this._patchMobileWebkitSupport();
      MobileWebkitSupport.setTouchScrolling( true ); // required for grid outer scrolling
      MobileWebkitSupport.setTouchScrolling = function(){};
    }
  },

  _patchScrollable : function() {
    rwt.qx.Class.__initializeClass( Scrollable );
    rwt.qx.Class.patch( Scrollable, IScrollMixin );
  },

  _patchIScroll : function() {
    var proto = IScroll.prototype;
    var original = proto.handleEvent;
    proto.handleEvent = function( ev ) {
      try {
        original.call( this, ev );
      } catch( ex ) {
        org.eclipse.rwt.ErrorHandler.processJavaScriptError( ex );
      }
    };
  },

  _patchMobileWebkitSupport : function() {
    this._wrap( MobileWebkitSupport, "_initVirtualScroll", function( widget ) {
      var scrollable;
      if( widget instanceof rwt.widgets.base.GridRow ) {
        scrollable = widget.getParent().getParent();
      } else {
        scrollable = this._findScrollable( widget );
      }
      IScrollUtil.disableOuterScrollables( scrollable );
      this._touchSession.virtualScrollable = scrollable;
    } );
    this._wrap( MobileWebkitSupport, "_handleTouchMove", function( event ) {
      event.preventDefault();
      if( this._touchSession.virtualScrollable && this._touchSession.type.scroll ) {
        var outer = IScrollUtil.getOuterScrollables( this._touchSession.virtualScrollable )[ 0 ];
        outer.getIScroll().enable();
        outer.getIScroll()._start( event );
      }
    } );
    this._wrap( MobileWebkitSupport, "_finishVirtualScroll", function() {
      IScrollUtil.enableOuterScrollables( this._touchSession.virtualScrollable );
    } );
  },

  _wrap : function( context, originalName, wrapper ) {
    var originalFunction = context[ originalName ];
    context[ originalName ] = function() {
      originalFunction.apply( context, arguments );
      wrapper.apply( context, arguments );
    };
  }

};

org.eclipse.rap.iscroll.IScrollSupport.autoActivate();

}());
