const express = require('express')
const axios = require("axios");
const router = express.Router();

require('dotenv').config();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;


router.get('/tv/:tvId', async (req, res) => {
    const {tvId} = req.params
    try {
        const tvResponse = await axios.get(`${TMDB_BASE_URL}/tv/${tvId}`, {
            headers: {
                accept:'application/json'
            },
            params: {
                api_key: TMDB_API_KEY,
                language: 'ko-KR',
                // page: 1
            }
        });
        const actorResponse = await axios.get(`${TMDB_BASE_URL}/tv/${tvId}/credits`, {
            headers: {
                accept:'application/json'
            },
            params: {
                api_key: TMDB_API_KEY,
                language: 'ko-KR',
                // page: 1
            }
        });
        res.json({tvSeriesData : tvResponse.data, actorListData : actorResponse.data});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from TMDB' });
    }
});

router.get('/person/:personId', async (req, res) => {
    const {personId} = req.params
    console.log(`${TMDB_BASE_URL}/person/${personId}`)
    try {
        const personResponse = await axios.get(`${TMDB_BASE_URL}/person/${personId}`, {
            headers: {
                accept:'application/json'
            },
            params: {
                api_key: TMDB_API_KEY,
                language: 'ko-KR',
                // page: 1
            }
        });
        const creditResponse = await axios.get(`${TMDB_BASE_URL}/person/${personId}/combined_credits`, {
            headers: {
                accept:'application/json'
            },
            params: {
                api_key: TMDB_API_KEY,
                language: 'ko-KR',
                // page: 1
            }
        })
        res.json({personData : personResponse.data, creditData: creditResponse.data});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from TMDB' });
    }
});

module.exports = router
