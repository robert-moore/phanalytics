<template>
  <div style="width: 100%">
    <div class="has-small-margin-left has-margin-bottom">
      <el-radio-group v-model="excludeMinimum" size="small">
        <el-radio :label="0" border>All Players</el-radio>
        <el-radio :label="1" border>Exclude Minimum Salary Players</el-radio>
      </el-radio-group>
    </div>
    <div id="salary-histogram" style="width: 100%" ref="salaryContainer"></div>
  </div>
</template>

<script>
import { bin } from 'd3-array';
import { min, max } from 'd3';
import embed from 'vega-embed';
import CategoricalHistogramSpec from '@/helpers/CategoricalHistogramSpec';

export default {
  name: 'Histogram',
  data() {
    return {
      excludeMinimum: 0,
    };
  },
  // props: [data],
  async mounted() {
    this.draw();
  },
  watch: {
    excludeMinimum(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.draw();
      }
    },
  },
  computed: {
    players() {
      return this.$store.state.players;
    },
    qualifyingOffer() {
      return this.$store.state.qualifyingOffer;
    },
    cutoffSalary() {
      return this.$store.state.cutoffSalary;
    },
  },
  methods: {
    draw() {
      embed('#salary-histogram', this.getSpec(), { actions: false, renderer: 'svg' });
    },
    getSpec() {
      const width = this.$refs.salaryContainer.clientWidth - 64;
      const baseSpec = CategoricalHistogramSpec();
      const filteredPlayers = this.players.filter(
        (d) => d.salary !== null && (!this.excludeMinimum || d.salary > 507500)
      );
      const binner = bin()
        .value((d) => d.salary)
        .thresholds(15);
      const binnedData = binner(filteredPlayers);
      const getBinClass = (bin) => {
        if (bin.x1 < this.cutoffSalary) {
          return 'Outside Top 125';
        } else if (bin.x0 >= this.cutoffSalary) {
          return 'Top 125';
        }
        return 'Partial Top 125';
      };
      const bins = binnedData.map((bin) => ({
        start: bin.x0,
        end: bin.x1,
        count: bin.length,
        class: getBinClass(bin),
        title: `${this.formatSalary(bin.x0)} - ${this.formatSalary(bin.x1)}`,
      }));
      const maxCount = max(bins, (d) => d.count);
      const forcedBinRange = {};
      const binMin = forcedBinRange.min !== undefined ? forcedBinRange.min : min(bins, (d) => d.start) || 0;
      const binMax = forcedBinRange.max !== undefined ? forcedBinRange.max : max(bins, (d) => d.end) || 100;
      const xScale = {
        ...baseSpec.scales[0],
        domain: [binMin, binMax],
      };
      const yScale = {
        ...baseSpec.scales[1],
        domain: [0, (maxCount || 0) * 1.2],
      };
      const colorScale = {
        ...baseSpec.scales[2],
      };
      return {
        ...baseSpec,
        scales: [xScale, yScale, colorScale],
        width,
        data: [
          {
            name: 'bins',
            values: bins,
          },
          {
            name: 'qualifying',
            values: [
              {
                amount: this.qualifyingOffer,
                formatted: this.formatSalary(this.qualifyingOffer),
              },
            ],
          },
          {
            name: 'cutoff',
            values: [
              {
                amount: this.cutoffSalary,
                formatted: this.formatSalary(this.cutoffSalary),
              },
            ],
          },
        ],
      };
    },
    formatSalary(salary) {
      if (!salary) {
        return 'Not Available';
      }
      const suffixArray = ['', 'K', 'M', 'B'];
      const maxWholeDigitLength = 3;
      const decimalLength = 1;
      let suffixIndex = 0;
      while (salary > Math.pow(10, maxWholeDigitLength) && suffixIndex < suffixArray.length) {
        salary /= 1000;
        suffixIndex++;
      }
      return `$${salary.toFixed(decimalLength)}${suffixArray[suffixIndex]}`;
    },
  },
};
</script>
