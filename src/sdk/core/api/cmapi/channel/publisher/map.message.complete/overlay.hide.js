// Register a message completion builder for OVERLAY_HIDE
cmapi.map.message.complete.builder[emp.intents.control.OVERLAY_HIDE] = {
    
    // oTransaction will have a transaction property
    build: function (oTransaction) {

        var oMsgCompletion = new cmapi.typeLibrary.MessageComplete(oTransaction);
        var oOverlay = oTransaction.items[0];
        
        if (oOverlay)
        {
            var oDetails = {
                overlayId: oOverlay.overlayId
            };

            oMsgCompletion.details = oDetails;
        }

        return oMsgCompletion;
    }
};
