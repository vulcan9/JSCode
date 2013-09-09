/**
 * @author vulcan
 */

////////////////////
// �̹��� ���콺 �巡�� ���
////////////////////

// �巡�� ������� : http://blog.daum.net/channi84/91
// http://jqueryui.com/resizable






!function()
{
	var DRAG = {
		// �巡�� ��� ��ü
		target : null,
		onMouseDown:function (e){
			//console.log("down", this);
			//for (var prop in e) console.log(prop, " : ", e[prop]);
			$(this.target).bind("mousemove", this.event.mousemove);
			$(this.target).bind("mouseup", this.event.mouseup);
			$(this.target).bind("mouseout", this.event.mouseout);

			// �ʱ�ȭ
			this.lastX = e.offsetX;
			this.lastY = e.offsetY;
		},
		onMouseUp:function (e){
			//console.log("mouseup", this);
			$(this.target).unbind("mousemove", this.event.mousemove);
			$(this.target).unbind("mouseup", this.event.mouseup);
			$(this.target).unbind("mouseout", this.event.mouseout);
		},
		onMouseOut:function (e){
			$(this.target).unbind("mousemove", this.event.mousemove);
			$(this.target).unbind("mouseup", this.event.mouseup);
			$(this.target).unbind("mouseout", this.event.mouseout);
		},
		onMouseMove:function (e){
			var x = e.offsetX;
			var y = e.offsetY;
			//console.log("offset : ", x, y);

			var distX = x - this.lastX;
			var distY = y - this.lastY;
			//console.log("dist : ", distX, distY);

			var position = POSITION.getCurrentPosition($(this.target));
			var xpos = position.x + distX;
			var ypos = position.y + distY;

			xpos = POSITION.checkLimit(xpos, POSITION.wObj, POSITION.wSize);
			ypos = POSITION.checkLimit(ypos, POSITION.hObj, POSITION.hSize);

			var str = xpos + 'px ' + ypos + 'px';
			$(this.target).css('background-position', str);
			//console.log("move : ", str);

			this.lastX = x;
			this.lastY = y;
			//console.log("last : ", this.lastX, this.lastY);
		},
		lastX:0,
		lastY:0,

		// ���콺 �̺�Ʈ ���ε�
		event : {
			mousedown : function(e){
				//console.log("down", e.target);
				DRAG.target = e.target;
				DRAG.onMouseDown(e);
			},
			mousemove : function(e){
				DRAG.onMouseMove(e);
			},
			mouseup : function(e){
				DRAG.onMouseUp(e);
				DRAG.target = null;
			},
			mouseout : function(e){
				DRAG.onMouseOut(e);
				DRAG.target = null;
			}
		}
	};
	
	$("img#img_move").bind("mousedown", DRAG.event.mousedown);

}();