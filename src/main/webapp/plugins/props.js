/**
 * Sample plugin.
 */
Draw.loadPlugin(function(ui) {
	
	var div = document.createElement('div');
	div.style.background = (uiTheme == 'dark') ? '#2a2a2a' : '#ffffff';
	div.style.border = '1px solid gray';
	div.style.opacity = '0.0';
	div.style.position = 'absolute';
	div.style.padding = '10px';
	div.style.paddingTop = '0px';
	div.style.width = '20%';
	div.style.minWidth = '200px';
	div.style.top = '40px';
	div.style.right = '20px';
	
	var graph = ui.editor.graph;

    var study = (urlParams['study'] == "1")
	
	// Made for chromeless mode
	if (!ui.editor.isChromelessView())
	{
		div.style.top = '100px';
		div.style.right = '260px';
	}
	
	document.body.appendChild(div);

	window.setTimeout(function()
	{
		var parent = graph.getDefaultParent();
		var cells = graph.getChildCells(parent);
		
		for (var i=0; i<cells.length; i++)
    	{
    		var cell = cells[i];
    		var attrs = (cell.value != null) ? cell.value.attributes : null;
    		
			if (attrs != null)
			{
				for (var j = 0; j < attrs.length; j++) {
					
					if (attrs[j].nodeName == "reasoning")
					{
						var highlight = new mxCellHighlight(graph, '#ebe834', 8);
						highlight.highlight(graph.view.getState(cell));
		
					}
				}
			}					
		}
	}, 10);
	
	// Highlights current cell
	var highlight = new mxCellHighlight(graph, '#00ff00', 8);

    

	/**
	 * Updates the properties panel
	 */
	function cellClicked(cell)
	{
		// Forces focusout in IE
		graph.container.focus();

		div.style.opacity = '0.0';

		// Gets the selection cell
		if (cell == null)
		{
			highlight.highlight(null);
			div.style.opacity = '0.0';
		}
		else
		{
			var attrs = (cell.value != null) ? cell.value.attributes : null;

			highlight.highlight(graph.view.getState(cell));
	
			if (attrs != null)
			{
				var accepted = ['description', 'reasoning'];
				
				for (var i = 0; i < attrs.length; i++)
				{
					if (mxUtils.indexOf(accepted, attrs[i].nodeName) > -1 && attrs[i].nodeValue.length > 0)
					{
						div.innerHTML = '';
						div.style.opacity = '0.9';
						div.innerHTML += '<p>' + graph.sanitizeHtml(attrs[i].nodeValue) + '</p>';
					}
				}
			}
		}
	};

	/**
	 * Creates the textfield for the given property.
	 */
	function createTextField(graph, form, cell, attribute)
	{
		var input = form.addText(attribute.nodeName + ':', attribute.nodeValue);

		var applyHandler = function()
		{
			var newValue = input.value || '';
			var oldValue = cell.getAttribute(attribute.nodeName, '');

			if (newValue != oldValue)
			{
				graph.getModel().beginUpdate();
                
                try
                {
                	var edit = new mxCellAttributeChange(
                           cell, attribute.nodeName,
                           newValue);
                   	graph.getModel().execute(edit);
                   	graph.updateCellSize(cell);
                }
                finally
                {
                    graph.getModel().endUpdate();
                }
			}
		}; 

		mxEvent.addListener(input, 'keypress', function (evt)
		{
			// Needs to take shift into account for textareas
			if (evt.keyCode == /*enter*/13 &&
				!mxEvent.isShiftDown(evt))
			{
				input.blur();
			}
		});

		if (mxClient.IS_IE)
		{
			mxEvent.addListener(input, 'focusout', applyHandler);
		}
		else
		{
			// Note: Known problem is the blurring of fields in
			// Firefox by changing the selection, in which case
			// no event is fired in FF and the change is lost.
			// As a workaround you should use a local variable
			// that stores the focused field and invoke blur
			// explicitely where we do the graph.focus above.
			mxEvent.addListener(input, 'blur', applyHandler);
		}
	};
	
	graph.click = function(me)
	{
		// Async required to enable hyperlinks in labels
		window.setTimeout(function()
		{
			cellClicked(me.getCell());
		}, 0);
	};

});
