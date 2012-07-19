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

qx.Mixin.define( "org.eclipse.rap.iscroll.IScrollMixin", {

  members : {

  }

} );

qx.Class.patch( org.eclipse.swt.widgets.Scrollable, org.eclipse.rap.iscroll.IScrollMixin );

}());