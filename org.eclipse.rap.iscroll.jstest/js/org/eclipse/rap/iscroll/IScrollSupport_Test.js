﻿/*******************************************************************************
 * Copyright (c) 2012, 2013 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

org.eclipse.rap.iscroll.IScrollSupport.activate();

(function(){

var TestUtil = org.eclipse.rwt.test.fixture.TestUtil;
var IScrollMixin = org.eclipse.rap.iscroll.IScrollMixin;
var IScrollTestUtil = org.eclipse.rap.iscroll.IScrollTestUtil;

var touch = org.eclipse.rap.iscroll.IScrollTestUtil.touch;

var scrollable;
var iscroll;
var shell;

rwt.qx.Class.define( "org.eclipse.rap.iscroll.IScrollSupport_Test", {

  extend : rwt.qx.Object,

  members : {

    testScrollableIncludesMixin : function() {
      assertTrue( rwt.qx.Class.hasMixin( scrollable.constructor, IScrollMixin ) );
    },

    testScrollGrid : function() {
      var grid = IScrollTestUtil.createGrid();
      TestUtil.flush();
      var element = grid.getRowContainer().getFirstChild().getElement();

      touch( "start", iscroll, [ 50, 150 ], element );
      touch( "move", iscroll, [ 50, 100 ], element );
      touch( "end", iscroll, [ 50, 100 ], element );

      assertEquals( 4, grid.getTopItemIndex() );
    },

    testScrollGridWithoutScrollable : function() {
      var grid = IScrollTestUtil.createGrid();
      TestUtil.flush();
      var element = grid.getRowContainer().getFirstChild().getElement();

      touch( "start", iscroll, [ 50, 150 ], element );
      touch( "move", iscroll, [ 50, 100 ], element );
      touch( "end", iscroll, [ 50, 100 ], element );

      assertEquals( 0, iscroll.y );
    },

    testScrollScrollableAfterGrid : function() {
      var grid = IScrollTestUtil.createGrid();
      TestUtil.flush();
      var element = grid.getRowContainer().getFirstChild().getElement();

      touch( "start", iscroll, [ 50, 150 ], element );
      touch( "move", iscroll, [ 50, 100 ], element );
      touch( "end", iscroll, [ 50, 100 ], element );
      touch( "start", iscroll, [ 50, 150 ] );
      touch( "move", iscroll, [ 50, 100 ] );
      touch( "end", iscroll, [ 50, 100 ] );

      assertEquals( -50, iscroll.y );
    },

    testScrollScrollableInsteadOfGrid : function() {
      var grid = IScrollTestUtil.createGrid();
      TestUtil.flush();
      var element = grid.getRowContainer().getFirstChild().getElement();
      scrollable.getIScroll().setScrollPosition( -50, -50 );

      touch( "start", iscroll, [ 50, 100 ], element );
      touch( "move", iscroll, [ 50, 101 ], element );
      touch( "move", iscroll, [ 50, 131 ], element );
      touch( "end", iscroll, [ 50, 131 ], element );

      assertEquals( -20, iscroll.y );
    },


    /////////
    // Helper

    setUp : function() {
      shell = TestUtil.createShellByProtocol( "w2" );
      scrollable = IScrollTestUtil.createScrolledComposite();
      TestUtil.flush();
      iscroll = scrollable.getIScroll();
    },

    tearDown : function() {
      shell.destroy();
      shell = null;
      scrollable = null;
      iscroll = null;
    }

  }

} );

}());
