// Dimensions.
const DIMENSIONS = getWindowDimensions();
const WIDTH = DIMENSIONS.width;
const HEIGHT = DIMENSIONS.height - 100;

// Insets.
const INSETS = {'left': 150, 'right': 30, 'top': 30, 'bottom': 50};

// Padding.
const PADDING = {'left': 5, 'right': 5, 'top': 5, 'bottom': 5};

// Tick-mark length.
const TICK_MARK_LENGTH = 5;

// Scales.
const SCALES = {};

// Opacity of dimmed objects.
var DIMMED_OPACITY = 0.2;
var HIGHLIGHT_OPACITY = 1.0;

// Data.
const LAP_COUNT = 58;
const LAPS = [
    {
        'name': 'Sebastian Vettel',
        'placing': [1,1,1,1,1,1,1,1,1,3,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    },
    {
        'name': 'Mark Webber',
        'placing': [2,3,3,3,3,3,2,2,2,1,1,6,6,6,6,6,8,8,8,8,8,8,7,7,7,7,6,6,5,5,5,5,7,7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,8,9,9]
    },
    {
        'name': 'Fernando Alonso',
        'placing': [3,18,18,18,18,15,13,13,15,13,10,10,10,9,8,8,7,7,7,7,7,7,8,8,8,8,7,7,7,7,7,7,6,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
    },
    {
        'name': 'Jenson Button',
        'placing': [4, 6, 6, 6, 6, 6, 19, 19, 12, 4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    {
        'name': 'Felipe Massa',
        'placing': [5, 2, 2, 2, 2, 2, 3, 3, 9, 7, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 5, 5, 6, 6, 6, 6, 5, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    },
    {
        'name': 'Nico Rosberg',
        'placing': [6, 5, 5, 5, 5, 5, 5, 5, 7, 6, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 5, 5, 5]
    },
    {
        'name': 'Michael Schumacher',
        'placing': [7]
    },
    {
        'name': 'Rubens Barrichello',
        'placing': [8, 9, 9, 9, 9, 9, 8, 7, 10, 8, 7, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 8, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 8, 8]
    },
    {
        'name': 'Robert Kubica',
        'placing': [9]
    },
    {
        'name': 'Adrian Sutil',
        'placing': [10]
    },
    {
        'name': 'Lewis Hamilton',
        'placing': [11]
    },
    {
        'name': 'Sébastien Buemi',
        'placing': [12]
    },
    {
        'name': 'Vitantonio Liuzzi',
        'placing': [13]
    },
    {
        'name': 'Pedro De La Rosa',
        'placing': [14]
    },
    {
        'name': 'Nico Hulkenberg',
        'placing': [15]
    },
    {
        'name': 'Kamui Kobayashi',
        'placing': [16]
    },
    {
        'name': 'Jaime Alguersuari',
        'placing': [17]
    },
    {
        'name': 'Vitaly Petrov',
        'placing': [18]
    },
    {
        'name': 'Heikki Kovalainen',
        'placing': [19]
    },
    {
        'name': 'Jarno Trulli',
        'placing': [20]
    },
    {
        'name': 'Bruno Senna',
        'placing': [21]
    },
    {
        'name': 'Karun Chandock',
        'placing': [22]
    },
    {
        'name': 'Timo Glock',
        'placing': [23]
    },
    {
        'name': 'Luca di Grassi',
        'placing': [24]
    }
];

// Visualize when document has loaded.
window.onload = function() {

    visualize(LAPS);
};

// Create the visualization.
function visualize(data) {

    SCALES.x = d3.scale.linear()
        .domain([0, LAP_COUNT])
        .range([INSETS.left, WIDTH - INSETS.right]);

    SCALES.y = d3.scale.linear()
        .domain([0, data.length - 1])
        .range([INSETS.top, HEIGHT - INSETS.bottom]);

    SCALES.clr = d3.scale.category20();

    // Root panel.
    var vis = d3.select('#chart')
        .append('svg:svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    // Lap tick-lines.
    vis.selectAll('line')
        .data(SCALES.x.ticks(LAP_COUNT))
        .enter().append('svg:line')
        .attr('class', 'tickLine')
        .attr('x1', function(d) {
            return SCALES.x(d);
        })
        .attr('x2', function(d) {
            return SCALES.x(d);
        })
        .attr('y1', SCALES.y.range()[0] - TICK_MARK_LENGTH)
        .attr('y2', SCALES.y.range()[1] + TICK_MARK_LENGTH)
        .attr('visibility', function(d) {
            return d > 0 ? 'visible' : 'hidden'
        });

    // Lap labels.
    vis.selectAll('text.lap')
        .data(SCALES.x.ticks(LAP_COUNT))
        .enter().append('svg:text')
        .attr('class', 'lap')
        .attr('x', function(d) {
            return SCALES.x(d);
        })
        .attr('y', SCALES.y.range()[0] - PADDING.bottom)
        .attr('text-anchor', 'middle')
        .text(function(d, i) {
            return i > 0 ? i : '';
        });

    // Add lap poly-lines.
    vis.selectAll('polyline')
        .data(data)
        .enter()
        .append('svg:polyline')
        .attr('points', function(d) {

            var points = [];
            for (var i = 0;
                 i < d.placing.length;
                 i++) {

                points[i] = SCALES.x(i) + ',' + SCALES.y(d.placing[i] - 1);
            }

            return points.join(' ');
        })
        .style('stroke', function(d, i) {
            return SCALES.clr(i);
        })
        .on('mouseover', function(d, i) {

            highlight(vis, i);
        })
        .on('mouseout', function() {

            unhighlight(vis);
        });

    // Add name labels.
    vis.selectAll('text.name')
        .data(data)
        .enter()
        .append('svg:text')
        .attr('class', 'name')
        .attr('x', INSETS.left - PADDING.right)
        .attr('y', function (d, i) {

            return SCALES.y(i);
        })
        .attr('dy', '0.35em')
        .attr('text-anchor', 'end')
        .text(function(d) {

            return d.name;
        })
        .style('fill', function(d, i) {

            return SCALES.clr(i);
        })
        .on('mouseover', function(d, i) {

            highlight(vis, i);
        })
        .on('mouseout', function() {

            unhighlight(vis);
        });

}

function highlight(vis, index) {

    // Dim others.
    vis.selectAll('polyline')
        .style('opacity', function(d, i) {

            return i == index ? HIGHLIGHT_OPACITY : DIMMED_OPACITY;
        });

    vis.selectAll('text.name')
        .style('opacity', function(d, i) {

            return i == index ? HIGHLIGHT_OPACITY : DIMMED_OPACITY;
        });
}

function unhighlight(vis) {

    // Reset colour.
    vis.selectAll('polyline')
        .style('opacity', HIGHLIGHT_OPACITY);
    vis.selectAll('text.name')
        .style('opacity', HIGHLIGHT_OPACITY);
}

// Gets the window dimensions.
function getWindowDimensions() {

    var width = 630;
    var height = 460;
    if (document.body && document.body.offsetWidth) {

        width = document.body.offsetWidth;
        height = document.body.offsetHeight;
    }

    if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {

        width = document.documentElement.offsetWidth;
        height = document.documentElement.offsetHeight;
    }

    if (window.innerWidth && window.innerHeight) {

        width = window.innerWidth;
        height = window.innerHeight;
    }

    return {'width': width, 'height': height};
}

