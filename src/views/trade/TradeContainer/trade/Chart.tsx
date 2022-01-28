import React, { FC, useEffect, useRef, useState } from 'react'
import { createChart } from 'lightweight-charts';
import moment from 'moment';

interface Props {
  seriesType: SeriesType;
  data: any
}

export type SeriesType = 'area' | 'candle'
const Chart: FC<Props> = ({ seriesType, data }) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const chartEl = useRef(null)
  const [chartClass, setChartClass] = useState(null)
  useEffect(() => {
    const parentNode = chartEl.current.parentNode
    setWidth(parentNode.offsetWidth)
    setHeight(parentNode.offsetHeight)
  }, [chartEl])

  function getSeries(chart) {
    let currSeries = null
    const colorRed = '#f10808'
    const colorGreen = '#00ff37'

    const upColor = colorGreen
    const downColor = colorRed

    const colorsOption = {
      upColor: upColor,
      wickUpColor: upColor,
      borderUpColor: upColor,
      downColor: downColor,
      wickDownColor: downColor,
      borderDownColor: downColor,
    }
    switch (seriesType) {
      case 'area':
        currSeries = chart.addAreaSeries({
          lineWidth: 2,
        });
        break;
      case 'candle':
        currSeries = chart.addCandlestickSeries(colorsOption);
        break;
      default:
        break;
    }
    return currSeries
  }

  function initChart() {
    const darkTheme = {
      chart: {
        layout: {
          backgroundColor: 'transparent',
          lineColor: '#2B2B43',
          textColor: '#D9D9D9',
        },
        watermark: {
          color: 'rgba(0, 0, 0, 0)',
        },
        crosshair: {
          color: '#758696',
        },
        grid: {
          vertLines: {
            color: '#2B2B43',
          },
          horzLines: {
            color: '#363C4E',
          },
        },
      },
      series: {
        topColor: 'rgba(92,157,255,0.2)',
        bottomColor: 'rgba(92,157,255,0.04)',
        lineColor: 'rgba(92,157,255,1)',
      },
    }

    const chart = createChart(chartEl.current, {
      localization: {
        dateFormat: 'yyyy/MM/dd',
        timeFormatter: (time) => {
          return moment.utc(moment.unix(time)).local().format('YYYY-MM-DD HH:mm:ss')
        },
      },
      width,
      height,
      rightPriceScale: {
        visible: false,
      },
      leftPriceScale: {
        visible: true,
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
    });

    setChartClass(chart)

    const currSeries = getSeries(chart)

    const themesData = {
      Dark: darkTheme,
    }

    function syncToTheme(theme) {
      chart.applyOptions(themesData[theme].chart);
      currSeries.applyOptions(themesData[theme].series);
    }

    syncToTheme('Dark')
    chart.timeScale().fitContent()
    currSeries.setData(data);
  }

  useEffect(() => {
    initChart()
  }, [chartEl, width, height])

  useEffect(() => {
    if (chartClass) {
      chartClass.remove();
      initChart()
    }
  }, [data])

  return (
    <div ref={chartEl}></div>
  )
}

export default Chart

