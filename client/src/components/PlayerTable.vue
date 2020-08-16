<template>
  <div>
    <section class="section has-no-padding-vertical is-clearfix">
      <div class="tip primary is-size-6-7">
        <p class="has-text-weight-bold">Note:</p>
        <p>{{ playersWithoutSalary }} players with no salary data.</p>
      </div>
      <div class="container">
        <el-input
          class="search"
          placeholder="Search by player name"
          prefix-icon="el-icon-search"
          v-model="search"
        ></el-input>
        <div class="sort-select">
          <el-select v-model="sort" placeholder="Sort Videos By:">
            <el-option
              class="has-padding-left"
              v-for="item in Object.keys(sortOptions)"
              :key="item"
              :label="sortOptions[item].label"
              :value="item"
            ></el-option>
          </el-select>
        </div>
      </div>
      <el-table :data="displayedPlayers" style="width: 100%">
        <el-table-column label="Last Name" prop="lastName"></el-table-column>
        <el-table-column label="First Name" prop="firstName"></el-table-column>
        <el-table-column label="Salary" prop="salary" :formatter="formatSalary"></el-table-column>
        <el-table-column label="Salary Rank" prop="salaryRank">
          <template slot-scope="scope">
            <div v-if="scope.row.salaryRank !== null">
              <el-tag :type="scope.row.salaryRank <= 124 ? 'danger' : 'primary'"
                >{{ scope.row.salaryRank + 1 }}{{ scope.row.salaryTie ? ' (tie)' : '' }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="has-text-centered has-large-margin-top">
        <el-pagination
          v-if="numPages > 1"
          layout="prev, pager, next"
          :page-size.sync="pageSize"
          :current-page.sync="page"
          :total="filteredPlayers.length"
          background
        ></el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import { ascending, descending } from 'd3';

const getSalary = (player) => player.salary;
const getLastName = (player) => player.lastName.toLowerCase();

export default {
  name: 'PlayerTable',
  data() {
    return {
      sort: 'salaryDescending',
      search: '',
      page: 1,
      pageSize: 15,
      sortOptions: {
        nameDescending: { getter: getLastName, reverse: true, label: 'Last Name: Z to A' },
        nameAscending: { getter: getLastName, reverse: false, label: 'Last Name: A to Z' },
        salaryDescending: { getter: getSalary, reverse: true, label: 'Salary: Highest' },
        salaryAscending: { getter: getSalary, reverse: false, label: 'Salary: Lowest' },
      },
    };
  },
  computed: {
    players() {
      return this.$store.state.players;
    },
    playersWithoutSalary() {
      if (this.players) {
        return this.players.reduce((count, p) => (p.salary === null ? count + 1 : count), 0);
      }
      return null;
    },
    filteredPlayers() {
      if (this.search) {
        const searchTerms = this.search.split(' ').map((t) => t.toLowerCase());
        return this.players.filter((p) => {
          return searchTerms.reduce((acc, term) => p.name.toLowerCase().includes(term) && acc, true);
        });
      }
      // no search
      return this.players;
    },
    sortedPlayers() {
      const players = [...this.filteredPlayers]; // shallow copy
      if (this.sort) {
        const sortPolicy = this.sortOptions[this.sort];
        players.sort((a, b) => {
          if (sortPolicy.reverse) {
            return descending(
              sortPolicy.getter(a) || -1e8, // move undefined to the back
              sortPolicy.getter(b) || -1e8
            );
          }
          return ascending(sortPolicy.getter(a) || 1e8, sortPolicy.getter(b) || 1e8);
        });
      }
      return players;
    },
    displayedPlayers() {
      return this.sortedPlayers.filter((player, index) => {
        const minIndex = (this.page - 1) * this.pageSize;
        const maxIndex = this.page * this.pageSize - 1;
        return index >= minIndex && index <= maxIndex;
      });
    },
    numPages() {
      return Math.ceil(this.filteredPlayers.length / this.pageSize);
    },
  },
  methods: {
    formatSalary(row) {
      let { salary } = row;
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

<style lang="scss" scoped>
.search {
  width: 300px;
}
.sort-select {
  float: right;
}
</style>
