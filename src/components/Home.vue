<template>
  <div>
    <div class="home">
      <b-container class="bv-example-row">
        <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="2" cols-xl="2">
          <b-col offset-lg="3">
            <b-input-group class="mt-5">
              <b-form-select v-model="selected" :options="options"></b-form-select>
              <b-form-input placeholder="Pozisyon, firma adı"
                            v-on:keyup.enter="search()"
                            v-model="searchContent"></b-form-input>
              <b-input-group-append>
                <b-button @click="search()" class="app-default-btn">İş Bul</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <p class="mt-4">
      <b>İş ilanı olan iller:</b> Ankara, İstanbul, İzmir
    </p>
  </div>
</template>

<script>
import stateListJson from '../../api/state.json';

export default {
  name: 'App',
  data() {
    return {
      stateList: stateListJson,
      selected: null,
      searchContent: '',
      options: [
        { value: null, text: 'Şehir' },
      ],
    };
  },
  methods: {
    getStateList() {
      for (let i = 0; i < this.stateList.items.length; i++) {
        let obj = {};
        obj.value = this.stateList.items[i].code;
        obj.text = this.stateList.items[i].name;
        this.options.push(obj);
      }
      this.options.sort(function (a, b) {
        return a.value - b.value;
      });
    },
    search() {
      var fakeList;
      var selectedCode = this.selected;
      fakeList = this.options.filter(function (item) {
        if (item.value !== null) {
          if (item.value === selectedCode) {
            return item;
          }
        }
      });

      var locationSearch;
      if(fakeList[0]) {
        locationSearch = fakeList[0].text.toLowerCase();
      } else {
        locationSearch = '';
      }

      this.$router.push({ path : '/joblist',
        query: { location: locationSearch, text: this.searchContent.toLowerCase() } });
    },
  },
  created() {
    this.getStateList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.home {
  margin-top: 4rem;
  background: #894fb6;
  padding: 2rem 0 4rem 0;
}
</style>
