import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100 },  // Ramp-up to 100 VUs over 30 seconds
        { duration: '1m', target: 100 },   // Stay at 100 VUs for 1 minute
        { duration: '10s', target: 0 },    // Ramp-down to 0 VUs over 10 seconds
    ],
};

export default function () {
    let res = http.get('http://localhost:3000');  // Replace with your Express URL
    // Log the response for debugging (optional)
    // console.log('Response time: ' + res.timings.duration + ' ms');
    sleep(1);  // Simulate a wait time of 1 second between requests
}