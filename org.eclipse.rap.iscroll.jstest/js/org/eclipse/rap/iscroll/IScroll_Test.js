/*******************************************************************************
 * Copyright (c) 2012 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

(function() {

var IScroll = org.eclipse.rap.iscroll.IScroll;

var div;
var wrapper;
var scroller;

qx.Class.define( "org.eclipse.rap.iscroll.IScroll_Test", {

  extend : qx.core.Object,

  members : {

    testIScrollIsPresent : function() {
      assertEquals( "function", typeof IScroll );
    },

    testCreateInstannce : function() {
      var iScroll = new IScroll( wrapper );
      assertTrue( iScroll instanceof IScroll );
    },

    testSetGetPosition : function() {
      var iScroll = new IScroll( wrapper );

      iScroll._pos( 10, 15 );

      assertEquals( 10, iScroll.x );
      assertEquals( 15, iScroll.y );
    },

    setUp : function() {
      div = document.createElement( "div" );
      document.body.appendChild( div );
      wrapper = document.createElement( "div" );
      wrapper.style.width = "100px";
      wrapper.style.height = "100px";
      div.appendChild( wrapper );
      scroller = document.createElement( "div" );
      scroller.style.width = "1000px";
      scroller.style.height = "1000px";
      wrapper.appendChild( scroller );
    },

    tearDown : function() {
      document.body.removeChild( div );
      div = null;
      wrapper = null;
      scroller = null;
    }

  }

} );

}());