import { useD3 } from '../../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';
import apple from '../../assets/Apple.csv';
import amazon from '../../assets/Amazon.csv';

export const StockPriceLineChart = () => {
    let plotData = [];

    const margin = { top: 10, right: 30, bottom: 30, left: 50 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const overallMargin = 20;

    const labelMargin = 20;

    const ref = useD3(
        async (svg) => {

            const dateMapper = (d) => {
                d.date = new Date(d.Date);
                d.price = Number(d['Close/Last'].split("$")[1]);
                return d;
            }

            // get the data
            let amazonData = (await d3.csv(amazon)).map(dateMapper);
            let appleData = (await d3.csv(apple)).map(dateMapper);



            let x = d3.scaleTime()
                .domain(d3.extent([...amazonData, ...appleData], function (d) { return d.date; }))
                .range([0, width]);

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            let y = d3.scaleLinear()
                .domain([0, d3.max([...amazonData, ...appleData], function (d) { return d.price; })])
                .range([height, 0]);

            svg.append("g")
                .attr("transform", `translate(${overallMargin},0)`)
                .call(d3.axisLeft(y).ticks(10))
                .selectAll('text')
                .attr("fill", "black");

            const generatePathX = (d) => {
                return x(d.date)
            }

            const generatePathY = (d) => {
                return y(d.price)
            }

            // Add the line
            svg.append("path")
                .datum(amazonData)
                .attr("fill", "none")
                .attr("transform", `translate(${overallMargin},0)`)
                .attr("stroke", "black")
                .attr("stroke-width", 0.7)
                .attr("d", d3.line()
                    .x(generatePathX)
                    .y(generatePathY)
                )

            svg.append("text")
                .attr("x", x(amazonData[0].date))
                .attr("y", y(amazonData[0].price))
                .attr("fill", "black")
                .text("Amazon")
                .attr("transform", `translate(${labelMargin}, 0)`);

            // Add the line
            svg.append("path")
                .datum(appleData)
                .attr("fill", "none")
                .attr("transform", `translate(${overallMargin},0)`)
                .attr("stroke", "steelblue")
                .attr("stroke-width", 0.7)
                .attr("d", d3.line()
                    .x(generatePathX)
                    .y(generatePathY)
                )
                .append("text")
                .text(function (d) { return "Apple" });

            svg.append("text")
                .attr("x", x(appleData[0].date))
                .attr("y", y(appleData[0].price))
                .attr("fill", "steelblue")
                .text("Apple")
                .attr("transform", `translate(${labelMargin}, 0)`);;
        },
        [plotData.length]
    );
    return (
        <svg
            ref={ref}
            style={{
                height: 400,
                width: 460 + margin.left + margin.right,
                margin: overallMargin
            }}
        >
            {/* <g transform={`translate(${margin.left},${margin.top})`}></g> */}
        </svg>
    );
}

