/*******************************************************************************
 * Copyright (c) 2013 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/
package org.eclipse.rap.iscroll;

import java.io.IOException;
import java.io.InputStream;

import org.eclipse.rap.rwt.RWT;
import org.eclipse.rap.rwt.client.service.JavaScriptLoader;


public final class IScroll {

  public static final String[] RESOURCES = new String[] {
    "org/eclipse/rap/iscroll/IScrollUtil.js",
    "org/eclipse/rap/iscroll/IScroll.js",
    "org/eclipse/rap/iscroll/IScrollMixin.js",
    "org/eclipse/rap/iscroll/IScrollSupport.js"
  };

  public static void activate() {
    ensureRegistered();
    ensureLoaded();
  }

  private static void ensureRegistered() {
    if( RWT.getResourceManager().isRegistered( RESOURCES[ 0 ] ) ) {
      deregister();
    }
    try {
      register();
    } catch( IOException exception ) {
      throw new RuntimeException( "Failed to register resources", exception );
    }
  }

  private static void ensureLoaded() {
    for( String script : RESOURCES ) {
      JavaScriptLoader loader = RWT.getClient().getService( JavaScriptLoader.class );
      loader.require( RWT.getResourceManager().getLocation( script ) );
    }
  }

  private static void register() throws IOException {
    for( String script : RESOURCES ) {
      InputStream inputStream = getResourceAsStream( script );
      try {
        RWT.getResourceManager().register( script, inputStream );
      } finally {
        inputStream.close();
      }
    }
  }

  private static void deregister() {
    for( String script : RESOURCES ) {
      RWT.getResourceManager().unregister( script );
    }
  }

  public static InputStream getResourceAsStream( String resourceName ) {
    ClassLoader classLoader = IScroll.class.getClassLoader();
    InputStream inputStream = classLoader.getResourceAsStream( resourceName );
    if( inputStream == null ) {
      throw new RuntimeException( "Resource not found: " + resourceName );
    }
    return inputStream;
  }

  private IScroll() {
  }

}
