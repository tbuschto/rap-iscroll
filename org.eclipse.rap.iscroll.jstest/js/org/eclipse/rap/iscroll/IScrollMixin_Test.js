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

org.eclipse.rap.iscroll.IScrollSupport.activate();

(function(){

var TestUtil = org.eclipse.rwt.test.fixture.TestUtil;
var Processor = org.eclipse.rwt.protocol.Processor;
var ObjectManager = org.eclipse.rwt.protocol.ObjectManager;
var IScrollMixin = org.eclipse.rap.iscroll.IScrollMixin;
var IScroll = org.eclipse.rap.iscroll.IScroll;

var touch = org.eclipse.rap.iscroll.IScrollTestUtil.touch;

var shell;
var scrollable;
var clientArea;
var content;

qx.Class.define( "org.eclipse.rap.iscroll.IScrollMixin_Test", {

  extend : qx.core.Object,

  members : {

    testScrollableIncludesMixin : function() {
      assertTrue( qx.Class.hasMixin( scrollable.constructor, IScrollMixin ) );
    },

    testCreateIScroll: function() {
      assertTrue( scrollable.getIScroll() instanceof IScroll );
    },

    testIScrollElements : function() {
      assertIdentical( clientArea.getElement(), scrollable.getIScroll().wrapper );
      assertIdentical( clientArea._getTargetNode(), scrollable.getIScroll().scroller );
    },

    testDestroy : function() {
      var iscroll = scrollable.getIScroll();

      scrollable.destroy();
      TestUtil.flush();

      assertTrue( scrollable.isDisposed() );
      assertNull( scrollable.getIScroll() );
      assertNull( iscroll.scroller );
      assertNull( iscroll.wrapper );
    },

    testNoOverflow : function() {
      assertEquals( "hidden", clientArea.getOverflow() );
    },

    testIScrollMaxScroll : function() {
      // Note: scrollable ( 100 ) - scrollbar( 10 ) - content (1000) = -910
      assertEquals( -910, scrollable.getIScroll().maxScrollX );
      assertEquals( -910, scrollable.getIScroll().maxScrollY );
    },

    testIScrollMaxScrollChangedByContent : function() {
      content.setWidth( 500 );
      content.setHeight( 1500 );
      TestUtil.flush();

      assertEquals( -410, scrollable.getIScroll().maxScrollX );
      assertEquals( -1410, scrollable.getIScroll().maxScrollY );
    },

    testIScrollMaxScrollChangedByScrollable : function() {
      scrollable.setWidth( 50 );
      scrollable.setHeight( 300 );
      TestUtil.flush();

      assertEquals( -960, scrollable.getIScroll().maxScrollX );
      assertEquals( -710, scrollable.getIScroll().maxScrollY );
    },

    testSetScrollbarSelection : function() {
      scrollable.setHBarSelection( 100 );
      scrollable.setVBarSelection( 200 );

      assertEquals( -100, scrollable.getIScroll().x );
      assertEquals( -200, scrollable.getIScroll().y );
    },

    testGetScrollPosition : function() {
      scrollable.getIScroll().setScrollPosition( -40, -10 );

      assertEquals( 40, clientArea.getScrollLeft() );
      assertEquals( 10, clientArea.getScrollTop() );
    },

    testGetScrollPositionNegative : function() {
      // iScroll can have out of bounds scroll positions when "bouncing"
      scrollable.getIScroll().setScrollPosition( 40, 10 );

      assertEquals( 40, scrollable.getIScroll().x );
      assertEquals( 10, scrollable.getIScroll().y );
      assertEquals( 0, clientArea.getScrollLeft() );
      assertEquals( 0, clientArea.getScrollTop() );
    },

    testGetScrollPositionOverMax : function() {
      scrollable.getIScroll().setScrollPosition( -950, -950 );

      assertEquals( -950, scrollable.getIScroll().x );
      assertEquals( -950, scrollable.getIScroll().y );
      assertEquals( 910, clientArea.getScrollLeft() );
      assertEquals( 910, clientArea.getScrollTop() );
    },

    testUserScrollEvents : function() {
      var log = [];
      scrollable.addEventListener( "userScroll", function(){
        log.push( this._getScrollbarValues( scrollable ) );
      }, this );
      var iscroll = scrollable.getIScroll();

      touch( "start", iscroll, [ 100, 100 ] );
      touch( "move", iscroll, [ 90, 90 ] );
      touch( "move", iscroll, [ 60, 90 ] );
      touch( "end", iscroll, [ 60, 90 ] );

      assertEquals( 3, log.length );
      assertEquals( [ 10, 10 ], log[ 1 ] );
      assertEquals( [ 40, 10 ], log[ 2 ] );
    },

    testDisableOuterScrolledIScroll : function() {
      var log = [];
      Processor.processOperation( {
        "target" : "w5",
        "action" : "create",
        "type" : "rwt.widgets.ScrolledComposite",
        "properties" : {
          "style" : [],
          "parent" : "w4",
          "content" : "w6",
          "scrollBarsVisible" : [ true, true ],
          "bounds" : [ 0, 0, 100, 100 ]
        }
      } );
      Processor.processOperation( {
        "target" : "w6",
        "action" : "create",
        "type" : "rwt.widgets.Composite",
        "properties" : {
          "style" : [],
          "parent" : "w3",
          "bounds" : [ 0, 0, 1000, 1000 ]
        }
      } );
      TestUtil.flush();
      var innerScrollable = ObjectManager.getObject( "w5" );
      var iscroll = scrollable.getIScroll();
      var innerIscroll = innerScrollable.getIScroll();

      log.push( iscroll.enabled );
      touch( "start", innerIscroll, [ 100, 100 ] );
      log.push( iscroll.enabled );
      touch( "move", innerIscroll, [ 90, 90 ] );
      log.push( iscroll.enabled );
      touch( "end", innerIscroll, [ 60, 90 ] );
      log.push( iscroll.enabled );

      assertEquals( [ true, false, false, true ], log );
    },

    setUp : function() {
      shell = TestUtil.createShellByProtocol( "w2" );
      Processor.processOperation( {
        "target" : "w3",
        "action" : "create",
        "type" : "rwt.widgets.ScrolledComposite",
        "properties" : {
          "style" : [],
          "parent" : "w2",
          "content" : "w4",
          "scrollBarsVisible" : [ true, true ],
          "bounds" : [ 0, 0, 100, 100 ]
        }
      } );
      Processor.processOperation( {
        "target" : "w4",
        "action" : "create",
        "type" : "rwt.widgets.Composite",
        "properties" : {
          "style" : [],
          "parent" : "w3",
          "bounds" : [ 0, 0, 1000, 1000 ]
        }
      } );
      scrollable = ObjectManager.getObject( "w3" );
      content = ObjectManager.getObject( "w4" );
      clientArea = scrollable.getClientAreaWidget();
      TestUtil.flush();
    },

    tearDown : function() {
      shell.destroy();
      shell = null;
      scrollable = null;
      content = null;
      clientArea = null;
    },

    _getScrollbarValues : function( scrollable ) {
      var result = [];
      result[ 0 ] = scrollable._horzScrollBar.getValue();
      result[ 1 ] = scrollable._vertScrollBar.getValue();
      return result;
    }

  }

} );

}());