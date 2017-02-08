var EMPWorldWind = EMPWorldWind || {};
EMPWorldWind.eventHandlers = EMPWorldWind.eventHandlers || {};

/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent}
 * @typedef {Object} MouseEvent
 */


/**
 * Mouse event handlers
 */
EMPWorldWind.eventHandlers.mouse = {
  /**
   * @param {MouseEvent} event
   * @this EMPWorldWind.map
   */
  click: function (event) {
    var clickEvent = EMPWorldWind.utils.getEventCoordinates.call(this, event);

    clickEvent.type = emp.typeLibrary.Pointer.EventType.SINGLE_CLICK;

    EMPWorldWind.eventHandlers.extractFeatureFromEvent.call(this, event, clickEvent);

    this.empMapInstance.eventing.Pointer(clickEvent);
  },
  /**
   *
   * @param {MouseEvent} event
   * @this EMPWorldWind.map
   */
  dblclick: function (event) {
    var dblClickEvent = EMPWorldWind.utils.getEventCoordinates.call(this, event);
    dblClickEvent.type = emp.typeLibrary.Pointer.EventType.DBL_CLICK;

    EMPWorldWind.eventHandlers.extractFeatureFromEvent.call(this, event, dblClickEvent);

    this.empMapInstance.eventing.Pointer(dblClickEvent);
  },
  /**
   * @param {MouseEvent} event
   * @this EMPWorldWind.map
   */
  mousedown: function (event) {
    var mousedownEvent = EMPWorldWind.utils.getEventCoordinates.call(this, event);

    mousedownEvent.type = emp.typeLibrary.Pointer.EventType.MOUSEDOWN;
    EMPWorldWind.eventHandlers.extractFeatureFromEvent.call(this, event, mousedownEvent);

    this.empMapInstance.eventing.Pointer(mousedownEvent);
  },
  /**
   * @param {MouseEvent} event
   * @this EMPWorldWind.map
   */
  mouseup: function (event) {
    var mouseupEvent = EMPWorldWind.utils.getEventCoordinates.call(this, event);
    mouseupEvent.type = emp.typeLibrary.Pointer.EventType.MOUSEUP;
    EMPWorldWind.eventHandlers.extractFeatureFromEvent.call(this, event, mouseupEvent);
    
    if (this.state.dragging) {
      this.state.dragging = false;
      EMPWorldWind.eventHandlers.notifyViewChange.call(this, emp3.api.enums.CameraEventEnum.CAMERA_MOTION_STOPPED);
    }
    this.empMapInstance.eventing.Pointer(mouseupEvent);
  },
  /**
   *
   * @param {MouseEvent} event
   * @this EMPWorldWind.map
   */
  wheel: function (event) {
    if (event.wheelDeltaY < 0 && this.worldWind.navigator.range > EMPWorldWind.constants.view.MAX_HEIGHT) {
      event.preventDefault();
      this.worldWind.navigator.range = EMPWorldWind.constants.view.MAX_HEIGHT;
    }

    EMPWorldWind.eventHandlers.notifyViewChange.call(this);
  },
  /**
   * @param {MouseEvent} event
   * @this EMPWorldWind.map
   */
  mousemove: function (event) {
    var coords = EMPWorldWind.utils.getEventCoordinates.call(this, event);
    coords.type = emp.typeLibrary.Pointer.EventType.MOVE;

    EMPWorldWind.eventHandlers.extractFeatureFromEvent.call(this, event, coords);
    if (coords.lat !== undefined) {
      this.empMapInstance.eventing.Pointer(coords);
    }

    switch (event.buttons) {
      case 1: // Left button, we're moving the map
      case 2: // Right button, we're tilting/rotating the map
        this.state.dragging = true;
        EMPWorldWind.eventHandlers.notifyViewChange.call(this, emp3.api.enums.CameraEventEnum.CAMERA_IN_MOTION);
        break;
      case 4: // Wheel/middle button
      case 8: // 4th button (back)
      case 16: // 5th button (forward)
      default:
      // No actions
    }

    this.state.lastMousePosition = event;
  }
};
