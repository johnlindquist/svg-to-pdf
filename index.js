const fs = require("fs")
const PDFDocument = require("pdfkit")
const SVGtoPDF = require("svg-to-pdfkit")

const window = require("svgdom")
const document = window.document
const SVG = require("svg.js")(window)

const express = require("express")
const app = express()

const background = fs
  .readFileSync("./background.svg")
  .toString()

app.get("/", (req, res) => {
  const { name, date } = req.query

  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4"
  })

  const draw = SVG(document.documentElement)

  const nameSVG = draw
    .text(name)
    .size(45)
    .attr("x", "50%")
    .attr("y", "45%")
    .attr("text-anchor", "middle")

  const dateSVG = draw
    .text(date)
    .size(19)
    .attr("x", "13.9%")
    .attr("y", "87.7%")

  SVGtoPDF(doc, background)
  SVGtoPDF(doc, nameSVG.svg())
  SVGtoPDF(doc, dateSVG.svg())

  doc.pipe(res)
  doc.end()
})

app.listen(3000)
