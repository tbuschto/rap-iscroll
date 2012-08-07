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

package org.eclipse.rap.iscroll.demo;

import org.eclipse.rwt.lifecycle.IEntryPoint;
import org.eclipse.rwt.widgets.DialogCallback;
import org.eclipse.rwt.widgets.DialogUtil;
import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.ScrolledComposite;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.MouseListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.List;
import org.eclipse.swt.widgets.MessageBox;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableItem;
import org.eclipse.swt.widgets.Text;
import org.eclipse.swt.widgets.ToolTip;

public class IScrollDemo implements IEntryPoint {

  public int createUI() {
    Display display = new Display();
    Shell shell = new Shell( display, SWT.NONE );
    shell.setLayout( new GridLayout( 3, true ) );
    shell.setFullScreen( true );
    List list = createList( shell );
    //createTable( shell );
    ScrolledComposite scrolledComposite = createScrolledComposite( shell );
    createTestControls( shell, scrolledComposite, list );
    shell.open();
    while( !shell.isDisposed() ) {
      if( !display.readAndDispatch() ) {
        display.sleep();
      }
    }
    display.dispose();
    return 0;
  }


  private List createList( Composite parent ) {
    List list = new List( parent, SWT.BORDER | SWT.V_SCROLL );
    list.setLayoutData( new GridData( SWT.FILL, SWT.FILL, true, true ) );
    for( int i = 0; i < 50; i++ ) {
      list.add( "ListItem " + i );
    }
    return list;
  }

  private void createTestControls( final Composite parent, final ScrolledComposite scrolled, final List list ) {
    Composite composite = new Composite( parent, SWT.BORDER  );
    composite.setLayout( new GridLayout( 2, false ) );
    composite.setLayoutData( new GridData( SWT.FILL, SWT.FILL, true, true ) );
    Button lastC = new Button( composite, SWT.PUSH );
    lastC.setText( "show last control" );
    lastC.addSelectionListener( new SelectionAdapter() {
      public void widgetSelected( SelectionEvent e ) {
        Composite content = ( Composite )scrolled.getContent();
        Control[] children = content.getChildren();
        scrolled.showControl( children[ children.length - 1 ] );
      }
    } );
    Button firstC = new Button( composite, SWT.PUSH );
    firstC.setText( "show first control" );
    firstC.addSelectionListener( new SelectionAdapter() {
      public void widgetSelected( SelectionEvent e ) {
        Composite content = ( Composite )scrolled.getContent();
        Control[] children = content.getChildren();
        scrolled.showControl( children[ 0 ] );
      }
    } );
    Button lastItem = new Button( composite, SWT.PUSH );
    lastItem.setText( "show last item" );
    lastItem.addSelectionListener( new SelectionAdapter() {
      public void widgetSelected( SelectionEvent e ) {
        list.select( list.getItemCount() - 1 );
        list.showSelection();
      }
    } );
    Button firstItem = new Button( composite, SWT.PUSH );
    firstItem.setText( "show first item" );
    firstItem.addSelectionListener( new SelectionAdapter() {
      public void widgetSelected( SelectionEvent e ) {
        list.select( 0 );
        list.showSelection();
      }
    } );
    Button whereIs = new Button( composite, SWT.PUSH );
    whereIs.setText( "y scroll offset" );
    whereIs.addSelectionListener( new SelectionAdapter() {
      public void widgetSelected( SelectionEvent e ) {
        message( parent, "Scrolled Composite content at " + scrolled.getContent().getLocation().y );
      }
    } );
    Button pointTo = new Button( composite, SWT.PUSH );
    pointTo.setText( "translate point" );
    pointTo.addSelectionListener( new SelectionAdapter() {
      public void widgetSelected( SelectionEvent e ) {
        Composite content = ( Composite )scrolled.getContent();
        Control[] children = content.getChildren();
        final Shell shell = parent.getShell();
        shell.setVisible( false ); // work around Android issue with z-index  (unrelated?)
        ToolTip toolTip = new ToolTip( shell, SWT.ICON_INFORMATION );
        toolTip.setMessage( "Second control of ScrolledComposite is here" );
        toolTip.setLocation( children[ 1 ].toDisplay( 0, 0 ) );
        toolTip.setAutoHide( true );
        toolTip.setVisible( true );
        Display.getCurrent().timerExec( 1000, new Runnable() {
          public void run() {
            shell.setVisible( true );
          }
        } );
      }
    } );
  }

  private Table createTable( Composite parent ) {
    Table table = new Table( parent, SWT.BORDER | SWT.FULL_SELECTION );
    table.setLinesVisible( true );
    table.setLayoutData( new GridData( SWT.FILL, SWT.FILL, true, true ) );
    for( int i = 0; i < 50; i++ ) {
      new TableItem( table, SWT.NONE ).setText( "TableItem " + i );
    }
    return table;
  }

  private Composite createMiniScrolledComposite( Composite parent ) {
    final ScrolledComposite scrolledComposite = new ScrolledComposite( parent, SWT.BORDER | SWT.V_SCROLL | SWT.H_SCROLL);
    scrolledComposite.setLayoutData( new GridData( SWT.FILL, SWT.FILL, true, true ) );
    final Composite composite = createLabelComposite( scrolledComposite, 80 );
    scrolledComposite.setContent( composite );
    scrolledComposite.setExpandHorizontal( true );
    scrolledComposite.setExpandVertical( true );
    scrolledComposite.setMinSize( composite.computeSize( SWT.DEFAULT, SWT.DEFAULT ) );
    composite.layout();
    return scrolledComposite;
  }

  private ScrolledComposite createScrolledComposite( Composite parent ) {
    final ScrolledComposite scrolledComposite = new ScrolledComposite( parent, SWT.BORDER | SWT.V_SCROLL | SWT.H_SCROLL);
    scrolledComposite.setLayoutData( new GridData( SWT.FILL, SWT.FILL, true, true ) );
    final Composite composite = new Composite( scrolledComposite, SWT.NONE );
    scrolledComposite.setContent( composite );
    scrolledComposite.setExpandHorizontal( true );
    scrolledComposite.setExpandVertical( true );
    composite.setLayout( new GridLayout( 1, true ) );
    createLabelComposite( composite, 40 );
    createButtonComposite( composite );
    createTable( composite ).setLayoutData( new GridData( 200, 200 ) );
    createList( composite ).setLayoutData( new GridData( 200, 200 ) );
    createMiniScrolledComposite( composite ).setLayoutData( new GridData( 200, 200 ) );
    createMiniScrolledComposite( composite ).setLayoutData( new GridData( 200, 200 ) );
    createTextComposite( composite );
    scrolledComposite.setMinSize( composite.computeSize( SWT.DEFAULT, SWT.DEFAULT ) );
    composite.layout();
    return scrolledComposite;
  }

  private void createTextComposite( final Composite composite ) {
    Composite textComposite = new Composite( composite, SWT.NONE );
    textComposite.setLayoutData( new GridData( SWT.FILL, SWT.FILL, true, false ) );
    textComposite.setLayout( new GridLayout( 4, true ) );
    for( int i = 0; i < 40; i++ ) {
      new Text( textComposite, SWT.BORDER ).setText( "Text " + i );
    }
  }

  @SuppressWarnings("serial")
  private void createButtonComposite( final Composite composite ) {
    Composite buttonComposite = new Composite( composite, SWT.NONE );
    buttonComposite.setLayoutData( new GridData( SWT.FILL, SWT.FILL, true, false ) );
    buttonComposite.setLayout( new GridLayout( 4, true ) );
    for( int i = 0; i < 40; i++ ) {
      Button button = new Button( buttonComposite, SWT.PUSH );
      button.setText( "Button " + i );
      button.addSelectionListener( new SelectionAdapter() {
        public void widgetSelected( SelectionEvent e ) {
          message( composite, "SelectionEvent" );
        }
      } );
    }
  }

  @SuppressWarnings("serial")
  private Composite createLabelComposite( final Composite composite, int number ) {
    Composite labelComposite = new Composite( composite, SWT.NONE );
    labelComposite.setLayoutData( new GridData( SWT.FILL, SWT.FILL, true, false ) );
    labelComposite.setLayout( new GridLayout( 4, true ) );
    for( int i = 0; i < number; i++ ) {
      Label label = new Label( labelComposite, SWT.NONE );
      label.setText( "Label " + i );
      label.setLayoutData( new GridData( SWT.DEFAULT, SWT.DEFAULT ) );
      label.addMouseListener( new MouseListener() {
        public void mouseDown( MouseEvent e ) {
          MessageBox message = new MessageBox( composite.getShell() );
          message.setMessage( "MouseDown" );
          System.out.println( "MouseDown" );
          // MessageBox is somehow broken in Android
          //DialogUtil.open( message, null );
        }
        public void mouseDoubleClick( MouseEvent e ) {}
        public void mouseUp( MouseEvent e ) {}
      } );
    }
    return labelComposite;
  }

  private void message( final Composite composite, String msg ) {
    final Shell shell = composite.getShell();
    shell.setVisible( false ); // work around Android issue with z-index (unrelated)
    MessageBox message = new MessageBox( shell );
    message.setMessage( msg );
    DialogUtil.open( message, new DialogCallback() {
      public void dialogClosed( int returnCode ) {
        shell.setVisible( true );
      }
    } );
  }

}
