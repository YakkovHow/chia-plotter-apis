import express from 'express';
const router = express.Router();

router.get('/query/progress', (req, res) => {
    console.log("Received progress query")
    // Mock
    res.json(
        [
            {
                "lastQueriedPlotId": null,
                "currentPlot": {
                    "id": "plot_id_1",
                    "publicKey": "key_1",
                    "mostRecentPhase": "_2",
                    "openTime": "2021-07-16T04:03:23.204-07:00",
                    "closeTime": null,
                    "downloadLink": null,
                    "errorCode": null
                }
            },
            {
                "lastQueriedPlotId": null,
                "currentPlot": {
                    "id": "plot_id_2",
                    "publicKey": "key_2",
                    "mostRecentPhase": "_1",
                    "openTime": "2021-07-16T04:03:24.567-07:00",
                    "closeTime": null,
                    "downloadLink": null,
                    "errorCode": null,
                    // "last_errored_plot_id": null
                }
            }
        ]
    );
});

export default router;