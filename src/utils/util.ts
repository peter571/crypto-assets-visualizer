export const Last7Days = () => {
  var result = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);

    result.push(`${d}`);
  }
  return result.map((el) => {
    var words = el.split(" ");
    var date = `${words[0]} ${words[1]} ${words[2]}`;
    return date;
  });
};

export const Last7DaysWithYear = () => {
    var result = [];
  
    for (var i=0; i<7; i++) {
      
        var d = new Date();
      
        d.setDate(d.getDate() - i);
      
        result.push(`${d}`)
    }
  
    return(result.map(el => {
      	var words = el.split(" ");
		var date = `${words[0]} ${words[1]} ${words[2]}, ${words[3]}`;
    	return date
    }));
}

export const options = {
    layout: {
        padding: 15
    },
    aspectRatio: 2.5,
    maintainAspectRatio: true,
    legend: {
        display: false
    },
    tooltips: {
        callbacks: {
            label: function (tooltipItem: any) {
                return tooltipItem.xLabel;
            }
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            },
            ticks: {
                callback: function (value: any, index: any, values: any) {
                    return '';
                }
            }
        }
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Last 7 days Prices',
        },
    },
};
