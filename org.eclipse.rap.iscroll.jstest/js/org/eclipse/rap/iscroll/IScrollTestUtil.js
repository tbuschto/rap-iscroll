/*****************************************************************************
 * Copyright (c) 2012 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

(function(){

var Processor = org.eclipse.rwt.protocol.Processor;
var ObjectManager = org.eclipse.rwt.protocol.ObjectManager;
var MobileWebkitSupport = org.eclipse.rwt.MobileWebkitSupport;


org.eclipse.rap.iscroll.IScrollTestUtil = {

  touch : function( type, iscroll, pos, element, touchLength ) {
    var hasTouch = iscroll.getHasTouch();
    var eventType;
    switch( type ) {
      case "start":
        eventType = hasTouch ? "touchstart" : "mousedown";
      break;
      case "move":
        eventType = hasTouch ? "touchmove" : "mousemove";
      break;
      case "end":
        eventType = hasTouch ? "touchend" : "mouseup";
      break;
    };
    var target = element ? element : iscroll.scroller;
    var touch = {
        "pageX" : pos[ 0 ],
        "pageY" : pos[ 1 ],
        "clientX" : pos[ 0 ],
        "clientY" : pos[ 1 ],
        "target" : target
    };
    var touches = [ touch ];
    if( touchLength != undefined ) {
      touches.length = touchLength;
    } else if( type === "end" ) {
      touches.length = 0;
    }
    var fakeEv = {
      "_prevented" : false,
      "type" : eventType,
      "touches" : touches,
      "changedTouches" : [ touch ],
      "pageX" : pos[ 0 ],
      "pageY" : pos[ 1 ],
      "clientX" : pos[ 0 ],
      "clientY" : pos[ 1 ],
      "target" : target,
      "button" : 0,
      "preventDefault" : function(){
        this._prevented = true;
      }
    };
    var itemFunction = function( i ){
      var result = this[ i ];
      return result ? result : null;
    };
    fakeEv.touches.item = itemFunction;
    fakeEv.changedTouches.item = itemFunction;
    if( iscroll.enabled || type === "start" ) {
      iscroll.handleEvent( fakeEv );
    }
    if( element ) {
      fakeEv.type = "touch" + type;
      MobileWebkitSupport._onTouchEvent( fakeEv );
    }
    return fakeEv._prevented;
  },

  createScrolledComposite : function() {
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
    return ObjectManager.getObject( "w3" );
  },

  createChildScrolledComposite : function() {
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
    return ObjectManager.getObject( "w5" );
  },

  createGrid : function() {
    org.eclipse.rwt.protocol.Processor.processOperation( {
      "target" : "w5",
      "action" : "create",
      "type" : "rwt.widgets.Tree",
      "properties" : {
        "style" : [],
        "parent" : "w4",
        "appearance" : "tree",
        "selectionPadding" : [ 2, 4 ],
        "itemCount" : 100,
        "indentionWidth" : 16,
        "checkBoxMetrics" : [ 5, 16 ],
        "bounds" : [ 0, 0, 500, 500 ]
      }
    } );
    var id = 10;
    for( var i = 0; i < 100; i++ ) {
      org.eclipse.rwt.protocol.Processor.processOperation( {
        "target" : "w" + id,
        "action" : "create",
        "type" : "rwt.widgets.TreeItem",
        "properties" : {
          "parent" : "w5",
          "index": i
        }
      } );
      id++;
    }
    return ObjectManager.getObject( "w5" );
  },

  getScrollBarValues : function( scrollable ) {
    var result = [];
    result[ 0 ] = scrollable._horzScrollBar.getValue();
    result[ 1 ] = scrollable._vertScrollBar.getValue();
    return result;
  }

};

}());