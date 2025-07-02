// Naszpącone XD
//  https://github.com/gergelyszabo94/csgo-trader-extension/blob/master/extension/src/injectToPage/CreatePriceHistoryGraph.js#L44
export default defineUnlistedScript(() => {
  const anyWindow = window as any;
  const CreatePriceHistoryGraph = (
    line1: unknown[] | boolean,
    numYAxisTicks: unknown,
    strFormatPrefix: unknown,
    strFormatSuffix: unknown
  ) => {
    var plot = anyWindow.$J.jqplot("pricehistory", [line1], {
      title: { text: "Median Sale Prices", textAlign: "left" },
      gridPadding: { left: 45, right: 45, top: 25 },
      axesDefaults: { showTickMarks: false },
      axes: {
        xaxis: {
          renderer: anyWindow.$J.jqplot.DateAxisRenderer,
          tickOptions: {
            formatString: '%d/%m/%y<span class="priceHistoryTime"> %#I%p<span>',
          },
          pad: 1,
        },
        yaxis: {
          pad: 1.1,
          tickOptions: {
            formatString: strFormatPrefix + "%0.2f" + strFormatSuffix,
            labelPosition: "start",
            showMark: false,
          },
          numberTicks: numYAxisTicks,
        },
      },
      grid: {
        gridLineColor: "#1b2939",
        borderColor: "#1b2939",
        background: "#101822",
      },
      cursor: {
        show: true,
        zoom: true,
        showTooltip: false,
      },
      highlighter: {
        show: true,
        lineWidthAdjust: 2.5,
        sizeAdjust: 5,
        showTooltip: true,
        tooltipLocation: "n",
        tooltipOffset: 20,
        fadeTooltip: true,
        yvalues: 2,
        formatString: "<strong>%s</strong><br>%s<br>%d sold",
      },
      series: [
        { lineWidth: 3, markerOptions: { show: false, style: "circle" } },
      ],
      seriesColors: ["#688F3E"],
    });

    plot.defaultNumberTicks = numYAxisTicks;
    return plot;
  };
  let line1 = false;
  let strFormatPrefix = "";
  let strFormatSuffix = "";
  let numYAxisTicks = 7;

  document
    .querySelectorAll('script[type="text/javascript"]')
    .forEach((scriptEl) => {
      if (scriptEl.innerHTML.includes("var line1=")) {
        const scriptText = scriptEl.innerHTML;
        line1 = JSON.parse(
          scriptText.split("var line1=")[1].split("]];")[0] + "]]"
        );
        strFormatPrefix = scriptText
          .split('var strFormatPrefix = "')[1]
          .split('"')[0];
        strFormatPrefix = decodeURIComponent(
          JSON.parse('"' + strFormatPrefix.replace(/\"/g, '\\"') + '"')
        );
        strFormatSuffix = scriptText
          .split('var strFormatSuffix = "')[1]
          .split('"')[0];
        strFormatSuffix = decodeURIComponent(
          JSON.parse('"' + strFormatSuffix.replace(/\"/g, '\\"') + '"')
        );
        numYAxisTicks = parseInt(
          scriptText.split("CreatePriceHistoryGraph( line1, ")[1].split(",")[0]
        );
      }
    });

  anyWindow.$J(document).ready(function () {
    anyWindow.g_plotPriceHistory = CreatePriceHistoryGraph(
      line1,
      numYAxisTicks,
      strFormatPrefix,
      strFormatSuffix
    );
    anyWindow.pricehistory_zoomMonthOrLifetime(
      anyWindow.g_plotPriceHistory,
      anyWindow.g_timePriceHistoryEarliest,
      anyWindow.g_timePriceHistoryLatest
    );
  });
});
