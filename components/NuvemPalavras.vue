<template>
    <div ref="cloud" class="word-cloud"></div>
  </template>
  
  <script>
  import cloud from 'd3-cloud'
  import * as d3 from 'd3'
  
  export default {
    name: 'WordCloud',
    props: {
      words: {
        type: Array,
        required: true
      },
      width: {
        type: Number,
        default: 500
      },
      height: {
        type: Number,
        default: 400
      }
    },
    mounted() {
      this.generateCloud()
      console.log(this.words)
    },
    watch: {
      words: {
        handler() {
          this.generateCloud()
        },
        deep: true
      }
    },
    methods: {
      generateCloud() {
        const element = this.$refs.cloud
        element.innerHTML = '' // limpa a nuvem anterior
  
        const layout = cloud()
          .size([this.width, this.height])
          .words(this.words.map(d => ({ ...d })))
          .padding(5)
          .rotate(() => (Math.random() > 0.5 ? 0 : 90))
          .font('Comic Sans MS')
          .fontSize(d => d.size)
          .on('end', this.draw)
  
        layout.start()
      },
      draw(words) {
        const svg = d3
          .select(this.$refs.cloud)
          .append('svg')
          .attr('width', this.width)
          .attr('height', this.height)
          .append('g')
          .attr(
            'transform',
            `translate(${this.width / 2},${this.height / 2})`
          )
  
        svg
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('fill', () => d3.schemePastel1[Math.floor(Math.random() * 9)])
          .style('font-family', 'Comic Sans MS')
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
          .text(d => d.text)
      }
    }
  }
  </script>
  
  <style scoped>
  .word-cloud {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  