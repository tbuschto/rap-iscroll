﻿/*******************************************************************************
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

org.eclipse.rap.iscroll.IScrollTestUtil = {

  touch : function( type, iscroll, pos ) {
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
    var touch = {
        "pageX" : pos[ 0 ],
        "pageY" : pos[ 1 ],
        "target" : iscroll.scroller
    };
    var fakeEv = {
      "type" : eventType,
      "touches" : type === "end" ? [] : [ touch ],
      "changedTouches" : [ touch ],
      "pageX" : pos[ 0 ],
      "pageY" : pos[ 1 ],
      "target" : iscroll.scroller,
      "button" : 0
    };
    if( iscroll.enabled || type === "start" ) {
      iscroll.handleEvent( fakeEv );
    }
  }

};

}());