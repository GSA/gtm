function ButtonTrackingObj(exp, titleName, cm, frame){
   this.VarTrivBtnTracking = new Variable( 'VarTrivBtnTracking', null, 0, cm, frame, exp, titleName, true );
   this.title = null;
}

ButtonTrackingObj.codeToStateMap =
{
	'N' : 'normalState',
	'O' : 'overState',
	'D' : 'downState',
	'A' : 'disabledState',
	'V' : 'visitedState',
	'S' : 'selectedState'
};
ButtonTrackingObj.stateToCodeMap = {};
for (var key in ButtonTrackingObj.codeToStateMap)
	ButtonTrackingObj.stateToCodeMap[ButtonTrackingObj.codeToStateMap[key]] = key;

ButtonTrackingObj.prototype.InitPageTracking = function ( )
{
	var THIS = this;
	var pageTrackData = this.VarTrivBtnTracking.getValue();
	var bDoInit = true;
	try {
	    if (pageTrackData && pageTrackData.length > 0 && pageTrackData != '~~~null~~~')
	    {
	        var topLevelSplit = pageTrackData.split('#');
	        if (topLevelSplit && topLevelSplit.length > 1)
            {
		        var arrIds = topLevelSplit[0].split(',');
		        var arrStatus = topLevelSplit[1].split(',');
		        for( var i=0; i<arrIds.length; i++ )
		        {
			        var id = parseInt( '0x' + arrIds[i] );
			        var status = arrStatus[i];
			        var node = this.FindNode( this.title, id );
			        if( node )
						node.v = ButtonTrackingObj.codeToStateMap[status] || status;
		        }
    		}
        }
    } catch (e) { }
}

ButtonTrackingObj.prototype.FindNode = function( node, id )
{
	if( node.id == id )
		return node;
	
	var match = null;
	if( typeof( node.c ) != 'undefined' ){
		for( var i=0; i<node.c.length; i++ ){
			match = this.FindNode( node.c[i], id );
			if( match != null )
				break;
		}
	}
	
	return match;
}

ButtonTrackingObj.prototype.InternalGetRangeStatus = function( node )
{
	if( node == null )
		return -1;
		
	if( typeof(node.c) == 'undefined' )
	{
		return node.v;
	}
	else
	{
		return 'normalState';
	}
}


ButtonTrackingObj.prototype.GetRangeStatus = function( id, bInit )
{
	var status = -1;
	if ( bInit ) 
		this.InitPageTracking();
	
	status = this.InternalGetRangeStatus( this.FindNode( this.title, id ) );

	return status;
}


ButtonTrackingObj.prototype.InternalSetRangeStatus=function( node, status )
{
	if( node == null )
		return;
	node.v = status;
	if( status == 0 && typeof(node.c)!='undefined')
	{
		for( var i=0; i<node.c.length; i++ )
			this.InternalSetRangeStatus( node.c[i], status ); 
	}
}

ButtonTrackingObj.prototype.SetRangeStatus = function( id, status /*0 or 1 or 2*/)
{
	this.InternalSetRangeStatus( this.FindNode(this.title, id), status );
	
	this.SavePageTracking();
}

ButtonTrackingObj.prototype.IterateTree = function( func )
{
	var stack = [];
	stack.push( this.title );
	var i = 0;
	while( stack.length > 0 )
	{
		var node = stack.shift();
		
		if( typeof(node.c) != 'undefined' )
			stack = node.c.concat(stack);
			
		//do the thing
		func( node, i, stack );
		i++;
	}	
}

ButtonTrackingObj.prototype.SavePageTracking = function()
{
	var fnIsSaveState = window.ObjButton && ObjButton.isSaveState || function () { return false; };
	var hexString = '';
	var arrayIds = [];
	var arrayStatus= [];
	
	this.IterateTree(function(node, i, stack){
		if (fnIsSaveState(node.v))
		{
			arrayIds.push(node.id);
			arrayStatus.push(node.v);
		}
	});
	
	for( var i=0; i<arrayIds.length; i++ )
		hexString += (i > 0 ? ',' : '') + arrayIds[i].toString(16);

	hexString += (arrayIds.length > 0 ? '#' : '');
	
	for (var i = 0; i < arrayStatus.length; i++)
		hexString += (i > 0 ? ',' : '') + (ButtonTrackingObj.stateToCodeMap[arrayStatus[i]] || arrayStatus[i]);
	
	this.VarTrivBtnTracking.set(hexString);
}

var trivBtnTracking = new ButtonTrackingObj(365,'gsa93cfg_2_training_module_design_review_ppt_module_1_final', 0, null);
trivBtnTracking.title={id:1,v:0,c:[{id:10855,v:'normalState'},{id:10847,v:'normalState'},{id:11935,v:'normalState'},{id:11927,v:'normalState'},{id:47987,v:'normalState'},{id:47650,v:'normalState'},{id:7690,v:'normalState'},{id:53968,v:'normalState'},{id:53956,v:'normalState'},{id:80993,v:'normalState'},{id:79336,v:'normalState'},{id:79451,v:'normalState'},{id:91735,v:'normalState'},{id:91693,v:'normalState'},{id:91672,v:'normalState'},{id:66219,v:'normalState'},{id:67237,v:'normalState'},{id:137104,v:'normalState'},{id:67772,v:'normalState'},{id:69374,v:'normalState'},{id:70132,v:'normalState'},{id:136131,v:'normalState'},{id:71571,v:'normalState'},{id:71630,v:'normalState'},{id:71651,v:'normalState'},{id:71672,v:'normalState'},{id:71693,v:'normalState'},{id:71714,v:'normalState'},{id:71735,v:'normalState'},{id:71756,v:'normalState'},{id:71777,v:'normalState'},{id:71798,v:'normalState'},{id:71819,v:'normalState'},{id:71840,v:'normalState'},{id:71861,v:'normalState'},{id:71882,v:'normalState'},{id:71903,v:'normalState'},{id:71924,v:'normalState'},{id:71945,v:'normalState'},{id:71966,v:'normalState'},{id:71987,v:'normalState'},{id:72008,v:'normalState'},{id:72029,v:'normalState'},{id:72050,v:'normalState'},{id:72071,v:'normalState'},{id:72092,v:'normalState'},{id:72113,v:'normalState'},{id:72134,v:'normalState'},{id:72313,v:'normalState'},{id:72336,v:'normalState'},{id:72451,v:'normalState'},{id:72472,v:'normalState'},{id:72514,v:'normalState'},{id:72556,v:'normalState'},{id:72598,v:'normalState'},{id:72640,v:'normalState'},{id:72682,v:'normalState'},{id:72724,v:'normalState'},{id:72766,v:'normalState'},{id:73593,v:'normalState'},{id:11126,v:'normalState'},{id:11118,v:'normalState'},{id:10828,v:'normalState'},{id:10820,v:'normalState'},{id:9218,v:'normalState'},{id:10427,v:'normalState'},{id:10904,v:'normalState'},{id:10896,v:'normalState'}]};
