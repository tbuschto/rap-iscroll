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
package org.eclipse.rap.iscroll.internal;

import java.io.IOException;
import java.io.InputStream;

import org.eclipse.rap.iscroll.internal.resources.*;
import org.eclipse.rap.rwt.jstest.TestContribution;


public class IScrollResourcesContribution implements TestContribution {

  private static final String PATH_PREFIX = "/org/eclipse/rap/iscroll/";

  private static final String[] RESOURCES = new String[] {
    "IScroll.js",
  };

  public String getName() {
    return "iScroll";
  }

  public String[] getResources() {
    String[] result = new String[ RESOURCES.length ];
    for( int i = 0; i < result.length; i++ ) {
      result[ i ] = PATH_PREFIX + RESOURCES[ i ];
    }
    return result;
  }

  public InputStream getResourceAsStream( String resourceName ) throws IOException {
    return IScrollResource.class.getResourceAsStream( resourceName );
  }

}
