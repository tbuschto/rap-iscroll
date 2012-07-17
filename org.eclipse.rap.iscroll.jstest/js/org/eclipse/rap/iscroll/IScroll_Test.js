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

qx.Class.define( "org.eclipse.rap.iscroll.IScroll_Test", {

  extend : qx.core.Object,

  members : {
    
    testIScrollIsPresent : function() {
      assertEquals( "function", typeof org.eclipse.rap.iscroll.IScroll );
    }
    
  }

} );

}());