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
var IScrollMixin = org.eclipse.rap.iscroll.IScrollMixin;
var Client = org.eclipse.rwt.Client;

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
      qx.Class.__initializeClass( Scrollable );
      qx.Class.patch( Scrollable, IScrollMixin );
    }
  }

};

org.eclipse.rap.iscroll.IScrollSupport.autoActivate();

}());