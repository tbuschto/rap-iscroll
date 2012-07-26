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

var Scrollable = org.eclipse.swt.widgets.Scrollable;
var IScroll = org.eclipse.rap.iscroll.IScroll;
var IScrollMixin = org.eclipse.rap.iscroll.IScrollMixin;
var MobileWebkitSupport = org.eclipse.rwt.MobileWebkitSupport;
var Client = org.eclipse.rwt.Client;

org.eclipse.rap.iscroll.IScrollUtil = {

  getOuterScrollables : function( widget ) {
    if( widget._outerScrollables == null ) {
      var parent = widget.getParent();
      widget._outerScrollables = [];
      while( parent ) {
        if( parent.getIScroll ) {
          widget._outerScrollables.push( parent );
        }
        parent = parent.getParent();
      }
    }
    return widget._outerScrollables;
  },

  disableOuterScrollables : function( widget ){
    var scrollables = this.getOuterScrollables( widget );
    for( var i = 0; i < scrollables.length; i++ ) {
      scrollables[ i ].getIScroll().disable();
    }
  },

  enableOuterScrollables : function( widget ){
    var scrollables = this.getOuterScrollables( widget );
    for( var i = 0; i < scrollables.length; i++ ) {
      scrollables[ i ].getIScroll().enable();
    }
  }

};


}());