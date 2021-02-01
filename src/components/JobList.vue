<template>
  <div class="hello">
    <b-container class="bv-example-row">
      <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="2" cols-xl="2">
        <b-col offset-lg="3" v-if="location || searchText">
          <p v-show="jobList === null" class="mt-5"> Yükleniyor...</p>
          <p v-show="jobList.length === 0" class="mt-5"> İlan Bulunamadı.</p>
          <b-list-group v-show="Object.keys(jobList).length > 0" class="mt-5">
            <b-list-group-item @click="goToDetail(item.jobId)" class="flex-column align-items-start cursor-pointer"
                               v-for="item in jobList">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ item.positionName }}</h5>
                <small>{{ item.durationDayText }}</small>
              </div>
              <p class="mb-1 text-left">
                {{ item.companyName }}
              </p>
              <small class="float-left w-100 text-left">{{ item.cityName }}, {{ item.townName }}</small>
              <small class="float-left">{{ item.distance }}</small>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col offset-lg="3" v-else>
          <p class="mt-5">Lütfen şehir şeçiniz veya anahtar kelime giriniz.</p>
        </b-col>
        <b-col offset-lg="3" class="mt-3">
          <a href="/" class="app-default-link">
            Anasayfaya Dön
          </a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import jobListJson from '../../api/job-list.json';

export default {
  name: 'App',
  data() {
    return {
      jobList: null,
      location: this.$route.query.location,
      searchText: this.$route.query.text,
    };
  },
  computed: {
  },
  methods: {
    filteredPhotoFeed: function () {
      let fakeList;
      let allList = jobListJson.result.items;
      let searchText = this.searchText.toLowerCase();
      let locationInfo = this.location.toLowerCase();
      fakeList = allList.filter(function(item) {
        console.log('locationInfo', locationInfo);
        console.log('item.cityName', item.cityName.toLowerCase());

        if (locationInfo && searchText) {
          console.log(1);
          if ((item.positionName.toLowerCase().indexOf(searchText) !== -1
            || item.companyName.toLowerCase().indexOf(searchText) !== -1)
            && item.cityName.toLowerCase() === locationInfo) {
            return item;
          }
        } else if (locationInfo) {
          console.log(2);
          if (item.cityName.toLowerCase().trim() === locationInfo.toLowerCase().trim()) {
            console.log(2.1);
            return item;
          }
        } else if (searchText) {
          console.log(3);
          if ((item.positionName.toLowerCase().indexOf(searchText) !== -1
            || item.companyName.toLowerCase().indexOf(searchText) !== -1)) {
            return item;
          }
        }

      });

      this.jobList = fakeList;
    },
    goToDetail(val) {
      this.$router.push({ path: `/jobdetail/${val}` });
    },
  },
  created() {
    this.filteredPhotoFeed();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
