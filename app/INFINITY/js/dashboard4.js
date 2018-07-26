$(".counter").counterUp({
        delay: 100,
        time: 1200
    });
 Morris.Area({
        element: 'morris-area-chart',
        data: [{
                    period: '2001',
                    policy: 10
                    
                }, {
                    period: '2002',
                    policy: 1667
                }, {
                    period: '2003',
                    policy: 4912
                }, {
                    period: '2004',
                    policy: 3767
                }, {
                    period: '2005',
                    policy: 6810
                }, {
                    period: '2006',
                    policy: 5670
                }, {
                    period: '2007',
                    policy: 4820
                }, {
                    period: '2008',
                    policy: 15073
                }, {
                    period: '2009',
                    policy: 8087
                }, {
                    period: '2010',
                    policy: 10
                }, {
                    period: '2011',
                    policy: 10
                }, {
                    period: '2012',
                    policy: 10
                }
                ],
                lineColors: ['#a5d9c7'],
                xkey: 'period',
                ykeys: ['policy'],
                labels: ['Site A'],
                pointSize: 0,
                lineWidth: 0,
                fillOpacity: 1,
                resize: true,
                behaveLikeLine: true,
                gridLineColor: '#e0e0e0',
                hideHover: 'auto'
        
    });