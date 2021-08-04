var express = require('express');
var router = express.Router();

router.get('/query', (req, res) => {
    console.log("Received query")
    // Mock
    res.json(
        {
            plotInfos: [
                {
                    "lastQueriedPlotId": "plot_id_1",
                    "currentPlot": {
                        "id": "plot_id_2",
                        "public_key": "key_1",
                        "most_recent_phase": "PHASE_2",
                        "open_time": "2021-07-16T04:03:23.204-07:00",
                        "close_time": null,
                        "download_link": null,
                        "error_code": null,
                        // "last_errored_plot_id": "plot_id_1"
                    }
                },
                {
                    "lastQueriedPlotId": "plot_id_3",
                    "currentPlot": {
                        "id": "plot_id_3",
                        "public_key": "key_2",
                        "most_recent_phase": "PHASE_1",
                        "open_time": "2021-07-16T04:03:24.567-07:00",
                        "close_time": null,
                        "download_link": null,
                        "error_code": null,
                        // "last_errored_plot_id": null
                    }
                }
            ]
        }
    );
})

module.exports = router;