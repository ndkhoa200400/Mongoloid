var ctx = document.getElementById('chart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                data: [2.7, 1.9, 2.4, 2.5, 3.6, 3.1, 2.7],
                borderColor: '#af90ca',
                backgroundColor: '#af90ca',
                fill: false,
                label: 'Distance (km)',
                lineTension: 0
            }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});